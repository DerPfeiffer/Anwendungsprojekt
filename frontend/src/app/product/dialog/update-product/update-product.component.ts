import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Producer} from "../../../interface/producer";
import {Product} from "../../../interface/product";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  constructor(public dialogRef: MatDialogRef<UpdateProductComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public input: {
                producer: Producer[],
                product: Product
              }) {
  }

  submit() {
    this.dialogRef.close(({event: 'yes', product: this.input.product}));
  }

  cancel() {
    this.dialogRef.close(({event: 'no'}));
  }
}
