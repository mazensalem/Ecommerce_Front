import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUser } from '../../../core/models/user.module';
import { UserService } from '../../../core/services/user.service';
import { Router, RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile-skeleton',
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './profile-skeleton.html',
  styleUrl: './profile-skeleton.css',
})
export class ProfileSkeleton implements OnInit {
  constructor (private _userService:UserService, private _cdr:ChangeDetectorRef, private _router:Router) {}
  user!:IUser;

  refresh(){
    this._userService.getUser()?.subscribe({
      next: (res)=>{
        this.user = res.data;
        this._cdr.detectChanges();
      },
      error: (err)=>console.log(err)
    })
  }

  ngOnInit(): void {
    this._userService.skeltonCB = () => this.refresh();
    
    if (!this._userService.getToken()){
      this._router.navigate(['/']);
      return;
    }

    this.refresh();
  }
  
  logOut(){
    this._userService.logout();
    this._router.navigate(['/']);
  }
}
