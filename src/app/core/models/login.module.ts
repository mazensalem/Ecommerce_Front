// export interface ILogin {
//     string
// }

export interface IAdmin {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
    iat?: number;
    ext?: number;
}