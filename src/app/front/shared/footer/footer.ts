import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from '../../../core/services/home.service';
import { ICatagory } from '../../../core/models/catagory.module';
import { RouterLink } from '@angular/router';
import { IPage } from '../../../core/models/page.module';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  constructor (private _homeService:HomeService, private _cdr:ChangeDetectorRef){}

  catagories!:ICatagory[];
  pages!:IPage[];

  ngOnInit(): void {
    this._homeService.getCatagories().subscribe({
      next: (res) => {
        this.catagories = res.data;
        this._cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });

    this._homeService.getPages().subscribe({
      next: (res)=>{
        this.pages = res.data;
        this._cdr.detectChanges();
      }
    })

  }
}
