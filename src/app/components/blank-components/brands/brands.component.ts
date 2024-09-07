import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../../shared/services/brands.service';
import { Brands } from '../../../shared/interfaces/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
private readonly _BrandsService = inject(BrandsService)
brandsList:WritableSignal<Brands[]> = signal([])

ngOnInit(): void {
  this._BrandsService.getAllBrands().subscribe({
    next: (res) => {
      this.brandsList.set(res.data)
    }
  })
}

}
