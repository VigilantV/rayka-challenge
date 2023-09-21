import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  standalone: true,
})
export class SnackbarComponent {
  constructor(private _snackBar: MatSnackBar) {
    this._snackBar.open('« Server Error »', 'got it', {
      panelClass: ['snackbar'],
    });
  }
}
