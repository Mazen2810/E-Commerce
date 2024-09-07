import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _auth = inject(AuthService)
  private readonly _formBuilder = inject(FormBuilder)
  private readonly _router = inject(Router)
  

  loginForm = this._formBuilder.group({

    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],

  },)
  errorMsg: string = ""
  isLoading: boolean = false;

  loginSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._auth.setLoginForm(this.loginForm.value).subscribe(
        {
          next: (res) => {
            if (res.message == "success") {
              localStorage.setItem("token", res.token);
              this._auth.saveUserData();
              this._router.navigate(['/home']);
            }

            this.isLoading = false;
          },
          error: (err) => {
            
            console.error(err);
            this.errorMsg = err.error.message
            this.isLoading = false;
          }
        }
      );

    }
  }

}
