import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SharedService} from "../service/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {Stock} from "../interface/stock";
import {StockService} from "../service/stock.service";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements AfterViewInit {

  clickEventSubscription: Subscription;

  key = "id";
  stock: Stock [] = [];
  dataSource = new MatTableDataSource(this.stock);
  displayedColumns: string[] = ['id', 'product', 'amount', 'shelf', 'floor', 'lastIncoming', 'lastOutgoing'];
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private _sharedService: SharedService, private _service: StockService, private _dialog: MatDialog) {
    this.clickEventSubscription = this._sharedService.getReloadProductsEvent().subscribe(() => {
      this.getStock();
    })
  }

  ngAfterViewInit(): void {
    this.getStock();
  }

  getStock() {
    this._service.getAll().subscribe(data => {
      this.stock = data;
      this.updateDataSource();
    });
  }

  updateDataSource() {
    this.dataSource.data = this.stock;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter) => {
      return this.filterPredicate(data, filter);
    };

    this.dataSource.sortingDataAccessor = (data: Stock, sortHeaderId: string): string | number => {
      const propPath = sortHeaderId.split('.');
      const value: any = propPath
        // @ts-ignore
        .reduce((curObj, property) => curObj[property], data);
      return !isNaN(value) ? Number(value) : value;
    };

  }

  filterPredicate(data: Stock, filter: string): boolean {
    let matches = false;
    let filterKey = undefined;
    let filterValue = filter;

    if (filter.includes(":")) {
      let filterSplit = filter.split(":");
      filterKey = filterSplit[0].toLocaleLowerCase();
      filterValue = filterSplit[1].toLocaleLowerCase();
    }


    switch (filterKey) {
      case "id":
        matches = data.id == parseInt(filterValue)
        break;
      case "produkt":
        matches = data.product.name.toLocaleLowerCase().includes(filterValue);
        break;
      case "bestand":
        matches = data.amount == parseInt(filterValue);
        break;
      case "regal":
        matches = data.shelf == parseInt(filterValue);
        break;
      case "stock":
        matches = data.floor == parseInt(filterValue);
        break;
      case "letzter wareneingang":
        matches = data.lastIncoming.toString().includes(filterValue);
        break;
      case "letzter warenausgang":
        matches = data.lastOutgoing.toString().includes(filterValue);
        break;
      default:
        matches =
          data.id == parseInt(filterValue) ||
          data.product.name.toLocaleLowerCase().includes(filterValue) ||
          data.amount == parseInt(filterValue) ||
          data.shelf == parseInt(filterValue) ||
          data.floor == parseInt(filterValue) ||
          data.amount == parseInt(filterValue) ||
          data.lastIncoming.toString().includes(filterValue) ||
          data.lastOutgoing.toString().includes(filterValue)
    }

    return matches;
  }

  applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  createStockEntry() {

  }
}
