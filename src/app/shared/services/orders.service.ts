import { IshippingAddress } from './../interfaces/ishipping-address';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient : HttpClient ) { }

  
  cashPayment(id:string | null, shippingAddress:any) : Observable<any>{
return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${id}` ,
{
  "shippingAddress" : shippingAddress
},
  
)
  }

  creditCardPayment(id:string | null, shippingAddress:any) : Observable<any>{

    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}${environment.host}` ,
      {
        "shippingAddress" : shippingAddress
      },
        
      )
  }

  getUserOrders(id:string ) : Observable<any>{

    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}` )
    
    }
  }