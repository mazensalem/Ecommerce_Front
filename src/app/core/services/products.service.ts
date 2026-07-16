import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { IResponse } from '../models/res.module';
import { IProduct } from '../models/products.module';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor (private _http:HttpClient){}
  private url = env.API_ENDPOINT + 'products/';

  getAllProducts(active:number, catagory:string, currentPage:number){
    return this._http.get<IResponse<IProduct[]>>(this.url + `?page=${currentPage}&active=${active}&category=${catagory}`)
  }

  createProduct(productData:FormData){
    return this._http.post<IResponse<IProduct>>(this.url + 'create/', productData);
  }

  editProduct(id:string, product:FormData){
    return this._http.put<IResponse<IProduct>>(this.url + `edit/${id}`, product);
  }

  deleteProduct(id:string){
    return this._http.delete<IResponse<IResponse<null>>>(this.url + `delete/${id}`);
  }
}
