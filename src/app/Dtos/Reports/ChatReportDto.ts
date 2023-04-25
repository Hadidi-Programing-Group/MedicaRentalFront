export class ChatReportDto {
  constructor(
    public id: string,
    public name: string,
    public isSolved: boolean,
    public createdDate: Date,
    public solveDate: Date | null,
    public reportedId: string,
    public reporteeId: string
  ) {}
}
