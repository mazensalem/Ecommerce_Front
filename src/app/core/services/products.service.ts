import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { IResponse } from '../models/res.module';
import { IProduct } from '../models/products.module';
import { ICart } from '../models/cart.module';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor (private _http:HttpClient){}
  private url = env.API_ENDPOINT + 'products/';
  private carturl = env.API_ENDPOINT + 'cart/';

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
    return this._http.delete<IResponse<null>>(this.url + `delete/${id}`);
  }

  searchProducts(search:string, catagory:string, priceMin:number, priceMax:number){
    return this._http.get<IResponse<IProduct[]>>(this.url + `search/?search=${search}&catagory=${catagory}&priceMin=${priceMin}&priceMax=${priceMax}`);
  }

  getProduct(slug:string){
    return this._http.get<IResponse<IProduct>>(this.url + slug);
  }

  addToCart(id:string) {
    return this._http.post<IResponse<ICart>>(this.carturl + 'add/', {product:id});
  }

  decreaseCart(id:string) {
    return this._http.put<IResponse<ICart>>(this.carturl + 'decrease/', {product:id});
  }
  
  
  removeFromCart(id:string) {
    return this._http.put<IResponse<ICart>>(this.carturl + 'remove/', {product:id});
  }
}
