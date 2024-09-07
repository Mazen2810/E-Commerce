import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
private readonly _AuthService = inject(AuthService)
private readonly _formBuilder = inject(FormBuilder)
private readonly _router = inject(Router)
errorMsg:string | null = null
successMsg:string | null = null
isLoading:boolean = false;
stage : number = 1;

  forgetPassword = this._formBuilder.group({
    email: [null , [Validators.required, Validators.email]]
  })

  resetCode = this._formBuilder.group({
    resetCode: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]]
  })

  resetPassword = this._formBuilder.group({
    email: [null , [Validators.required, Validators.email]],
    newPassword :[null , [Validators.required,Validators.pattern(/^\w{6,}$/)]]
  })

  forgetPasswordFunc(){
let emailValue = this.forgetPassword.get('email')?.value || null;
this.resetPassword.get('email')?.patchValue(emailValue)


    this.isLoading =true;
this._AuthService.postForgetPassword(this.forgetPassword.value).subscribe({
  next: (res) => {
    if(res.statusMsg == 'success'){
this.successMsg = res.message;
this.errorMsg = '';
this.isLoading =false;
this.stage=2;
    }
  },
  error: (err) => {
    this.errorMsg = (err.error.message);
    this.isLoading =false;
  }
})
  }

  resetCodeFunc(){
    this.isLoading =true;
    
this._AuthService.postResetCode(this.resetCode.value).subscribe({
  next: (res) => {
    if(res.status == 'Success'){
this.isLoading =false;
this.stage=3;
this.errorMsg = '';
    }},
  error: (err) => {
    this.errorMsg = (err.error.message);
    this.isLoading =false;
  }
})
  }


  resetPasswordFunc(){
    this.isLoading =true;
this._AuthService.putResetPassword(this.resetPassword.value).subscribe({
  next: (res) => {
    localStorage.setItem('token', res.token);
    this._AuthService.saveUserData();
    this._router.navigate(['/home']);

  },
  
})
  }
}
