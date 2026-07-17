import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { IOrder } from '../../core/models/order.module';
import { DatePipe, NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'app-orders',
  imports: [DatePipe, NgClass, ReactiveFormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css',
})
export class Orders implements OnInit {
  constructor (private _orderSerive:OrdersService, private _cdr:ChangeDetectorRef){}
  orders!:IOrder[];

  totalOrders!:number;
  ordersPerPage:number = 10;
  currentPage = 1;
  totalPages!:number;

  filters = {
    status: 'ALL',
    date: 'NONE'
  }

  selectedOrder:IOrder | null = null;

  orderStatusForm!:FormGroup;

  refresh (){
    this._orderSerive.getAllOrders(this.filters.date, this.currentPage, this.filters.status).subscribe({
      next: (res) => {
        this.orders = res.data;

        this.totalOrders = Number(res.msg);
        this.totalPages = Math.ceil(this.totalOrders / this.ordersPerPage);
        this.ordersPerPage = Math.min(this.ordersPerPage, this.totalOrders);

        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  incPage() { this.currentPage++; this.refresh(); }
  setPage(page:number) {
    this.currentPage = page;
    this.refresh();
  }
  decPage() { this.currentPage--; this.refresh(); }

  setStatus(status:string){
    this.filters.status = status;
    this.refresh();
  }

  setDate(event:Event){
    this.filters.date = (event.target as HTMLDataElement).value;
    this.refresh();
  }

  selectOrder(order:IOrder){
    this.selectedOrder = order;
    this.orderStatusForm = new FormGroup({
      status: new FormControl(this.selectedOrder.status)
    });
    this._cdr.detectChanges();
  }

  saveOrderStatus(){
    if (this.selectedOrder){
      this._orderSerive.changeOrderStatus(this.selectedOrder._id, this.orderStatusForm.value['status']).subscribe({
        next: (res)=>{
          this.refresh();
          this.cancel();
        },
        error: (err) => console.log(err)
      });
    }
  }

  cancel(){
    this.selectedOrder = null;
    this.orderStatusForm.reset();
    this._cdr.detectChanges();
  }
}
