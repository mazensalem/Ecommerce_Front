import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddressService } from '../../../core/services/address.service';
import { IAddress } from '../../../core/models/address.module';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PopupService } from '../../../core/services/popup.service';

@Component({
  selector: 'app-address',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './address.html',
  styleUrl: './address.css',
})
export class Address implements OnInit {
  constructor (private _addressSerivce:AddressService, private _cdr:ChangeDetectorRef, private _dialogService:PopupService) {}

  @ViewChild('myform') addFormHTML!:ElementRef;

  addresses!:IAddress[];
  addForm:FormGroup = new FormGroup({
    title: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    isDefault: new FormControl(false, {nonNullable: true})
  });

  selectedAddress:IAddress|null = null;

  refresh(){
    this._addressSerivce.getAddress().subscribe({
      next: (res)=>{
        this.addresses = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  goToAdd(){
    (this.addFormHTML.nativeElement as HTMLDivElement).scrollIntoView({behavior: 'smooth'});
  }

  onSubmit(){
    if (this.selectedAddress){
      this._addressSerivce.editAddress(this.selectedAddress._id, this.addForm.value).subscribe({
        next: (res)=>{
          this.selectedAddress = null;
          this.addForm.reset();
          this.refresh();
          this._dialogService.open('Address Edited');
        },
        error: (err)=>console.log(err)
      })
    }else{
      this._addressSerivce.saveAddress(this.addForm.value).subscribe({
        next: (res)=>{
          this._dialogService.open('address Added');
          this.addForm.reset();
          this.refresh();
        },
        error: (err) => console.log(err)
      });
    }
  }

  cancel(){
    this.addForm.reset();
    this.selectedAddress = null;
  }

  deleteAddress(id:string){
    this._addressSerivce.deleteAddress(id).subscribe({
      next: (res)=>{
        this.refresh();
        this._dialogService.open('Address Deleted')
      },
      error: (err)=>console.log(err)
    })
  }

  selectAddress(address:IAddress){
    this.selectedAddress = address;
    this.addForm.patchValue({...address});
    this._cdr.detectChanges();
  }
  
}
