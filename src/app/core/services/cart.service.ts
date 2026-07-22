import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { IResponse } from '../models/res.module';
import { ICart } from '../models/cart.module';
import { IOrder } from '../models/order.module';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor (private _http:HttpClient) {}
  url = env.API_ENDPOINT + 'cart/';
  orderUrl = env.API_ENDPOINT + 'orders/';

  getCart(){
    return this._http.get<IResponse<ICart>>(this.url);
  }

  checkOut(id:string){
    return this._http.post<IResponse<IOrder>>(this.orderUrl + 'checkout/', {addressId: id})
  }
}
