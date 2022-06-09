import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Stock} from "../../../interface/stock";

@Component({
  selector: 'app-delete-stock',
  templateUrl: './delete-stock.component.html',
  styleUrls: ['./delete-stock.component.css']
})
export class DeleteStockComponent {
  constructor(public dialogRef: MatDialogRef<DeleteStockComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public input: Stock) {
  }

  submit() {
    this.dialogRef.close({event: 'yes'});
  }

  cancel() {
    this.dialogRef.close({event: 'no'});
  }
}
