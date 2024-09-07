import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { Wishlist } from '../../../shared/interfaces/wishlist';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [TranslateModule, CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {


  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)
  wishlist: WritableSignal<Wishlist[]> = signal([])
  productsNum: WritableSignal<number> = signal(0)
  removeChanged: Signal<string[]> = computed(() => this._WishlistService.idData())

  ngOnInit(): void {

    this.allWishlist()

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
  allWishlist() {
    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlist.set(res.data)
        console.log(res)
        this.productsNum.set(res.count)
      }
    })
  }
  removeFromWishlist(id: string) {
    this._WishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        this._WishlistService.idData.set(res.data)
        localStorage.setItem('idList', this._WishlistService.idData().toString())

        this._ToastrService.success(res.message, "Removed From wishlist");

        this.allWishlist()
      }
    })
  }


}
