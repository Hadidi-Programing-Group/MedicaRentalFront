export class ReportDto {
  constructor(
    public id: string,
    public name: string,
    public isSolved: boolean,
    public createdDate: string,
    public solveDate: string | null,
    public reportedName: string,
    public reporterName: string
  ) {}
}
