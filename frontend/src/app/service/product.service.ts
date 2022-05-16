import { Injectable } from '@angular/core';
import {HTTP_BASE_URL} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Producer} from "../interface/producer";
import {Product} from "../interface/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  base = HTTP_BASE_URL + "product"

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base + "/all");
  }

  delete(product: Product): Observable<any> {
    const query = "id=" + product.id;
    return this.http.delete(this.base + "?" + query);
  }

  //TODO single??
  //TODO put
  //TODO post

}
