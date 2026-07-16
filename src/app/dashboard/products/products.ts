import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/models/products.module';
import { env } from '../../../env/env';
import { NgClass } from '@angular/common';
import { AddEditForm } from "./add-edit-form/add-edit-form";
import { PopupService } from '../../core/services/popup.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ICatagory } from '../../core/models/catagory.module';

@Component({
  selector: 'app-products',
  imports: [NgClass, AddEditForm],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  staticFilesPath = env.STATIC_FILES;

  products!:IProduct[];
  selectedProduct:IProduct|null = null;
  @ViewChild('formview') formview!:ElementRef<HTMLDivElement>;

  allCategories!:ICatagory[];

  filters = {
    active: 0,
    catagory: 'ALL'
  };
  totalProductsCount!:number;
  productsPerPage!:number;
  totalPages!:number;
  currentPage = 1;


  constructor (private _productService:ProductsService, private _cdr:ChangeDetectorRef, private _popupService:PopupService, private _catagorySerive:CategoriesService){}

  referesh(){
    this._productService.getAllProducts(this.filters.active, this.filters.catagory, this.currentPage).subscribe({
      next: (res) => {
        this.products = res.data;

        this.totalProductsCount = Number(res.msg);
        this.productsPerPage = Math.min(this.totalProductsCount, 10);
        this.totalPages = Math.ceil(this.totalProductsCount / this.productsPerPage);
        
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    })
  }

  ngOnInit(): void {
    this._catagorySerive.getAllActive().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      },
      error: (err) => console.log(err)
    })
    this.referesh();
  }

  moveToForm(){
    this.formview.nativeElement.scrollIntoView({behavior: 'smooth'});
  }

  selectProduct(product:IProduct) {
    this.selectedProduct = product;
    this.moveToForm();
  }
  deletedProduct(product:IProduct){
    this._productService.deleteProduct(product._id).subscribe({
      next: (res) => {
        this.referesh();
        this._popupService.open('Product Deleted');
      },
      error: (err)=>console.log(err)
    });
  }

  addProduct(){
    this.selectedProduct = null;
    this.moveToForm();
  }

  setActive(value: number){
    this.filters.active = value;
    this.referesh();
  }

  setCatagory(event:Event){
    const category = (event.target as HTMLSelectElement).value;
    this.filters.catagory = category;
    this.referesh();
  }

  setPage(page:number){
    this.currentPage = page; 
    this.referesh()
  }

  decPage(){
    if (this.currentPage != 1){
      this.currentPage--;
      this.referesh();
    }
  } 
  
  incPage(){
    if (this.currentPage != this.totalPages){
      this.currentPage++;
      this.referesh();
    }
  } 
}
