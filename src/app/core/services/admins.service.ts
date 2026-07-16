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
