import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Producer} from "../../../interface/producer";
import {Product} from "../../../interface/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateProductComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public input: {
                producer: Producer[],
                product: Product
              }) {
    this.form = new FormGroup({
      name: new FormControl(input.product.name, [Validators.required]),
      price: new FormControl(input.product.price, [Validators.required]),
      producer: new FormControl(input.product.producer.id, [Validators.required])
    });
  }

  get name() {
    return this.form.get("name")
  }

  get price() {
    return this.form.get("price")
  }

  get producer() {
    return this.form.get("producer");
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(({event: "yes", product: this.getFormValuesAsModel()}));
    }
  }

  getFormValuesAsModel(): Product {
    let product = {} as Product;

    product.id = this.input.product.id;
    product.name = this.form.get("name")?.value;
    product.price = Number(this.form.get("price")?.value.toFixed(2));
    product.producer = this.form.get("producer")?.value;

    return product;
  }

  cancel() {
    this.dialogRef.close(({event: "no"}));
  }

}
