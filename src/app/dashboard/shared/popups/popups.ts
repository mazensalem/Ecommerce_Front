import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog'; 
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-popups',
  imports: [MatDialogModule, 
    MatButtonModule],
  templateUrl: './popups.html',
  styleUrl: './popups.css',
})
export class Popups {
  constructor (@Inject(MAT_DIALOG_DATA) public msg: string){}
}
