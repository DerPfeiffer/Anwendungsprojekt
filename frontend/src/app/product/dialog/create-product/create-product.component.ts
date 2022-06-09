import {Component, Inject, Optional} from '@angular/core';
import {Producer} from "../../../interface/producer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../interface/product";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateProductComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public input: Producer[]) {
    input.sort((a, b) => a.name.localeCompare(b.name));
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      producer: new FormControl("", [Validators.required])
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
    product.name = this.form.get("name")?.value;
    product.price = Number(this.form.get("price")?.value.toFixed(2));
    product.producer = this.form.get("producer")?.value;

    return product;
  }

  cancel() {
    this.dialogRef.close(({event: "no"}));
  }

}
