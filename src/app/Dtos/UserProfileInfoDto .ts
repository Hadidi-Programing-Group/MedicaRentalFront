export class UserProfileInfoDto {
  constructor(
    public Name: string,
    public FirstName: string,
    public LastName: string,
    public PhoneNumber: string,
    public Address: string,
    public Email: string,
    public NationalId: string,
    public NationalImage: string,
    public UnionImage: string
  ) {}
}
