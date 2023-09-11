import { Component, OnInit } from '@angular/core';
import { category, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 popularProducts:undefined|product[];
 trendyProducts:undefined | product[];
 listCategories: category[] | undefined; 
  constructor(private product:ProductService,private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
    this.categoryService.getCategoryList().subscribe((categories) => {
      this.listCategories = categories;
    });
  }
  
}

