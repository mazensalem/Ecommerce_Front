import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { IResponse } from '../models/res.module';
import { IAddress } from '../models/address.module';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor (private _http:HttpClient) {}

  url = env.API_ENDPOINT + 'address/';

  getAddress(){
    return this._http.get<IResponse<IAddress[]>>(this.url);
  }

  saveAddress(address:IAddress){
    return this._http.post<IResponse<IAddress>>(this.url, address);
  }

  deleteAddress(id:string){
    return this._http.delete<IResponse<null>>(this.url + `${id}`);
  }

  editAddress(id:string, address:IAddress){
    return this._http.put<IResponse<IAddress>>(this.url + `${id}`, address);
  }
}
