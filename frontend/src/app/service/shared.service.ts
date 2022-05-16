import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private reloadProductsSubject = new Subject<any>();

  sendReloadProductsEvent() {
    // @ts-ignore
    return this.reloadProductsSubject.next();
  }

  getReloadProductsEvent(): Observable<any> {
    return this.reloadProductsSubject.asObservable();
  }
}
