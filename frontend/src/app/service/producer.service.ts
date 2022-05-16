import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppModule, HTTP_BASE_URL} from "../app.module";
import {Producer} from "../interface/producer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  base = HTTP_BASE_URL + "producer"

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Producer[]> {
    return this.http.get<Producer[]>(this.base + "/all");
  }

  //TODO single??


  delete(producer: Producer): Observable<any> {
    const query = "id=" + producer.id;
    return this.http.delete(this.base + "?" + query);
  }

  put(producer: Producer): Observable<any> {
    const query = "name=" + producer.name;
    return this.http.put(this.base + "?" + query, {});
  }

  post(producer: Producer): Observable<any> {
    const query = "id=" + producer.id + "&name=" + producer.name;
    return this.http.post(this.base + "?" + query, {});
  }
}

