import {Component, Inject, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Producer} from "../../../interface/producer";

@Component({
  selector: 'app-delete-producer',
  templateUrl: './delete-producer.component.html',
  styleUrls: ['./delete-producer.component.css']
})
export class DeleteProducerComponent {

  constructor(public dialogRef: MatDialogRef<DeleteProducerComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public input: Producer) {
  }

  submit() {
    this.dialogRef.close({event: "yes"});
  }

  cancel() {
    this.dialogRef.close({event: "no"});
  }

}
