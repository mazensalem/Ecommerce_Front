import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PagesService } from '../../core/services/pages.service';
import { IPage } from '../../core/models/page.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PopupService } from '../../core/services/popup.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pages',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './pages.html',
  styleUrl: './pages.css',
})
export class Pages implements OnInit {
  constructor (private _pageService:PagesService, private _cdr:ChangeDetectorRef, private _dialogService:PopupService){}

  pages!:IPage[];

  selectedPage:IPage|null = null;

  pagesForm:FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    slug: new FormControl(''),
    active: new FormControl(true, {nonNullable: true})
  });

  refresh(){
    this._pageService.getPages().subscribe({
      next: (res) => {
        this.pages = res.data;
        this._cdr.detectChanges();
      },
      error: (err)=>console.log(err)
    })
  }

  ngOnInit(): void {
    this.refresh();
  }

  cancel(){
    this.pagesForm.reset();
    this.selectedPage = null;
  }

  onSubmit(){
    if (this.selectedPage){
      this._pageService.editPage(this.selectedPage.slug, this.pagesForm.value).subscribe({
        next: (res)=>{
          this.pagesForm.reset();
          this.refresh();
          this.selectedPage = null;
          this._dialogService.open('Page Edited');
        },
        error: (err) => console.log(err) 
      })
    }else{
      this._pageService.createPage(this.pagesForm.value).subscribe({
        next: (res) => {
          this.refresh();
          this.pagesForm.reset();
          this._dialogService.open('Page Created');
        },
        error: (err)=>console.log(err)
      })
    }
  }

  deletePage(slug:string) {
    this._pageService.deletePage(slug).subscribe({
      next: (res)=>{
        this.refresh();
        this._dialogService.open('Page Deleted');
      },
      error: (err) => console.log(err)
    });
  }

  selectPage(page:IPage){
    this.selectedPage = page;
    this.pagesForm.patchValue({...this.selectedPage});
  }
  
}
