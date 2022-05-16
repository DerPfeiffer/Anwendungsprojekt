import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs";
import {Producer} from "../interface/producer";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ProducerService} from "../service/producer.service";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Product} from "../interface/product";
import {ProductService} from "../service/product.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DeleteProducerComponent} from "../producer/dialog/delete-producer/delete-producer.component";
import {DeleteProductComponent} from "./dialog/delete-product/delete-product.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements AfterViewInit {

  clickEventSubscription: Subscription;

  products: Product[] = [];
  dataSource = new MatTableDataSource(this.products);
  displayedColumns: string[] = ['name', 'actions'];
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  @ViewChild('dialogRef') dialogRef!: TemplateRef<any>;

  constructor(private _sharedService: SharedService, private _service: ProductService, private _dialog: MatDialog) {
    this.clickEventSubscription = this._sharedService.getReloadProductsEvent().subscribe(() => {
      this.getAllProducts();
    })
  }

  test() {
    console.log("Aufgerufen");
  }

  ngAfterViewInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._service.getAll().subscribe(data => {
      this.products = data;
      this.updateDataSource(data);
    });
  }

  updateDataSource(producer: Producer[]) {
    this.dataSource.data = this.products;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  deleteProduct(product: Product) {
    const dialog = this._dialog.open(DeleteProductComponent, {data: product});
    dialog.afterClosed().subscribe((res) => {
      if (res.event == "yes") {
        this._service.delete(product).subscribe(() => {
          this.getAllProducts();
        })
      }
    });
  }

  updateProduct(product: Product) {
    alert("TBD")
  }
}