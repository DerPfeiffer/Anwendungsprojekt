import {Component, Inject, Optional} from '@angular/core';
import {Product} from "../../../interface/product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Stock} from "../../../interface/stock";

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.component.html',
  styleUrls: ['./create-stock.component.css']
})
export class CreateStockComponent {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateStockComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public input: Product[]) {
    input.sort((a, b) => a.name.localeCompare(b.name));
    this.form = new FormGroup({
      product: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
      thresholdAmount: new FormControl(""),
      shelf: new FormControl("", [Validators.required]),
      floor: new FormControl("", [Validators.required]),
      lastIncoming: new FormControl(""),
      lastOutgoing: new FormControl("")
    });
  }

  get product() {
    return this.form.get("product")
  }

  get amount() {
    return this.form.get("amount")
  }

  get shelf() {
    return this.form.get("shelf");
  }

  get floor() {
    return this.form.get("floor");
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(({event: "yes", stock: this.getFormValuesAsModel()}));
    }
  }

  getFormValuesAsModel(): Stock {
    let stock = {} as Stock;

    stock.product = this.form.get("product")?.value;
    stock.amount = this.form.get("amount")?.value;
    stock.thresholdAmount = this.form.get("thresholdAmount")?.value;
    stock.shelf = this.form.get("shelf")?.value;
    stock.floor = this.form.get("floor")?.value;
    stock.lastIncoming = this.form.get("lastIncoming")?.value;
    stock.lastOutgoing = this.form.get("lastOutgoing")?.value;

    return stock;
  }

  cancel() {
    this.dialogRef.close(({event: "no"}));
  }

}
