import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Producer} from "../../../interface/producer";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-producer',
  templateUrl: './create-producer.component.html',
  styleUrls: ['./create-producer.component.css']
})
export class CreateProducerComponent {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateProducerComponent>) {
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required])
    });
  }

  get name() {
    return this.form.get("name")
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(({event: "yes", producer: this.getFormValuesAsModel()}));
    }
  }

  getFormValuesAsModel(): Producer {
    let producer = {} as Producer;
    producer.name = this.form.get("name")?.value;

    return producer;
  }

  cancel() {
    this.dialogRef.close(({event: "no"}));
  }

}
