import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { UserService } from '../../../core/services/user.service';
import { IUser } from '../../../core/models/user.module';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnChanges {
  constructor (private _router:Router, private _userService:UserService, private _cdr:ChangeDetectorRef) {}
  user!:IUser | null;
  cartCount!:number;
  
  search(event:Event){
    const text = (document.getElementById('Search') as HTMLInputElement).value;
    event.preventDefault();
    this._router.navigate(['/search'], {queryParams: {text}});
  }
  
  refresh(){
    this.cartCount = 0;
    if (!this._userService.getToken()) {
      this._cdr.detectChanges();
      this.user = null;
      return;
    }
    
    this._userService.getUser()?.subscribe({
      next: (res)=>{
        this.user = res.data;
      }
    });

    this._userService.getCartCount().subscribe({
        next: (res) => {
          this.cartCount = res.data.products.length;
          this._cdr.detectChanges();
        },
        error: (err) => console.log(err) 
      })
    this._cdr.detectChanges();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  ngOnInit(): void {
    this._userService.loginCB = () => this.refresh();
    this.refresh();
  }

  logout(){
    this._userService.logout();
    this._router.navigate(['/']);
    this.refresh();
    this._cdr.detectChanges();
  }
  
}
