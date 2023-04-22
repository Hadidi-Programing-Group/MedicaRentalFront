export class UserProfileInfoDto {
  constructor(
    public name: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public address: string,
    public email: string,
    public isGrantedRent: boolean
  ) {}
}

export class UpdateProfileInfoDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public address: string,
    public email: string,
  ) {}
}

export class UserApprovalInfoDto {
  constructor(
    public nationalId: string,
    public nationalImage: string,
    public unionImage: string,
  ) {}
}
