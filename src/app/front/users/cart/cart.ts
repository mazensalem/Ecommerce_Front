import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { IProduct } from '../../../core/models/products.module';
import { RouterLink } from "@angular/router";
import { IProductWraper } from '../../../core/models/cart.module';
import { env } from '../../../../env/env';
import { NgClass } from '@angular/common';
import { ProductsService } from '../../../core/services/products.service';
import { IAddress } from '../../../core/models/address.module';
import { AddressService } from '../../../core/services/address.service';
import { PopupService } from '../../../core/services/popup.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, NgClass],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  constructor (private _dialogService:PopupService, private _addressService:AddressService ,private _cartService:CartService, private _productService:ProductsService, private _cdr:ChangeDetectorRef) {}
  products!:IProductWraper[];
  staticFilePath = env.STATIC_FILES;
  addresses!:IAddress[];

  refresh(){
    this._cartService.getCart().subscribe({
      next: (res)=>{
        this.products = res.data.products;
        this._cdr.detectChanges();
      },
      error: (err)=>console.log(err)
    });
  }

  ngOnInit(): void {
    this.refresh();

    this._addressService.getAddress().subscribe({
      next: (res)=>{
        this.addresses = res.data;
        this._cdr.detectChanges();
      },
      error: (err)=>console.log(err)
    })
  }

  dec(id:string){
    this._productService.decreaseCart(id).subscribe({
      next: (res)=>{
        this.refresh();
      },
      error: (err)=>console.log(err)
    });
  }
  inc(id:string){
    this._productService.addToCart(id).subscribe({
      next: (res)=>{
        this.refresh();
      },
      error: (err)=>console.log(err)
    });
  }

  remove(id:string){
    this._productService.removeFromCart(id).subscribe({
      next: (res)=>{
        this.refresh();
      },
      error: (err)=>console.log(err)
    })
  }

  checkout(){
    const addressId = (document.getElementById('addressSelect') as HTMLSelectElement).value
    this._cartService.checkOut(addressId).subscribe({
      next: (res)=>{
        this._dialogService.open('order completed');
        this.refresh();
      },
      error: (err)=>console.log(err)
    });
  }

}
