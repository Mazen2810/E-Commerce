import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../../shared/services/categories.service';
import { ICategory } from '../../../shared/interfaces/icategory';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {
private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly _CategoriesService = inject(CategoriesService)

specificCategory:ICategory | null = null ;

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (p)=>{
let categoryID = p.get('id');
      this._CategoriesService.getSpecificCategory(categoryID).subscribe({
        next: (res) => {
          this.specificCategory = res.data
        }
      })
    }
  })
  
}
}
