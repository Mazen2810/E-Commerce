import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder,  ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../shared/services/orders.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, RouterLink,TranslateModule ],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit{

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _OrdersService = inject(OrdersService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _router = inject(Router)
  cartId :string | null = ''
  successMsg :string= ''
  failMsg :string= ''
  isLoadingCash : boolean = false;
  isLoadingCredit : boolean = false;

  shippingAddress = this._FormBuilder.group({
    details:[null,[Validators.required]],
    phone:[null,[Validators.required]],
    city:[null,[Validators.required]]
  })

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
      this.cartId = params.get('id')
    }
  })
}
  cashCheckOut( id:string | null, shippingAddress:any){
    this.isLoadingCash= true;
this._OrdersService.cashPayment(this.cartId , this.shippingAddress.value).subscribe({
  next:(res)=>{ 
      this._router.navigate(['/allorders'])
      this._ToastrService.success('Order will be shipping to you soon ', 'Success')
    
    console.log(res);
    this.isLoadingCash= false;
  }, 
})
  }

  creditCheckOut(id:string | null, shippingAddress:any){
    this.isLoadingCredit= true;
    this._OrdersService.creditCardPayment(id,shippingAddress).subscribe({
      next:(res)=>{
        console.log(res);
        window.open(res.session.url , '_self')
        this.isLoadingCredit= false;
      },
      
    })
 

  }
}
