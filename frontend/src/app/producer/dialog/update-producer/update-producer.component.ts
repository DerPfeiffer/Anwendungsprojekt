import {Component, Inject, Optional} from '@angular/core';
import {Producer} from "../../../interface/producer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-producer',
  templateUrl: './update-producer.component.html',
  styleUrls: ['./update-producer.component.css']
})
export class UpdateProducerComponent {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateProducerComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public producerInput: Producer) {
    this.form = new FormGroup({
      name: new FormControl(producerInput.name, [Validators.required])
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
    producer.id = this.producerInput.id;
    producer.name = this.form.get("name")?.value;

    return producer;
  }

  cancel() {
    this.dialogRef.close(({event: "no"}));
  }

}
