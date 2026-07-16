import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminsService } from '../../../core/services/admins.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  constructor (private _adminService:AdminsService, private _router:Router){}
  username!:string;
  handleLogout() {
    this._adminService.logout();
  }

  ngOnInit(): void {
    const user = this._adminService.getUser();
    if (!user){
      this._router.navigate(['/admin/login']);
    }
    this.username = user?.name ? user?.name : "";
  }
}
