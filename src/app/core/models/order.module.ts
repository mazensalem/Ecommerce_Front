import { IUser } from "./user.module";

interface ProductOrder {
    productId: string,
    pricePerUnit: number,
    quantity: number,
}

interface AddressOrder {
    phone: string,
    address: string,
}

export interface IOrder {
    _id: string,
    userId: IUser,
    status: string,
    products: ProductOrder [],
    address: AddressOrder,
    createdAt: string,
    updatedAt: string,
}