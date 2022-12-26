import { IImageUser } from "./IImageUser";
import { IPassport } from "./IPassport";
import { IRegisteredAddress } from "./IRegisteredAddress";
import { IResidenceAddress } from "./IResidenceAddress";
import { IRole } from "./IRole";

export interface IUserComplete {
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    dateOfBirth: string,
    passportData: IPassport,
    registeredAddress: IRegisteredAddress,
    residenceAddress:IResidenceAddress,
    email: string,
    role:IRole,
    status: string,
    imageUser: IImageUser,
    registrationComplete: boolean,
    verifiedByTechSupport: boolean
  }