import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminsService } from '../../core/services/admins.service';
import { IAdmin } from '../../core/models/login.module';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { PopupService } from '../../core/services/popup.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-admins',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './admins.html',
  styleUrl: './admins.css',
})
export class Admins implements OnInit {
  constructor (private _adminService:AdminsService, private _cdr:ChangeDetectorRef, private _dialogService:PopupService) {}
  admins!:IAdmin[];

  adminsForm:FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  totalAdmins!:number;
  currentAdminId!:string;

  selectedAdmin:IAdmin | null = null;

  refresh(){
    this._adminService.getAllAdmins().subscribe({
      next: (res)=>{
        this.admins = res.data;
        this.totalAdmins = Number(res.msg);
        this._cdr.detectChanges();
      },
      error: (err)=>console.log(err)
    })
  }

  ngOnInit(): void {
    const admin = this._adminService.getUser();
    if (admin) { this.currentAdminId = admin._id; }
    this.refresh();
  }

  onSubmit(){
    if (this.selectedAdmin){
      this._adminService.editeAdmin(this.selectedAdmin._id, this.adminsForm.value['name']).subscribe({
        next: (res) => {
          this.refresh();
          this.adminsForm.reset();
          this._dialogService.open('Admin Updated');
        },
        error: (err) => console.log(err)
      })
    }else{
      this._adminService.createAdmin(this.adminsForm.value).subscribe({
        next: (res)=>{
          this.refresh();
          this.adminsForm.reset();
          this._dialogService.open('admin created');
        },
        error: (err) => console.log(err)
      })
    }
  }

  cancel(){
    this.adminsForm.reset();
    this.selectedAdmin = null;
  }


  deleteAdmin(id:string){
    this._adminService.deleteAdmin(id).subscribe({
      next: (res) => {
        this.refresh();
        this._dialogService.open('admin delted');
      },
      error: (err) => console.log(err)
    })
  }

  selectAdmin(admin:IAdmin){
    this.selectedAdmin = admin;
    this.adminsForm.patchValue(this.selectedAdmin);
    this.adminsForm.patchValue({password: ''});
    this._cdr.detectChanges();
  }
}
