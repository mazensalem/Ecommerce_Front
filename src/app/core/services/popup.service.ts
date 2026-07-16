import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Popups } from '../../dashboard/shared/popups/popups';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  open(data: string) {
    return this.dialog.open(Popups, { data });
  }
}
