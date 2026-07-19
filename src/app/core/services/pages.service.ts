import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../models/res.module';
import { env } from '../../../env/env';
import { IPage } from '../models/page.module';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor (private _http:HttpClient){}

  url = env.API_ENDPOINT + 'page/';

  getPages(){
    return this._http.get<IResponse<IPage[]>>(this.url);
  }

  createPage(Data:IPage){
    return this._http.post<IResponse<IPage>>(this.url + 'create/', Data);
  }

  deletePage(slug:string){
    return this._http.delete<IResponse<null>>(this.url + `delete/${slug}`);
  }

  editPage(slug:string, page:IPage){
    return this._http.put<IResponse<IPage>>(this.url + `edit/${slug}`, page);
  }
}
