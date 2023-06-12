import { IsNotEmpty, MinLength } from "class-validator";

export default class CreateProfileDto {
  constructor(
    company: string,
    location: string,
    website: string,
    bio: string,
    skills: string,
    status: string,
    youtube: string,
    twitter: string,
    linkedin: string,
    facebook: string
  ) {
    this.company = company;
    this.location = location;
    this.website = website;
    this.bio = bio;
    this.skills = skills;
    this.status = status;
    this.youtube = youtube;
    this.twitter = twitter;
    this.linkedin = linkedin;
    this.facebook = facebook;
  }

  @IsNotEmpty()
  public company: string;

  @IsNotEmpty()
  public location: string;

  @IsNotEmpty()
  public website: string;

  @IsNotEmpty()
  public bio: string;

  @IsNotEmpty()
  public skills: string;

  @IsNotEmpty()
  public status: string;

  @IsNotEmpty()
  public youtube: string;

  @IsNotEmpty()
  public twitter: string;

  @IsNotEmpty()
  public linkedin: string;

  @IsNotEmpty()
  public facebook: string;
}
