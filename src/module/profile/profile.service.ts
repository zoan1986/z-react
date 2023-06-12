import { IExperience, IProfile, ISocial } from "./profile.interface";
import { IUser, UserSchema } from "@module/users";
import CreateProfileDto from "./dto/create_profile.dto";
import { HttpException } from "@core/exceptions";
import ProfileSchema from "./profile.model";
import AddExperienceDto from "./dto/add_experiece.dto";
import { http, profile } from "winston";
//import normalizeUrl from "normalize-url";

class ProfileService {
  public async getCurrentProfile(userId: string): Promise<Partial<IUser>> {
    const user = await ProfileSchema.findOne({
      user: userId,
    })
      .populate("user", ["name", "avatar"])
      .exec();

    if (!user) {
      throw new HttpException(400, "there is no profile for this user");
    }
    return user;
  }

  public async createProfile(
    userId: string,
    profileDto: CreateProfileDto
  ): Promise<IProfile> {
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      youtube,
      twitter,
      linkedin,
      facebook,
    } = profileDto;

    const profileFields: Partial<IProfile> = {
      user: userId,
      company,
      location,
      //website: website && website != "" ? normalizeUrl(website.toString()) : "",
      website: website && website != "" ? website.toString() : "",
      bio,
      skill: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill: string) => " " + skill.trim()),
      status,
    };

    const socialFields: ISocial = {
      youtube,
      twitter,
      linkedin,
      facebook,
    };

    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) {
        //socialFields[key] = normalizeUrl(value);
        socialFields[key] = value;
      }
    }
    profileFields.social = socialFields;

    const profile = await ProfileSchema.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).exec();

    return profile;
  }

  public async deleteProfile(userId: String) {
    await ProfileSchema.findOneAndRemove({ user: userId }).exec();
    await UserSchema.findOneAndRemove({ _id: userId }).exec();
  }

  public async getAllProfile(): Promise<Partial<IUser>[]> {
    const profiles = await ProfileSchema.find()
      .populate("user", ["name", "avatar"])
      .exec();
    return profiles;
  }
  public addExperience = async (
    userId: string,
    experience: AddExperienceDto
  ) => {
    const newExp = {
      ...experience,
    };
    const profile = await ProfileSchema.findOne({ user: userId }).exec();
    if (!profile) {
      throw new HttpException(400, "There is not profile for this user");
    }
    profile.experience.unshift(newExp as IExperience);
    await profile.save();

    return profile;
  };

  public deleteExperience = async (userId: string, experienceId: string) => {
    const profile = await ProfileSchema.findOne({ user: userId }).exec();

    if (!profile) {
      throw new HttpException(400, "There is not profile for this user");
    }
    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() != experienceId
    );
    await profile.save();
    return profile;
  };
}

export default ProfileService;
