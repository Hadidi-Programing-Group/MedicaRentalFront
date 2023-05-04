export class UserProfileInfoWithIdDto {
  constructor(
    public id: string,
    public name: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public address: string,
    public email: string,
    public isGrantedRent: boolean
  ) {}
}



export class UserApprovalInfoWithIdDto {
  constructor(
    public id : string,
    public nationalId: string,
    public nationalImage: string,
    public unionImage: string
  ) {}
}


export class UpdateProfileInfoDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public address: string,
    public email: string
  ) {}
}


export class UpdateApprovalInfoDto {
  constructor(
    public nationalId: string,
    public nationalImage: string,
    public unionImage: string
  ) {}
}


export class RoleMangerUserInfoDto {
  constructor(
    public Id: string,
    public FullName: string,
    public Email: string,
    public Role: string


  ) {}

}

export class UpdateUserRoleDto {
  constructor(
    public userId: string,
    public newRole: number


  ) {}

}

