import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { OrdersService } from '../../shared/services/orders.service';
import { Allproducts } from '../../shared/interfaces/allproducts';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe,RouterLink, TranslateModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
private readonly _AuthService = inject(AuthService)
private readonly _OrdersService = inject(OrdersService)
lastOrder :Allproducts | null = null;
ngOnInit(): void {
  this._AuthService.saveUserData()
  this._OrdersService.getUserOrders(this._AuthService.userData.id).subscribe({
    next: (res) => {
      this.lastOrder = res[res.length - 1]
      console.log(this.lastOrder)
      
    },
    
  }
  )
}
}
