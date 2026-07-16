import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { IResponse } from '../models/res.module';
import { ICatagory, ISubCatagory } from '../models/catagory.module';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor (private _http:HttpClient){}

  private url = env.API_ENDPOINT;

  getAllActive(){
    return this._http.get<IResponse<ICatagory[]>>(this.url + 'catagory/');
  }

  getSubCategories(catagoryId: string){
    return this._http.get<IResponse<ISubCatagory[]>>(this.url + `subcatagory/under/${catagoryId}`);
  }

}
