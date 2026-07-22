import { ChangeDetectorRef, Component, ViewChild, viewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../../core/services/user.service';
import { Header } from '../../shared/header/header';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor (private _userService:UserService, private _router:Router, private _cdr:ChangeDetectorRef) {}
  errorMSG:string = '';
  
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit(){
    this._userService.logIn(this.loginForm.value['email'], this.loginForm.value['password']).subscribe({
      next: (res)=>{
        this._userService.SetToken(res.data);
        this._router.navigate(['/']);
      },
      error: (err) => {
        this.errorMSG = 'incorrect email or password';
        this._cdr.detectChanges();
        console.log(err);
      }
    })
  }
}
