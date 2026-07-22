import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  constructor (private _userService:UserService, private _router:Router) {}
  signupForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
    phone: new FormControl(''),
    dateOfBirth: new FormControl('')
  });

  onSubmit(){
    this._userService.register(this.signupForm.value).subscribe({
      next: (res)=>{
        this._router.navigate(['/login']);
      },
      error: (err)=>console.log(err)
    })
  }
}
