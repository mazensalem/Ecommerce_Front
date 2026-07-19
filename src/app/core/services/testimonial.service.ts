import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { IResponse } from '../models/res.module';
import { ITest, ITestStats } from '../models/Testimonials.module';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor (private _http:HttpClient){}

  url = env.API_ENDPOINT + 'page/test/'
  getStats(){
    return this._http.get<IResponse<ITestStats[]>>(this.url + 'stats/');
  }

  getAll(status:string, page:number){
    let query = `all/?page=${page}&`;
    if (status != 'all'){
      query += `status=${status}`
    }
    return this._http.get<IResponse<ITest[]>>(this.url + query);
  }

  setStatus(id:string, status:string){
    return this._http.put<IResponse<ITest>>(this.url + `edit/${id}`, {status});
  }
}
