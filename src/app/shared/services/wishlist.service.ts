import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
 private readonly _HttpClient = inject(HttpClient)
 idData:WritableSignal<string[]> = signal([''])

 addToWishlist(prodID:string):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`,
    {
      "productId": prodID
    }
  )
 }
 removeFromWishlist(prodID:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${prodID}`)
 }
 getWishlist():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
 }

}
