import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUser } from '../../../core/models/user.module';
import { UserService } from '../../../core/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../../core/services/orders.service';
import { IOrder } from '../../../core/models/order.module';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, NgClass, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  constructor (private _userService:UserService, private _orderService:OrdersService, private _router:Router, private _cdr:ChangeDetectorRef) { }
  user!:IUser;
  orders!:IOrder[];
  
  ngOnInit(): void {
    if (!this._userService.getToken()){this._router.navigate(['/']);}

    this._userService.getUser()?.subscribe({
      next: (res)=>{
        this.user = res.data;
        this._cdr.detectChanges();
      },
      error: (err)=>console.log(err)
    });

    this._orderService.getOrders(5).subscribe({
      next: (res) => {
        this.orders = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });

  }
}
