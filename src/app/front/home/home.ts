import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from '../../core/services/home.service';
import { IHomeCatagory } from '../../core/models/catagory.module';
import { RouterLink } from "@angular/router";
import { env } from '../../../env/env';
import { IProduct } from '../../core/models/products.module';
import { ITest } from '../../core/models/Testimonials.module';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgStyle],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor (private _homeService:HomeService, private _cdr:ChangeDetectorRef) {}
  staticFilesPath = env.STATIC_FILES;

  catagories!:IHomeCatagory[];
  popularProducts!:IProduct[];
  tests!:ITest[]; 

  


  ngOnInit(): void {
    
    this._homeService.getCatagories().subscribe({
      next: (res) => {
        this.catagories = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });

    this._homeService.getBestSellingProducts().subscribe({
      next: (res) => {
        this.popularProducts = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });

    this._homeService.getTest().subscribe({
      next: (res) => {
        this.tests = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    })

  }



}
