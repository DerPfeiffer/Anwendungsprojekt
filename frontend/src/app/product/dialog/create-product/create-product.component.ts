import {Component, Inject, Optional} from '@angular/core';
import {Producer} from "../../../interface/producer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../interface/product";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  product = {} as Product;

  constructor(public dialogRef: MatDialogRef<CreateProductComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public input: Producer[]) {
  }

  submit() {
    this.product.price = Number(this.product.price.toFixed(2));
    this.dialogRef.close(({event: 'yes', product: this.product}));
  }

  cancel() {
    this.dialogRef.close(({event: 'no'}));
  }


}
