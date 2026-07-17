import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICatagory, ISubCatagory } from '../../../core/models/catagory.module';
import { CategoriesService } from '../../../core/services/categories.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PopupService } from '../../../core/services/popup.service';

@Component({
  selector: 'app-add-edit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-form.html',
  styleUrl: './add-edit-form.css',
})
export class AddEditForm implements OnInit {
  @Output() Finished:EventEmitter<string> = new EventEmitter();
  @Input() category!:ICatagory|null;
  @Input() subCategory!:ISubCatagory|null;
  
  constructor (private _catagoriesService:CategoriesService, private _cdr:ChangeDetectorRef, private _dialogService:PopupService){}
  categories!:ICatagory[];

  categoryForm:FormGroup = new FormGroup({
    name: new FormControl(''), 
    slug: new FormControl(''), 
    isActive: new FormControl(true, {nonNullable: true}),
    img: new FormControl()
  });

  parentCategoryId:null|string = null;

  refresh(){
    this._catagoriesService.getAllActive().subscribe({
      next: (res) => {
        this.categories = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });

    this.parentCategoryId = 'NONE';
    if (this.category){
      this.categoryForm.patchValue({...this.category});
    }else if (this.subCategory){
      this.categoryForm.patchValue({...this.subCategory});
      this.parentCategoryId = this.subCategory.catagoryId;
    }
    (document.getElementById('c-parent') as HTMLSelectElement).value = this.parentCategoryId;
  }
  
  ngOnInit(): void {
    this.refresh();
  }

  onSumbit(){
    const Data:FormData = new FormData();
    Data.append('name', this.categoryForm.value['name']);
    Data.append('slug', this.categoryForm.value['slug']);
    Data.append('isActive', this.categoryForm.value['isActive']);
    if (this.categoryForm.value['img']) { Data.append('img', this.categoryForm.value['img']); }
    
    if (this.category){
      this._catagoriesService.editCategory(this.category._id, Data).subscribe({
        next: (res) => {
          this.category = null;
          this.refresh();
          this.Finished.emit('');
          this.categoryForm.reset();
          this._dialogService.open('Category Edited');
        },
        error: (err) => console.log(err)
      });
    }else if (this.subCategory){
      Data.append('catagoryId', this.parentCategoryId as string);
      this._catagoriesService.editSubCategory(this.subCategory._id, Data).subscribe({
        next: (res) => {
          this.subCategory = null;
          this.refresh();
          this.Finished.emit('');
          this.categoryForm.reset();
          this._dialogService.open('SubCategory Edited');
        },
        error: (err) => console.log(err)
      })
    }else{
      if (this.parentCategoryId){
        Data.append('catagoryId', this.parentCategoryId);
        this._catagoriesService.createSubCategory(Data).subscribe({
          next: (res)=>{
            this.categoryForm.reset();
            this.Finished.emit('');
            this._dialogService.open('SubCatagory Created');
          },
          error: (err) => console.log(err)
        })
      }else{
        this._catagoriesService.createCategory(Data).subscribe({
          next: (res)=>{
            this.categoryForm.reset();
            this.Finished.emit('');
            this._dialogService.open('Catagory Created');
            this.refresh();
          },
          error: (err)=>console.log(err)
        });
      }
    }
  }

  selectParentCategory(event:Event){
    if ((event.target as HTMLSelectElement).value != 'NONE'){
      this.parentCategoryId = (event.target as HTMLSelectElement).value;
    }else{
      this.parentCategoryId = null;
    }
  }

  setImg(event:Event){
    const htmlElement = event.target as HTMLInputElement;
    if (htmlElement.files?.length){
      this.categoryForm.patchValue({img: htmlElement.files[0]});
    }
  }

  discard(){
    this.categoryForm.reset();
    this.parentCategoryId = null;
    this.category = null;
    this.subCategory = null;
  }

}
