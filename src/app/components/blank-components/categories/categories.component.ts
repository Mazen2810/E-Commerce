import { ICategory } from '../../../shared/interfaces/icategory';
import { CategoriesService } from './../../../shared/services/categories.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
private readonly _CategoriesService = inject(CategoriesService)
categoryList:WritableSignal<ICategory[]> = signal([])



ngOnInit(): void {
  this._CategoriesService.getAllCategories().subscribe({
    next: (res) => {
      this.categoryList.set(res.data)
      console.log(res)
    }
    
  })
}
}
