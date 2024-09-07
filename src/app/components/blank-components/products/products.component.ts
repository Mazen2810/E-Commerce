import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, NgModule, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IProduct } from '../../../shared/interfaces/iproducts';
import { ProductsService } from '../../../shared/services/products.service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [TranslateModule,CurrencyPipe,FormsModule , SearchPipe,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
private readonly _ProductsService = inject(ProductsService)
private readonly _WishlistService = inject(WishlistService)
private readonly _CartService = inject(CartService)
private readonly _ToastrService = inject(ToastrService)


idChanged : Signal<string[]> = computed(()=> this._WishlistService.idData())

productList :WritableSignal<IProduct[]> = signal([])
searchedText:WritableSignal<string>= signal('')


ngOnInit(): void {
  this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res)
this.productList.set(res.data) 
console.log(this.productList)
    },
    
  })

  if(localStorage.getItem('idList')!==null){
    this._WishlistService.idData.set(localStorage.getItem('idList')!.split(","))
  
  }

  this._CartService.getIntoCart().subscribe({
    next:(res)=>{
      this._CartService.counterNum.set(res.numOfCartItems)
    }
  })
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
