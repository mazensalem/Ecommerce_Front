import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../models/res.module';
import { env } from '../../../env/env';
import { IUser } from '../models/user.module';
import { jwtDecode } from 'jwt-decode';
import { ICart } from '../models/cart.module';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor (private _http:HttpClient){}
  url = env.API_ENDPOINT + 'user/';
  carturl = env.API_ENDPOINT + 'cart/';
  loginCB!: () => void;
  skeltonCB!: () => void;

  logIn(email:string, password:string) {
    return this._http.post<IResponse<string>>(this.url + 'login/', {email, password});
  }

  register(user:IUser){
    return this._http.post<IResponse<IUser>>(this.url + 'signup/', {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      dateOfBirth: user.dateOfBirth
    })
  }

  
  getUser(){
    return this._http.get<IResponse<IUser>>(this.url + 'profile/');
  }

  editUser(user:IUser){
    return this._http.put<IResponse<IUser>>(this.url + 'profile/', user)
    .pipe(tap(() => {
      this.loginCB();
      this.skeltonCB();
    }));
  }
  editPassword(oldPassword:string, newPassword:string){
    return this._http.put<IResponse<IUser>>(this.url + 'changepassword/', {oldPassword, newPassword});
  }

  getCartCount(){ return this._http.get<IResponse<ICart>>(this.carturl); }


  logout(){
    localStorage.removeItem('token');
    this.loginCB();
  }

  SetToken(token:string){
    localStorage.setItem('token', token);
    this.loginCB();
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
