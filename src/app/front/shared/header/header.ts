import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor (private _router:Router) {}
  search(event:Event){
    const text = (document.getElementById('Search') as HTMLInputElement).value;
    event.preventDefault();
    this._router.navigate([`/search/${text}`]);
  }
}
