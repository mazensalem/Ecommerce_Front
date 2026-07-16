import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminsService } from '../../core/services/admins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor (private _adminService:AdminsService, private _cdr: ChangeDetectorRef, private _router: Router){}
  
  invalid = false;

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  submit(){
    this._adminService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (data) => {
        this._adminService.setToken(data.data);
        this._router.navigate(['/admin']);
      },
      error: (err) => {
        this.invalid = true;
        this._cdr.detectChanges();
      }
    });
  }
}
