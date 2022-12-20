export interface IUser {
    type: string,
    accessToken: string,
    refreshToken: string,
    id: number,
    firstName: string,
    lastName: string,
    middleName: string,
    email: string,
    phoneNumber: string,
    role: string
}