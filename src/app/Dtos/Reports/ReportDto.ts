export class ReportDto {
  constructor(
    public id: string,
    public name: string,
    public isSolved: boolean,
    public createdDate: Date,
    public solveDate: Date | null,
    public reportedName: string,
    public reporteeName: string
  ) {}
}
