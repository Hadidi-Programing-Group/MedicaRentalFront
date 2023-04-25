import {MessageStatus} from "./MessageStatus"

export class ChatDto
{
  constructor(
    public userId: string,
    public userName: string,
    public lastMessage: string,
    public messageDate: Date,
    public messageStatus: MessageStatus,
    public unseenMessagesCount: number,
    public userProfileImage: string
  )
  {
  }
}
