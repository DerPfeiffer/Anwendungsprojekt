import {Component, Inject, Optional} from '@angular/core';
import {Product} from "../../../interface/product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Stock} from "../../../interface/stock";

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  stock = {} as Stock;

  constructor(public dialogRef: MatDialogRef<CreateStockComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public input: Product[]) {
    input.sort((a, b) => a.name.localeCompare(b.name));
  }

  submit() {
    this.dialogRef.close(({event: 'yes', stock: this.stock}));
  }

  cancel() {
    this.dialogRef.close(({event: 'no'}));
  }

}
