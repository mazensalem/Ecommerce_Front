import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IOrder } from '../../../core/models/order.module';
import { OrdersService } from '../../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [NgClass, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  constructor (private _orderService:OrdersService ,private _cdr:ChangeDetectorRef) {}
  status:string = 'All';
  currentPage:number = 1;
  totalOrders!:number;
  ordersPerPage:number = 10;
  AllPages!:number;


  orders!:IOrder[];

  refresh(){
    this._orderService.getMyOrders(this.status, this.currentPage).subscribe({
      next: (res)=>{
        this.orders = res.data;
        this.totalOrders = Number(res.msg);
        this.AllPages = Math.ceil(this.totalOrders / this.ordersPerPage);

        this._cdr.detectChanges();
      },
      error: (err)=>console.log(err)
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  setStatus(status:string){
    this.status = status;
    this.refresh();
  }

  dec(){
    if (this.currentPage != 1) this.currentPage--;
  }
  inc(){
    if (this.currentPage != this.AllPages) this.currentPage++;
  }

  setPage(page:number){
    this.currentPage = page;
  }
}
