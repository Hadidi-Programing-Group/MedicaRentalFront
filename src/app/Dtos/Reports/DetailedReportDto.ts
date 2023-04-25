export class DetailedReportDto {
  constructor(
    public id: string,
    public name: string,
    public statement: string,
    public isSolved: boolean,
    public createdDate: Date,
    public solveDate: Date | null,
    public reportedId: string,
    public reporterId: string,
    public reportedName: string,
    public reporterName: string,
    public contentId: string,
    public content: string,
    public contentTimeStamp: Date,
    public reportCategory: string,
  ) {}
}
