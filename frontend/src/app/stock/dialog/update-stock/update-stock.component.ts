import {Component, Inject, Optional} from '@angular/core';
import {Stock} from "../../../interface/stock";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../interface/product";

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent {
  constructor(public dialogRef: MatDialogRef<UpdateStockComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public stock: Stock) {
  }

  submit() {
    this.dialogRef.close(({event: 'yes', stock: this.stock}));
  }

  cancel() {
    this.dialogRef.close(({event: 'no'}));
  }

}
