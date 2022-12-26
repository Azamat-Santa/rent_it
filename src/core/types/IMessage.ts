import { IChatUserDto } from "./IChatUserDto";

export interface IMessage {
  id: number;
  chatUserDto: IChatUserDto;
  content: string;
  dateCreated:string;
  dateUpdated:string;
  dateDeleted:string;
}
