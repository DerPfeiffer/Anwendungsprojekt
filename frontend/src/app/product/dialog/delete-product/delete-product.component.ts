import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Producer} from "../../../interface/producer";
import {Product} from "../../../interface/product";

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {

  constructor(public dialogRef: MatDialogRef<DeleteProductComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public input: Product) {
  }

  submit() {
    this.dialogRef.close({event: 'yes'});
  }

  cancel() {
    this.dialogRef.close({event: 'no'});
  }

}
