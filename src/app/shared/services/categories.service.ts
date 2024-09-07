import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

 private readonly _HttpClient = inject(HttpClient)


 getAllCategories():Observable<any> {
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
 }
 getSpecificCategory(id:string | null): Observable<any>{
 return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`)
 }
}
