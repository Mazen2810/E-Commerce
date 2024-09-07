import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../../shared/services/cart.service';
import { AuthService } from './../../../shared/services/auth.service';
import { MyTranslationService } from './../../../shared/services/my-translation.service';


@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterLinkActive, RouterLink,TranslateModule],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss'
})
export class NavbarBlankComponent implements OnInit{
  private readonly _MyTranslationService= inject(MyTranslationService)
  private readonly _CartService= inject(CartService)


  readonly _Auth= inject(AuthService)
   isDropdownOpen:boolean = false;
   language:string = localStorage.getItem('language')!;
   counterNumber:Signal<number> = computed(()=> this._CartService.counterNum())
 
   ngOnInit(): void {
    
    

     
   }
changeLanguage(language:string) {
this._MyTranslationService.changeLanguage(language)
}
toggleDropdown(): void {
  this.isDropdownOpen = !this.isDropdownOpen;
}
closeDropdown(): void {
  this.isDropdownOpen = false;
}
}
