import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { IResponse } from '../models/res.module';
import { ICatagory, ISubCatagory, IViewCatagory } from '../models/catagory.module';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor (private _http:HttpClient){}

  private url = env.API_ENDPOINT;

  getAllActive(){
    return this._http.get<IResponse<ICatagory[]>>(this.url + 'catagory/');
  }

  getAll(){
    return this._http.get<IResponse<IViewCatagory[]>>(this.url + 'catagory/all/');
  }

  getSubCategories(catagoryId: string){
    return this._http.get<IResponse<ISubCatagory[]>>(this.url + `subcatagory/under/${catagoryId}`);
  }

  createCategory(Data:FormData){
    return this._http.post<IResponse<ICatagory>>(this.url + 'catagory/create', Data);
  }

  createSubCategory(Data:FormData){
    return this._http.post<IResponse<ISubCatagory>>(this.url + 'subcatagory/add', Data);
  }

  deleteCategory(id:string){
    return this._http.delete<IResponse<null>>(this.url + `catagory/delete/${id}`);
  }

  deleteSubCategory(id:string){
    return this._http.delete<IResponse<null>>(this.url + `subcatagory/delete/${id}`)
  }

  editCategory(id:string, Data:FormData){
    return this._http.put<IResponse<ICatagory>>(this.url + `catagory/edit/${id}`,Data);
  }

  editSubCategory(id:string, Data:FormData){
    return this._http.put<IResponse<ISubCatagory>>(this.url + `subcatagory/edit/${id}`,Data);
  }

}
