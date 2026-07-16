import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "./shared/nav/nav";
import { Header } from "./shared/header/header";


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Nav, Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
