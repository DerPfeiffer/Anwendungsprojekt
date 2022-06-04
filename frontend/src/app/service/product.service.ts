import {Injectable} from '@angular/core';
import {HTTP_BASE_URL} from "../app.module";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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

  put(product: Product): Observable<any> {
    const query = "name=" + product.name + "&price=" + product.price + "&producerId=" + product.producer.id;
    return this.http.put(this.base + "?" + query, {});
  }

  post(product: Product): Observable<any> {
    const query = "id=" + product.id + "&name=" + product.name + "&price=" + product.price + "&producerId=" + product.producer.id;
    return this.http.post(this.base + "?" + query, {});
  }

}
