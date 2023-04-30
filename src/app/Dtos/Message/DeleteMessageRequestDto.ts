export class DeleteMessageRequestDto
{
  constructor(
    public messageId: string,
    public reportId?: string | null
  )
  {
  }
}
