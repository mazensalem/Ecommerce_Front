import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IProduct } from '../../../core/models/products.module';
import { ProductsService } from '../../../core/services/products.service';
import { env } from '../../../../env/env';
import { ICatagory } from '../../../core/models/catagory.module';
import { CategoriesService } from '../../../core/services/categories.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [RouterLink, NgClass],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  constructor (private _router:Router, private route:ActivatedRoute, private _productService:ProductsService, private _cdr:ChangeDetectorRef, private _catagoryService:CategoriesService) {}
  products!:IProduct[];
  search:string = '';
  staticFilesPath = env.STATIC_FILES;
  
  catagories!:ICatagory[];
  activeCatagories:ICatagory[] = [];

  minPrice:number|null = null;
  maxPrice:number|null = null;

  searchText:string|null = null;

  currentPage:number = 1;
  totalProducts!:number;
  productsPerPage = 10;
  totalPages!:number;

  refresh(){
    this._productService.searchProducts(this.searchText || "", this.activeCatagories.length ? this.activeCatagories[0]._id : '', this.minPrice || 0, this.maxPrice || 1e19).subscribe({
      next: (res)=>{
        this.products = res.data;

        this.totalProducts = Number(res.msg);
        this.totalPages = Math.ceil(this.totalProducts / this.productsPerPage);
        
        this._cdr.detectChanges();
      },
      error: (err)=>console.log(err)
    });
  }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (res)=>{
        this.searchText = res.get('text');
        this.refresh();
      },
      error: (err) => console.log(err)
    });
    this.refresh();
    

    this._catagoryService.getAllActive().subscribe({
      next: (res)=>{
        this.catagories = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  toggleCat(category:ICatagory){
    if (this.activeCatagories.includes(category)){
      // this.activeCatagories = this.activeCatagories.filter((cat:ICatagory)=>cat != category);
      this.activeCatagories = [];
    }else{
      this.activeCatagories = [category];
    }
    this.refresh();
  }

  setMinPrice(event:Event){
    this.minPrice = Number((event.target as HTMLInputElement).value);
    this.refresh();
  }
  setMaxPrice(event:Event){
    this.maxPrice = Number((event.target as HTMLInputElement).value);
    this.refresh();
  }

  clearFilters(){
    this.maxPrice = null;
    this.minPrice = null;
    this.searchText = null;
    this.activeCatagories = [];
    this.refresh();
  }

  dec(){
    if (this.currentPage > 1) this.currentPage--;
    this.refresh(); 
  }
  inc(){
    if (this.currentPage < this.totalPages) this.currentPage++;
    this.refresh();
  }
  setPage(page:number){
    this.currentPage = page;
    this.refresh();
  }

}
