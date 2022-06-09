import {Injectable} from '@angular/core';
import {HTTP_BASE_URL} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Stock} from '../interface/stock';
import DateUtils from "../utils/DateUtils";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  base = HTTP_BASE_URL + "stock"

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.base + "/all");
  }

  delete(stock: Stock): Observable<any> {
    const query = "id=" + stock.id;
    return this.http.delete(this.base + "?" + query);
  }

  put(stock: Stock): Observable<any> {
    let incomingISO = stock.lastIncoming ? DateUtils.toIsoString(stock.lastIncoming) : "";
    let outgoingISO = stock.lastOutgoing ? DateUtils.toIsoString(stock.lastOutgoing): "";

    const query = "amount=" + stock.amount + "&thresholdAmount=" + stock.thresholdAmount + "&lastIncoming=" + incomingISO + "&lastOutgoing=" + outgoingISO + "&shelf=" + stock.shelf + "&floor=" + stock.floor + "&productId=" + stock.product.id;
    return this.http.put(this.base + "?" + query, {});
  }

  post(stock: Stock): Observable<any> {
    const query = "id=" + stock.id + "&amount=" + stock.amount + "&thresholdAmount=" + stock.thresholdAmount + "&shelf=" + stock.shelf + "&floor=" + stock.floor + "&productId=" + stock.product.id;
    return this.http.post(this.base + "?" + query, {});
  }

}
