import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ProducerService} from "../service/producer.service";
import {Producer} from "../interface/producer";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SharedService} from "../service/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateProducerComponent} from "./dialog/create-producer/create-producer.component";
import {DeleteProducerComponent} from "./dialog/delete-producer/delete-producer.component";
import {Subscription} from "rxjs";
import {UpdateProducerComponent} from "./dialog/update-producer/update-producer.component";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements AfterViewInit {

  producer: Producer[] = [];
  dataSource = new MatTableDataSource(this.producer);
  displayedColumns: string[] = ['id', 'name', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  private clickEventSubscription: Subscription;

  constructor(private _sharedService: SharedService, private _service: ProducerService, private _dialog: MatDialog) {
    this.clickEventSubscription = this._sharedService.getReloadProductsEvent().subscribe(() => {
      this.getAllProducer();
    })
  }

  ngAfterViewInit(): void {
    this.getAllProducer();
  }

  //Business-Logic
  getAllProducer() {
    this._service.getAll().subscribe(data => {
      this.producer = data;
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.dataSource.data = this.producer;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  createProducer() {
    const dialog = this._dialog.open(CreateProducerComponent);
    dialog.afterClosed().subscribe((res) => {
      if (res && res.event == "yes") {
        this._service.put(res.producer).subscribe(() => {
          this._sharedService.sendReloadProductsEvent();
        })
      }
    })
  }

  updateProducer(producer: Producer) {
    const dialog = this._dialog.open(UpdateProducerComponent, {data: producer});
    dialog.afterClosed().subscribe((res) => {
      if (res && res.event == "yes") {
        this._service.post(res.producer).subscribe(() => {
          this._sharedService.sendReloadProductsEvent();
        })
      } else {
        this.getAllProducer();
      }
    })
  }

  deleteProducer(producer: Producer) {
    const dialog = this._dialog.open(DeleteProducerComponent, {data: producer});
    dialog.afterClosed().subscribe((res) => {
      if (res && res.event == "yes") {
        this._service.delete(producer).subscribe(() => {
          this._sharedService.sendReloadProductsEvent();
        })
      }
    })
  }

}
