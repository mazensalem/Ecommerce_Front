import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../../core/models/user.module';

@Component({
  selector: 'app-profile-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.css',
})
export class ProfileEdit implements OnInit {
  editForm!:FormGroup;

  constructor (private _userService:UserService, private _router:Router, private _cdr:ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this._userService.getUser().subscribe({
      next: (res)=>{
        const user = res.data;
        const userDate = (new Date(user.dateOfBirth as string));
        this.editForm = new FormGroup({
          name: new FormControl(user.name),
          email: new FormControl(user.email),
          phone: new FormControl(user.phone),
          dateOfBirth: new FormControl(`${userDate.getFullYear()}-${(userDate.getMonth() + 1 < 10 ? '0' : '')}${userDate.getMonth() + 1}-${(userDate.getDate() < 10 ? '0' : '')}${userDate.getDate()}`),
          oldPassword: new FormControl(''),
          newPassword: new FormControl(''),
          reNewPassword: new FormControl('')
        });
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    })

  }

  onSubmit(){
    this._userService.editUser(this.editForm.value).subscribe({
      next: (res) => this._router.navigate(['/profile']),
      error: (err) => console.log(err)
    });

    if (this.editForm.value['newPassword']){
      if (this.editForm.value['newPassword'] == this.editForm.value['newPassword']){
        this._userService.editPassword(this.editForm.value['oldPassword'], this.editForm.value['newPassword']).subscribe({
          next: (res) => this._router.navigate(['/profile']),
          error: (err) => console.log(err)
        })
      }else{
        alert('password mismatch');
      }
    }

  }
}
