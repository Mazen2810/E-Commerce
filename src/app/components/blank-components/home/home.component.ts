
import { Component,  computed,  inject, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { IProduct } from '../../../shared/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ICategory } from '../../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { register } from 'swiper/element/bundle';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../../shared/services/wishlist.service';

register();
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink , SearchPipe, FormsModule, CurrencyPipe, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy {
private readonly _Products = inject(ProductsService)
private readonly _CategoriesService = inject(CategoriesService)
private readonly _CartService = inject(CartService)
private readonly _WishlistService = inject(WishlistService)
private readonly _ToastrService = inject(ToastrService)

productList :WritableSignal<IProduct[]> = signal([])
categoriesList : WritableSignal<ICategory[]> = signal([])
isClicked:WritableSignal<boolean>= signal(false)
 idChanged : Signal<string[]> = computed(()=> this._WishlistService.idData())
getAllProductSub?: Subscription ;
searchedText:WritableSignal<string>= signal('')

categoriesSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  rtl:true,
  touchDrag: true,
  pullDrag: false,
  autoplay:true,
  autoplayTimeout: 2000,
  autoplayHoverPause:true,
  freeDrag:true,
  dots: false,
  margin:20,
  navSpeed: 700,
  navText: [`<i class="fa-regular fa-hand-point-left text-xl rating-color"></i>`,
    
    
    
    `<i class="fa-regular fa-hand-point-right text-xl rating-color"></i>`],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 5
    }
  },
  nav: true
}

staticSlider: OwlOptions = {
  loop: true,
  rtl:true,
  mouseDrag: true,
  autoplay:true,
  autoplayTimeout: 2000,
  autoplayHoverPause:true,
  touchDrag: true,
  pullDrag: false,
  freeDrag:true,
  dots: false,
  margin:20,
  navSpeed: 700,
  navText: [``,``],
  items:1,
  nav: true
}

ngOnInit(): void {
  if(localStorage.getItem('idList')!==null){
    this._WishlistService.idData.set(localStorage.getItem('idList')!.split(","))
  
  }
 

this._CartService.getIntoCart().subscribe({
  next:(res)=>{
    this._CartService.counterNum.set(res.numOfCartItems)
  }
})

  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      this.categoriesList.set( res.data) 
      console.log(this.categoriesList)
    },
    
  })
  this.getAllProductSub = this._Products.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res)
this.productList.set(res.data) 
console.log(this.productList)
    },
    
  })




}


ngOnDestroy(): void {
  this.getAllProductSub?.unsubscribe()
}

addToCart(id:string):void{
this._CartService.addProductToCart(id).subscribe({
  next:(res)=>{
    console.log(res);
    this._CartService.counterNum.set(res.numOfCartItems)
    this._ToastrService.success(res.message , "Cart added");
  }, 
})
}

addToWishlist(id:string):void{
this._WishlistService.addToWishlist(id).subscribe({
  next:(res)=>{
    console.log(res);
    this._WishlistService.idData.set(res.data)
    localStorage.setItem('idList', this._WishlistService.idData().toString())
    this._ToastrService.success(res.message , "Added to wishlist");
  
   
  } 
})
}

removeFromWishlist(id:string){
  this._WishlistService.removeFromWishlist(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._WishlistService.idData.set(res.data)
      localStorage.setItem('idList', this._WishlistService.idData().toString())
      this._ToastrService.success(res.message , "Removed From wishlist");
    
     
    } 
  })
}

}
