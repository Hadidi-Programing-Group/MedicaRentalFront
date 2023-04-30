export class BlockUserInfoDto {
  constructor(
    public id: string,
    public endDate: Date,
    public reportId?: string
  ) {}
}
