import {Component, Inject, Optional} from '@angular/core';
import {Stock} from "../../../interface/stock";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateStockComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public stock: Stock) {
    this.form = new FormGroup({
      amount: new FormControl(stock.amount, [Validators.required]),
      thresholdAmount: new FormControl(stock.thresholdAmount),
      shelf: new FormControl(stock.shelf, [Validators.required]),
      floor: new FormControl(stock.floor, [Validators.required]),
    });
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

    stock.id = this.stock.id;
    stock.product = this.stock.product;
    stock.amount = this.form.get("amount")?.value;
    stock.thresholdAmount = this.form.get("thresholdAmount")?.value;
    stock.shelf = this.form.get("shelf")?.value;
    stock.floor = this.form.get("floor")?.value;

    return stock;
  }

  cancel() {
    this.dialogRef.close(({event: "no"}));
  }

}
