import { UserData } from './../interfaces/user-data';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

userData!:UserData;
 private readonly _auth = inject(HttpClient)
 private readonly _Router = inject(Router)


 setRegisterForm(data:object):Observable<any>
 {
 return this._auth.post(`${environment.baseUrl}/api/v1/auth/signup`, data );
 }
 setLoginForm(data:object):Observable<any>
 {
 return this._auth.post(`${environment.baseUrl}/api/v1/auth/signin`, data );
 }

saveUserData():void{

  if(localStorage.getItem('token') !== null){
    this.userData = jwtDecode(localStorage.getItem('token') !) 
    console.log(this.userData)
   
   
  }

}

signOut():void{
localStorage.removeItem('token')
this.userData = {
  id:'',
  name:'',
  role:'',
  iat:0,
  exp:0
}

  this._Router.navigate(['/login']);
}

postForgetPassword(data:object):Observable<any>{
  return this._auth.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
}

postResetCode(data:object):Observable<any>{
  return this._auth.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
}

putResetPassword(data:object):Observable<any>{
  return this._auth.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
}
}
