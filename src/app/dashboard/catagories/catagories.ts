import { ChangeDetectorRef, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICatagory, ISubCatagory, IViewCatagory } from '../../core/models/catagory.module';
import { env } from '../../../env/env';
import { NgClass } from '@angular/common';
import { AddEditForm } from "./add-edit-form/add-edit-form";
import { PopupService } from '../../core/services/popup.service';

@Component({
  selector: 'app-catagories',
  imports: [NgClass, AddEditForm],
  templateUrl: './catagories.html',
  styleUrl: './catagories.css',
})
export class Catagories implements OnInit {
  constructor (private _categoryService:CategoriesService, private _cdr:ChangeDetectorRef, private _dialogService:PopupService) {}
  
  categories!:IViewCatagory[];
  staticFilesPath = env.STATIC_FILES;

  @ViewChild(AddEditForm) formComponent!:AddEditForm;

  selectedCategory:null|ICatagory = null;
  selectedSubCategory:null | ISubCatagory = null;
  

  refresh(){
    this._categoryService.getAll().subscribe({
      next: (res) => {
        this.categories = res.data;
        this._cdr.detectChanges();
        this.formComponent.refresh();
      },
      error: (e) => console.log(e)
    })
  }
  
  ngOnInit(): void {
    this.refresh();
  }

  deleteCategory(id:string){
    this._categoryService.deleteCategory(id).subscribe({
      next: (res) => {
        this.refresh();
        this._dialogService.open('Catagory Deleted');
      }
    });
  }

  deleteSubCategory(id:string){
    this._categoryService.deleteSubCategory(id).subscribe({
      next: (res) => {
        this.refresh();
        this._dialogService.open('SubCatagory Deleted');
      }
    });
  }

  selectCategory(category:ICatagory){
    this.selectedCategory = category;
    this.selectedSubCategory = null;
    this.refresh();
  }

  selectSubCategory(subCategory:ISubCatagory){
    this.selectedSubCategory = subCategory;
    this.selectedCategory = null;
    this.refresh();
  }
}
