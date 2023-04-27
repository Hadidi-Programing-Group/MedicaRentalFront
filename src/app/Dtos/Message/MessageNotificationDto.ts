export class MessageNotificationDto
{
  constructor(
    public senderId: string,
    public username: string,
    public profileImage: string,
    public message: string,
    public messageDate: string
  )
  {
  }
}
