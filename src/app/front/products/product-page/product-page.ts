import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { IProduct } from '../../../core/models/products.module';
import { ActivatedRoute } from '@angular/router';
import { env } from '../../../../env/env';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit {
  constructor (private _productService:ProductsService, private _cdr:ChangeDetectorRef, private route:ActivatedRoute){}

  product!:IProduct;
  staticFilesPath = env.STATIC_FILES;
  quantatiy!:number;
  
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug){
      this._productService.getProduct(slug).subscribe({
        next: (res) => {
          this.product = res.data;
          this.quantatiy = this.product.stock ? 1 : 0;
          this._cdr.detectChanges();
        },
        error: (err)=>console.log(err)
      })
    }
  }

  dec(){
    if (this.quantatiy > 1) this.quantatiy--;
    this._cdr.detectChanges();
  }
  inc(){
    if (this.quantatiy < this.product.stock) this.quantatiy++;
    this._cdr.detectChanges();
  }

  addCart(){
    for (let i = 0; i < this.quantatiy; i++) {
      this._productService.addToCart(this.product._id).subscribe({
        next: (res) => {},
        error: (err) => console.log(err)
      });
    }
  }


}
