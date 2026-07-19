import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../core/services/testimonial.service';
import { ITest } from '../../core/models/Testimonials.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [NgClass],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials implements OnInit {
  constructor (private _testimonialService:TestimonialService, private _cdr:ChangeDetectorRef){}
  totalApprovedCount:number = 0;
  totalDeclinedCount:number = 0;
  totalPendingCount:number = 0;

  tests!:ITest[];
  filter:string = 'all';

  totalTest!:number;
  totalPage!:number;
  currentPage:number = 1;
  testsPerPage = 5;
  
  
  refresh(){
    this._testimonialService.getStats().subscribe({
      next: (res)=>{
        this.totalApprovedCount = 0;
        this.totalDeclinedCount = 0;
        this.totalPendingCount = 0;
        for (let stat of res.data){
          if (stat._id == 'pendding'){
            this.totalPendingCount = stat.count;
          }else if (stat._id == 'approved'){
            this.totalApprovedCount = stat.count;
          }else{
            this.totalDeclinedCount = stat.count;
          }
        }

        this.totalTest = this.totalApprovedCount + this.totalDeclinedCount + this.totalPendingCount;
        this.totalPage = Math.ceil(this.totalTest / this.testsPerPage);
        
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    })


    this._testimonialService.getAll(this.filter, this.currentPage).subscribe({
      next: (res) => {
        this.tests = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    })
  }

  ngOnInit(): void {
    this.refresh();
  }

  setfilter(status:string){
    this.filter = status;
    this.refresh();
  }

  setPage(page:number){
    this.currentPage = page;
    this.refresh();
  }

  inc(){
    if (this.currentPage > 1){
      this.currentPage--;
      this.refresh();
    }
  }

  dec(){
    if (this.currentPage < this.totalPage){
      this.currentPage++;
      this.refresh();
    }
  }

  setStatus(id:string, status:string){
    this._testimonialService.setStatus(id, status).subscribe({
      next: (res) => this.refresh(),
      error: (err) => console.log(err)
    })
  }
}
