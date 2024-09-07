import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  constructor(private _HttpClient: HttpClient) { }
  counterNum:WritableSignal<number> = signal(0)

  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      "productId": id,
    },
      
    )
  }

  updateProductQuantity(id: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      "count": count
    },
      
    )
  }

  getIntoCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
      
    )
  }
  removeSpecificProduct(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      
    )
  }
  clearAllProducts(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
     
    )
  }
}
