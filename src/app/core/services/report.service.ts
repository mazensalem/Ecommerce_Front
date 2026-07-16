import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { AdminsService } from './admins.service';
import { IStats } from '../models/stats.module';
import { IResponse } from '../models/res.module';
import { IOrder } from '../models/order.module';
import { IProduct } from '../models/products.module';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor (private _http:HttpClient) {}

  private apiUrl = env.API_ENDPOINT + 'reports/';

  getStats(){
    return this._http.get<IResponse<IStats>>(this.apiUrl + 'stats');
  }

  getLatestOrders(){
    return this._http.get<IResponse<IOrder[]>>(this.apiUrl + 'latestorders');
  }

  getLowStockProcts(){
    return this._http.get<IResponse<IProduct[]>>(this.apiUrl + 'lowstockproducts')
  }

}
