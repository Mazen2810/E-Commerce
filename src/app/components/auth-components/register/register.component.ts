import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{
  private readonly _auth = inject(AuthService)
  private readonly _formBuilder = inject(FormBuilder)
  private readonly _router = inject(Router)
registrationSub!: Subscription
  registerForm = this._formBuilder.group({
    name:[null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null, [Validators.required]],
    phone:[null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {
    validators: this.passwordConfirmation
  })
errorMsg:string = ""
isLoading:boolean = false;
  
  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading= true;
     this.registrationSub = this._auth.setRegisterForm(this.registerForm.value).subscribe(
      {
        next:(res)=>{
          if(res.message == "success"){
            this._router.navigate(['/login']);
          }

console.log(res) ;
this.isLoading= false;
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = err.error.message
          this.isLoading= false;
        }
      }
      );
      
    }
  }
  ngOnDestroy(): void {
    this.registrationSub?.unsubscribe();
  }

  passwordConfirmation(g: AbstractControl) {
    if (g.get('rePassword')?.value === g.get('password')?.value) {
      return null;
    }
    else {
      return { passwordNotMatch: true };
    }
  }

  

}
