import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {SharedService} from "../service/shared.service";
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ProducerService} from "../service/producer.service";
import {Product} from "../interface/product";
import {ProductService} from "../service/product.service";
import {MatDialog} from "@angular/material/dialog";
import {DeleteProductComponent} from "./dialog/delete-product/delete-product.component";
import {CreateProductComponent} from "./dialog/create-product/create-product.component";
import {UpdateProductComponent} from "./dialog/update-product/update-product.component";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements AfterViewInit {

  clickEventSubscription: Subscription;

  key = "id";
  products: Product [] = [];
  dataSource = new MatTableDataSource(this.products);
  displayedColumns: string[] = ['id', 'name', 'price', 'producer.name', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private _sharedService: SharedService, private _service: ProductService, private _producerService: ProducerService, private _dialog: MatDialog) {
    this.clickEventSubscription = this._sharedService.getReloadProductsEvent().subscribe(() => {
      this.getAllProducts();
    })
  }

  ngAfterViewInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._service.getAll().subscribe(data => {
      this.products = data;
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.dataSource.data = this.products;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter) => {
      return data.id == parseInt(filter) ||
        data.name.toLocaleLowerCase().includes(filter) ||
        data.price == parseFloat(filter) ||
        data.producer.name.toLocaleLowerCase().includes(filter);
    };

    this.dataSource.sortingDataAccessor = (data: Product, sortHeaderId: string): string | number => {
      const propPath = sortHeaderId.split('.');
      const value: any = propPath
        // @ts-ignore
        .reduce((curObj, property) => curObj[property], data);
      return !isNaN(value) ? Number(value) : value;
    };
  }

  applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  parseFloat(price: any) {
    return parseFloat(price).toFixed(2);
  }

  createProduct() {
    this._producerService.getAll().subscribe(data => {
      const dialog = this._dialog.open(CreateProductComponent, {data: data});
      dialog.afterClosed().subscribe((res) => {
        if (res.event == "yes") {
          this._service.put(res.product).subscribe(() => {
            this.getAllProducts();
          })
        }
      })
    });
  }

  updateProduct(product: Product) {
    this._producerService.getAll().subscribe(data => {
      const dialog = this._dialog.open(UpdateProductComponent, {data: {producer: data, product: product}});
      dialog.afterClosed().subscribe((res) => {
        if (res.event == "yes") {
          this._service.post(res.product).subscribe(() => {
            this.getAllProducts();
          })
        }
      })
    });
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

}
