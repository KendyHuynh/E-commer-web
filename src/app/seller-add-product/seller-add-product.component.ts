import { Component, OnInit } from '@angular/core';
import { category, product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css'],
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  productCategories: category[] | undefined;
  productData: product | undefined;

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private router: Router) {}

  ngOnInit(): void {
    // Lấy danh sách các danh mục sản phẩm
    this.categoryService.getCategoryList().subscribe((categories) => {
      this.productCategories = categories;
    });
  }

  submit(data: product) {
    this.productService.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
        setTimeout(() => {
          this.addProductMessage = undefined;
          this.router.navigate(['/seller-home']); // Chuyển hướng đến trang danh sách sản phẩm
        }, 3000);
      }
    });
  }
}
