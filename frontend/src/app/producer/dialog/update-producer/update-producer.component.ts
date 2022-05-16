import {Component, Inject, OnInit, Optional} from '@angular/core';
import {Producer} from "../../../interface/producer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProducerService} from "../../../service/producer.service";

@Component({
  selector: 'app-update-producer',
  templateUrl: './update-producer.component.html',
  styleUrls: ['./update-producer.component.css']
})
export class UpdateProducerComponent {

  constructor(public dialogRef: MatDialogRef<UpdateProducerComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public producer: Producer) {
  }

  submit() {
    this.dialogRef.close(({event: 'yes', producer: this.producer}));
  }

  cancel() {
    this.dialogRef.close(({event: 'no'}));
  }


}
