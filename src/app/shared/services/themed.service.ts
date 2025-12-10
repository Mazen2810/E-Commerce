import { inject, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemedService {

  constructor() { }
private readonly _Renderer2 = inject(Renderer2)


  

  themeCheck(){
   const html = document.querySelector('html')!;
   const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || (localStorage.getItem('hs_theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
   const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || (localStorage.getItem('hs_theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
 
    if (isLightOrAuto && this.rendererHasClass(html, 'dark')) {
      this._Renderer2.removeClass(html, 'dark');
    } else if (isDarkOrAuto && this.rendererHasClass(html, 'light')) {
      this._Renderer2.removeClass(html, 'light');
    } else if (isDarkOrAuto && !this.rendererHasClass(html, 'dark')) {
      this._Renderer2.addClass(html, 'dark');
    } else if (isLightOrAuto && !this.rendererHasClass(html, 'light')) {
      this._Renderer2.addClass(html, 'light');
    }
  }
  private rendererHasClass(element: HTMLElement, className: string): boolean {
    return element.classList.contains(className);
  }
}
