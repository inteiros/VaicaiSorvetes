export default interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    address: string;
    payment: string;
    isProvider: boolean;
}
