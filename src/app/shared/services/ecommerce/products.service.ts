import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Products } from '../../modal/products.modal';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  listData: Products[] | undefined;
  
  constructor(private http : HttpClient) { }

  products() : Observable<any> {
    return this.http.get('assets/json/products.json').pipe(
      map((res) => {
        return res;
      })
    )
  }

  public getProduct(id : number): Observable<Products> {
    return this.products().pipe(
      map((items) => {
        return items.find((item : Products) => {
          return item.id === id
        })
      })
    )
  }
}
