import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { category, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css'],
})
export class SellerUpdateProductComponent implements OnInit {
  productData: product | undefined;
  productCategories: category[] | undefined; 
  productMessage: string | undefined;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService, 
    private router: Router
    ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    
    if (productId) {
      this.productService.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;
      });
    }

    this.categoryService.getCategoryList().subscribe((categories) => {
      this.productCategories = categories;
    });
  }

  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has been updated';
        setTimeout(() => {
          this.productMessage = undefined;
        }, 3000);
        this.router.navigate(['/seller-home']); // Chuyển hướng đến trang danh sách sản phẩm
      }
    });

    console.warn(data);
  }
  
}
