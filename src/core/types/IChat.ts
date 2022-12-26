import { IChatUserDto } from "./IChatUserDto";

export interface IChat {
    id: number;
    chatUsers: IChatUserDto;
    dateCreated: string;
}