export interface ICatagory {
    _id: string;
    name: string;
    imgUrl:string;
    slug:string;
    isActive:boolean;
    isDeleted:boolean;
}

export interface IViewCatagory {
    _id: string;
    name: string;
    imgUrl:string;
    slug:string;
    isActive: boolean;
    isDeleted:boolean;
    subCategories: {
        _id: string;
        catagoryId: string;
        name: string;
        imgUrl: string;
        slug: string;
        isActive: boolean;
        isDeleted: boolean;
        productCount: number;
    }[];
}


export interface ISubCatagory {
    _id: string;
    catagoryId: string;
    name: string;
    imgUrl: string;
    slug: string;
    isActive: boolean;
    isDeleted: boolean;
}