import { IImageUser } from "./IImageUser";

export interface IUserInComplete {
    type: string,
    accessToken: string,
    refreshToken: string,
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    dateOfBirth: string,
    email: string,
    phoneNumber: string,
    role: string,
    status: string,
    imageUser: IImageUser,
    registrationComplete: boolean,
    verifiedByTechSupport: boolean
  }
