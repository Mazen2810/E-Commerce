import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { Icart } from '../../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
private readonly _CartService = inject(CartService)
private readonly _ToastrService = inject(ToastrService)
cartData : Icart | null = null
ngOnInit(): void {
  

 this._CartService.getIntoCart().subscribe({
  next:(res)=>{
   this.cartData = res.data
   this._CartService.counterNum.set(res.numOfCartItems)
   localStorage.setItem('cartNum' , this._CartService.counterNum().toString() )
    console.log(res)
  },
  
 })
}
updateProductNumber(id: string, count: number){
  if(count >= 1){
    this._CartService.updateProductQuantity(id,count).subscribe({
      next:(res)=>{
    console.log(res);
   
    this.cartData = res.data;
    this._ToastrService.success('Cart has been updated successfully', 'Success')
      }
    })
  }

}

removeSpecificProduct(id:string):void{
  Swal.fire({
    title: 'Warning!',
    text: 'The Product will be removed from your Cart, Do you want to continue',
    icon: 'warning',
    iconColor: 'green',
    color : 'green',
    showDenyButton:true,
    confirmButtonText: 'Continue',
    denyButtonText: 'Cancel'
  } ).then((res)=>{
    if(res.isConfirmed){
      this._CartService.removeSpecificProduct(id).subscribe({
        next:(res)=>{
          this._CartService.counterNum.set(res.numOfCartItems)
        console.log(res);
        this.cartData = res.data;
        }
      })
    }
  })
}


removeAllProducts(){
  if(this.cartData?.totalCartPrice !== 0){
    Swal.fire({
      title: 'Warning!',
      text: 'All Products will be removed from your Cart, Do you want to continue',
      icon: 'warning',
      iconColor: 'green',
      color : 'green',
      showDenyButton:true,
      confirmButtonText: 'Continue',
      denyButtonText: 'Cancel'
    } ).then((res)=>{
      if(res.isConfirmed){
        this._CartService.clearAllProducts().subscribe({
          next:(res)=>{
          console.log(res);
          this._CartService.counterNum.set(0)
          this.ngOnInit();
          }
        })
      }})}
  }
 

  }



