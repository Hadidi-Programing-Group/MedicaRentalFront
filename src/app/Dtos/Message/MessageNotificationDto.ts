export class MessageNotificationDto
{
  constructor(
    public username: string,
    public profileImage: string,
    public message: string,
    public messageDate: string
  )
  {
  }
}
