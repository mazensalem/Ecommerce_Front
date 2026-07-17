import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env'
import { IResponse } from '../models/res.module';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { IAdmin } from '../models/login.module';

@Injectable({
  providedIn: 'root',
})
export class AdminsService {
  constructor (private _http:HttpClient, private _router:Router) {}

  url = env.API_ENDPOINT + 'admins/';

  getUser(){
    const token = this.getToken();
    if (token){
      return jwtDecode<IAdmin>(token);
    }
    return null;
  }

  getAllAdmins(){
    return this._http.get<IResponse<IAdmin[]>>(this.url);
  }


  createAdmin(Data:{name:string, email:string, password:string}){
    return this._http.post<IResponse<IAdmin>>(this.url + 'create/', Data);
  }

  deleteAdmin(id:string){
    return this._http.delete<IResponse<null>>(this.url + `delete/${id}`);
  }

  editeAdmin(id:string, name:string){
    return this._http.put<IResponse<IAdmin>>(this.url + 'edit', {name});
  }

  login(email:string, password:string){
    return this._http.post<IResponse<string>>(this.url + 'login', {email, password});
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/admin/login']);
  }
}
