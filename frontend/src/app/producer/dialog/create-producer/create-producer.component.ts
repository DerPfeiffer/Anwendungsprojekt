import {AfterViewInit, Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Producer} from "../../../interface/producer";
import {ProducerService} from "../../../service/producer.service";

@Component({
  selector: 'app-create-producer',
  templateUrl: './create-producer.component.html',
  styleUrls: ['./create-producer.component.css']
})
export class CreateProducerComponent {

  producer = {} as Producer;

  constructor(public dialogRef: MatDialogRef<CreateProducerComponent>) {
  }

  submit() {
    this.dialogRef.close(({event: 'yes', producer: this.producer}));
  }

  cancel() {
    this.dialogRef.close(({event: 'no'}));
  }
}
