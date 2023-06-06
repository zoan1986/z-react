export default class RegisterDto {
    constructor(first_name:string, las_name:string, email:string, password:string)
    {
        this.first_name = first_name;
        this.last_name = las_name;
        this.email = email;
        this.password = password;
    }
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
}