export class UserProfileInfoDto {
  constructor(
    public name: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public address: string,
    public email: string,
    public nationalId: string,
    public nationalImage: string,
    public unionImage: string,
    public isGrantedRent: boolean
  ) {}
}
