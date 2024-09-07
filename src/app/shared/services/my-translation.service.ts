import { isPlatformBrowser } from '@angular/common';
import {  inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslationService {
private readonly _TranslateService = inject(TranslateService)
private readonly _PLATFORM_ID = inject(PLATFORM_ID)

constructor(){
  if(isPlatformBrowser(this._PLATFORM_ID)){
    this._TranslateService.setDefaultLang('en');
   const savedLanguage = localStorage.getItem('language');
  
   if(savedLanguage){
    this._TranslateService.use(savedLanguage)
   }
   this.changeDirection();
  }
  
}


changeDirection():void{
  if(localStorage.getItem('language')=='en'){
document.documentElement.dir='ltr';

  }
  else if (localStorage.getItem('language')=='ar'){

    document.documentElement.dir='rtl';
  }
}


changeLanguage(language:string):void{
if(isPlatformBrowser(this._PLATFORM_ID)){
localStorage.setItem('language', language)
}
this._TranslateService.use(language)
this.changeDirection();
}


  }

  

