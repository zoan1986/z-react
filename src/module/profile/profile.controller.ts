import { Request, Response, NextFunction } from "express";
import ProfileService from "./profile.service";
import { IUser } from "@module/auth";
import CreateProfileDto from "./dto/create_profile.dto";
import { IProfile } from "./profile.interface";
import AddExperienceDto from "./dto/add_experience.dto";

class ProfileController {
  private profileService = new ProfileService();

  public getCurrentProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user.id;
      const resultObj: Partial<IUser> =
        await this.profileService.getCurrentProfile(userId);
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public getAllProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resultObj: Partial<IUser>[] =
        await this.profileService.getAllProfile();
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateProfileDto = req.body;
    const userId = req.user.id;
    try {
      const createUserData: IProfile = await this.profileService.createProfile(
        userId,
        userData
      );
      res.status(201).json({ data: createUserData });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id;
    try {
      const updateUserData: Partial<IUser> =
        await this.profileService.getCurrentProfile(userId);
      res.status(200).json({ data: updateUserData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: String = req.params.id;
    try {
      await this.profileService.deleteProfile(userId);
      res.status(200);
    } catch (error) {
      next(error);
    }
  };

  public createExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: AddExperienceDto = req.body;
    const userId = req.user.id;
    try {
      const createUserData: IProfile = await this.profileService.addExperience(
        userId,
        data
      );
      res.status(201).json(createUserData);
    } catch (error) {
      next(error);
    }
  };

  public deleteExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const expId = req.params.exp_id;
    try {
      const profile = await this.profileService.deleteExperience(
        req.user.id,
        expId
      );
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  };
}
export default ProfileController;
