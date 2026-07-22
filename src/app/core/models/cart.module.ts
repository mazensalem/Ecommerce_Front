import { IProduct } from "./products.module";

export interface IProductWraper {
    productId: IProduct,
    pricePerUnit: number,
    quantity: number
}

export interface ICart {
    _id: string,
    userId: string,
    products: IProductWraper[],
}