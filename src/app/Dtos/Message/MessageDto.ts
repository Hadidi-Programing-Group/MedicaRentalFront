import {MessageStatus} from "./MessageStatus";

export class MessageDto
{
  constructor(
    public id: string,
    public message: string,
    public senderId: string,
    public messageDate: Date,
    public messageStatus: MessageStatus
  )
  {
  }

}
