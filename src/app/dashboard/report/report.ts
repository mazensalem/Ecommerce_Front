import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Nav } from "../shared/nav/nav";
import { Header } from "../shared/header/header";
import { ReportService } from '../../core/services/report.service';
import { IOrder } from '../../core/models/order.module';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from "@angular/router";
import { IProduct } from '../../core/models/products.module';
import { env } from '../../../env/env';

@Component({
  selector: 'app-report',
  imports: [DatePipe, NgClass, RouterLink],
  templateUrl: './report.html',
  styleUrl: './report.css',
})
export class Report implements OnInit {
  totalOrders!:number;
  totalRevenue!:number;
  totalProducts!:number;
  totalCustomers!:number;
  latestOrders!:IOrder[];
  lowStockProducts!:IProduct[];
  staticFilesPath = env.STATIC_FILES;

  orderClassCondition(status:string){
    return {
      'badge-idle': status == 'Pendding',
      'badge-warn': status == 'Preparing',
      'badge-ok': status == 'Recieved',
      'badge-accent': status == 'Shipped',
      'badge-bad': status == 'Rejected' || status == 'Canceled by admin' || status == 'Canceled by user'
    }
  }

  constructor (private _reportService:ReportService, private _cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    // stats
    this._reportService.getStats().subscribe({
      next: (res) => {
        this.totalCustomers = res.data.usersCount;
        this.totalOrders = res.data.ordersCount;
        this.totalProducts = res.data.productsCount;
        this.totalRevenue = res.data.totalRevenue;

        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });

    // orders
    this._reportService.getLatestOrders().subscribe({
      next: (res) => {
        this.latestOrders = res.data;

        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    })

    // products
    this._reportService.getLowStockProcts().subscribe({
      next: (data) => {
        this.lowStockProducts = data.data;
        this._cdr.detectChanges();
      }
    })
  }
}
