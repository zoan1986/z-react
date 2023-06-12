import { IsNotEmpty } from "class-validator";

export default class AddExperienceDto {
  constructor(
    title: string,
    company: string,
    location: string,
    from: Date,
    to: Date,
    current: boolean,
    description: string
  ) {
    this.title = title;
    this.company = company;
    this.location = location;
    this.from = from;
    this.to = to;
    this.current = current;
    this.description = description;
  }

  @IsNotEmpty()
  public title: string | undefined;

  @IsNotEmpty()
  public company: string | undefined;

  @IsNotEmpty()
  public location: string | undefined;

  @IsNotEmpty()
  public from: Date | undefined;

  @IsNotEmpty()
  public to: Date | undefined;

  @IsNotEmpty()
  public current: boolean | undefined;

  @IsNotEmpty()
  public description: string | undefined;
}
