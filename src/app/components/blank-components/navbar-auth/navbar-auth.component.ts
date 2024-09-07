import { Component, inject } from '@angular/core';
import {  RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslationService } from '../../../shared/services/my-translation.service';


@Component({
  selector: 'app-navbar-auth',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, TranslateModule],
  templateUrl: './navbar-auth.component.html',
  styleUrl: './navbar-auth.component.scss'
})
export class NavbarAuthComponent {
  private readonly _MyTranslationService= inject(MyTranslationService)

  isDropdownOpen:boolean = false;
   language:string = localStorage.getItem('language')!;
   isMenuOpen = false; 
   
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
