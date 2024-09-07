import {  Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../shared/interfaces/iproducts';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule, NgFor],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  specificProduct: IProduct | null = null;
  productImgs: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    freeDrag:true,
    dots: false,
    center:true,
    navSpeed: 700,
    navText: [``,``],
    items:1,
    nav: true
  }

 ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:((p)=>{
let idProduct = p.get('id')
this._ProductsService.getSpecificProduct(idProduct).subscribe({
  next:((res)=>{
    this.specificProduct = res.data
    console.log(this.specificProduct)
  }),
  
})
    }),
 })
}



addToCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._CartService.counterNum.set(res.numOfCartItems)
      this._ToastrService.success(res.message , "Cart added");
    }
  })
  }



}