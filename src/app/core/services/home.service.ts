import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../models/res.module';
import { env } from '../../../env/env';
import { IHomeCatagory } from '../models/catagory.module';
import { IProduct } from '../models/products.module';
import { ITest } from '../models/Testimonials.module';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor (private _http:HttpClient){}
  url = env.API_ENDPOINT;

  getCatagories(){
    return this._http.get<IResponse<IHomeCatagory[]>>(this.url + 'catagory/');
  }

  getBestSellingProducts(){
    return this._http.get<IResponse<IProduct[]>>(this.url + 'products/bestseller');
  }

  getTest(){
    return this._http.get<IResponse<ITest[]>>(this.url + 'page/test/');
  }
}
