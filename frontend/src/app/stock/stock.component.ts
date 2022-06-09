import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SharedService} from "../service/shared.service";
import {MatDialog} from "@angular/material/dialog";
import {Stock} from "../interface/stock";
import {StockService} from "../service/stock.service";
import {MatPaginator} from "@angular/material/paginator";
import {formatDate} from "@angular/common";
import {ProductService} from "../service/product.service";
import {CreateStockComponent} from "./dialog/create-stock/create-stock.component";
import {DeleteStockComponent} from "./dialog/delete-stock/delete-stock.component";
import {UpdateStockComponent} from "./dialog/update-stock/update-stock.component";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements AfterViewInit {

  clickEventSubscription: Subscription;

  dateFormat = "dd.MM.yyyy hh:mm:ss";
  locale = 'de-DE';
  productAlreadyDeclaredMessage = "Das Produkt ist bereits zu einem anderen Eintrag hinterlegt. Der Eintrag wurde nicht gespeichert.";
  primaryClass = "mat-primary";

  key = "id";
  stock: Stock [] = [];
  dataSource = new MatTableDataSource(this.stock);
  displayedColumns: string[] = ['id', 'product', 'amount', 'thresholdAmount', 'stockWarning', 'shelf', 'floor', 'lastIncoming', 'lastOutgoing', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private _sharedService: SharedService, private _service: StockService, private _productService: ProductService, private _dialog: MatDialog) {
    this.clickEventSubscription = this._sharedService.getReloadProductsEvent().subscribe(() => {
      this.getStock();
    })
  }

  ngAfterViewInit(): void {
    this.getStock();
  }

  getStock() {
    this._service.getAll().subscribe(data => {
      data.forEach(entry => {
        entry.lastIncoming = new Date(entry.lastIncoming);
        entry.lastOutgoing = new Date(entry.lastOutgoing);
      })
      this.stock = data;
      this.updateDataSource(data);

      let buttonAllElement = document.getElementById("button_all") as Element;
      buttonAllElement.classList.add(this.primaryClass);
    });
  }

  updateDataSource(dataToDisplay: Stock[]) {
    this.dataSource.data = dataToDisplay;
    this.dataSource.paginator = this.paginator;
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
      case "warngrenze":
        matches = data.thresholdAmount == parseInt(filterValue);
        break;
      case "bestandswarnung":
        matches = this.getStockWarningPresentation(data).includes(filterValue);
        break;
      case "regal":
        matches = data.shelf == parseInt(filterValue);
        break;
      case "stock":
        matches = data.floor == parseInt(filterValue);
        break;
      case "letzter wareneingang":
        matches = this.formatDate(data.lastIncoming).toString().includes(filterValue);
        break;
      case "letzter warenausgang":
        matches = this.formatDate(data.lastOutgoing).toString().includes(filterValue);
        break;
      default:
        matches =
          data.id == parseInt(filterValue) ||
          data.product.name.toLocaleLowerCase().includes(filterValue) ||
          data.amount == parseInt(filterValue) ||
          data.thresholdAmount == parseInt(filterValue) ||
          this.getStockWarningPresentation(data).includes(filterValue) ||
          data.shelf == parseInt(filterValue) ||
          data.floor == parseInt(filterValue) ||
          data.amount == parseInt(filterValue) ||
          this.formatDate(data.lastIncoming).toString().includes(filterValue) ||
          this.formatDate(data.lastOutgoing).toString().includes(filterValue);
    }

    return matches;
  }

  applyFilter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase();
  }

  formatDate(date: Date) {
    if (date.getTime() === 0) {
      return "n.a.";
    } else {
      return formatDate(date, this.dateFormat, this.locale);
    }
  }

  getStockWarningPresentation(stockEntry: Stock) {
    return stockEntry.stockWarning ? "ja" : "nein";
  }

  filterWarnings() {
    let stockWithWarnings: Stock[] = this.stock.filter(entry => entry.stockWarning);
    this.dataSource.data = stockWithWarnings;
    this.toggleFilterButtons();
  }

  filterNothing() {
    this.dataSource.data = this.stock;
    this.toggleFilterButtons();
  }

  toggleFilterButtons() {
    let buttonWarningsElement = document.getElementById("button_warnings") as Element;
    let buttonAllElement = document.getElementById("button_all") as Element;

    buttonWarningsElement.classList.contains(this.primaryClass) ? buttonWarningsElement.classList.remove(this.primaryClass) : buttonWarningsElement.classList.add(this.primaryClass);
    buttonAllElement.classList.contains(this.primaryClass) ? buttonAllElement.classList.remove(this.primaryClass) : buttonAllElement.classList.add(this.primaryClass);
  }

  createStockEntry() {
    this._productService.getAll().subscribe(data => {
      const productsAbleToAdd = data.filter(product => (this.stock.find(stockEntry => stockEntry.product.id == product.id)) ? false : true);
      const dialog = this._dialog.open(CreateStockComponent, {data: productsAbleToAdd});
      dialog.afterClosed().subscribe((res) => {
        if (res.event == "yes") {
          console.log(res.stock);
          this._service.put(res.stock).subscribe(data => {
            if (data != null) {
              this.getStock();
            } else {
              alert(this.productAlreadyDeclaredMessage);
            }
          })
        }
      })
    });
  }

  updateStock(stock: Stock) {
    const dialog = this._dialog.open(UpdateStockComponent, {data: stock});
    dialog.afterClosed().subscribe((res) => {
      if (res.event == "yes") {
        console.log(res.stock);
        this._service.post(res.stock).subscribe(data => {
          if (data != null) {
            this.getStock();
          }
        })
      }
    })
  }

  deleteStock(stock: Stock) {
    const dialog = this._dialog.open(DeleteStockComponent, {data: stock});
    dialog.afterClosed().subscribe((res) => {
      if (res.event == "yes") {
        this._service.delete(stock).subscribe(() => {
          this.getStock();
        })
      }
    })
  }
}
