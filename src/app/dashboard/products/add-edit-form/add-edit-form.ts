import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../core/models/products.module';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICatagory, ISubCatagory } from '../../../core/models/catagory.module';
import { CategoriesService } from '../../../core/services/categories.service';
import { ProductsService } from '../../../core/services/products.service';
import { PopupService } from '../../../core/services/popup.service';


@Component({
  selector: 'app-add-edit-form',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './add-edit-form.html',
  styleUrl: './add-edit-form.css'
})
export class AddEditForm implements OnInit {

  constructor (private _catagoryService:CategoriesService, private _productService:ProductsService, private _cdr: ChangeDetectorRef, private _dialog: PopupService){}

  @Input() product!:null|IProduct;
  @Output() refreshEvent:EventEmitter<string> = new EventEmitter();

  categories!:ICatagory[];
  subcategories:ISubCatagory[] | null = null;
  
  productForm:FormGroup = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    desc: new FormControl('', { nonNullable: true }),
    price: new FormControl(0, { nonNullable: true }),
    slug: new FormControl('', { nonNullable: true }),
    newArrivals: new FormControl(false, { nonNullable: true }),
    mostPopular: new FormControl(false, { nonNullable: true }),
    catagory: new FormControl('', { nonNullable: true }),
    subCatagory: new FormControl('', { nonNullable: true }),
    isActive: new FormControl(true, { nonNullable: true }),
    img: new FormControl(),
    stock: new FormControl(0, { nonNullable: true })
  });

  ngOnInit(): void {
    this._catagoryService.getAllActive().subscribe({
      next: (res) => {
        this.categories = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => {console.log(err);}
    });
  }

  onSubmit(){
    const Data = new FormData();
    
    Data.append('title', this.productForm.value['title']);
    Data.append('desc', this.productForm.value['desc']);
    Data.append('stock', this.productForm.value['stock']);
    Data.append('isActive', this.productForm.value['isActive']);
    if (this.productForm.value['img']) { Data.append('img', this.productForm.value['img']); }
    Data.append('subCatagory', this.productForm.value['subCatagory']);
    Data.append('catagory', this.productForm.value['catagory']);
    Data.append('mostPopular', this.productForm.value['mostPopular']);
    Data.append('newArrivals', this.productForm.value['newArrivals']);
    Data.append('slug', this.productForm.value['slug']);
    Data.append('price', this.productForm.value['price']);


    if (this.product?._id){
      this._productService.editProduct(this.product._id, Data).subscribe({
        next: (res) => {
          this.product = null;
          this.productForm.reset();
          this.refreshEvent.emit('');
          this._dialog.open("product Edited");
        },
        error: (err) => console.log(err)
      })
    }else{
      this._productService.createProduct(Data).subscribe({
        next: (res) => {
          this.productForm.reset();
          this.refreshEvent.emit('');
          this._dialog.open("product created");
        },
        error: (err) => console.log(err)
      });
    }
  }

  ngOnChanges(){
    this.productForm.reset();
    if (this.product?._id){
      this.productForm.patchValue(
        {...this.product}
      );
      this.productForm.patchValue({
        catagory: this.product.catagory._id,
        subCatagory: this.product.subCatagory._id 
      });
      this.onCategorySelect({target: {value: this.product.catagory._id}});
    }
  }

  setImg(event:any){
    if (event.target.files.length > 0){
      this.productForm.patchValue({img: event.target.files[0]});
    }
  }

  changeStatus(event:any){ this.productForm.patchValue({isActive: (event.target.value == 'true')}); }

  onCategorySelect(event:any){
    this._catagoryService.getSubCategories(event.target.value).subscribe({
      next: (res)=>{
        this.subcategories = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  discard(){
    this.productForm.reset();
    this.product = null;
  }

}
