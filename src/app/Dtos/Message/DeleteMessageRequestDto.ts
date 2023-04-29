export class DeleteMessageRequestDto {
  constructor(
    public userId: string,
    public messageId: string,
    public reportId?: string
  ) {}
}
