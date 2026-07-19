import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/header/header";
import { Footer } from "./shared/footer/footer";

@Component({
  selector: 'app-front',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './front.html',
  styleUrl: './front.css',
})
export class Front {}
