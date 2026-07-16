import { ICatagory, ISubCatagory } from "./catagory.module";

export interface IProduct {
    _id: string;
    title: string;
    desc: string;
    price: number;
    imgUrl: string;
    stock: number;
    slug: string;
    newArrivals: boolean;
    mostPopular: boolean;
    isDeleted: boolean;
    isActive: boolean;
    catagory: ICatagory;
    subCatagory: ISubCatagory;
    createdAt: string;
    updatedAt: string;
}