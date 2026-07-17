import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../models/order.module';
import { IResponse } from '../models/res.module';
import { env } from '../../../env/env';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor (private _http:HttpClient){};

  url = env.API_ENDPOINT + 'orders/';

  getAllOrders(date:string, page:number, status:string){
    let query = `page=${page}&`;
    if (date != 'NONE'){
      query += `date=${date}&`;
    }
    if (status != 'ALL'){
      query += `status=${status}&`;
    }
    return this._http.get<IResponse<IOrder[]>>(this.url + `all/?${query}`);
  }

  changeOrderStatus(id:string, status:string){
    return this._http.put<IResponse<IOrder>>(this.url + `setstatus/${id}`, {status});
  }
}
