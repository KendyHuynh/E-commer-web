import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { category, product } from '../data-type';
import { CategoryService } from '../services/category.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    productList: undefined | product[];
    listCategories: category[] | undefined; 
    icon = faTrash;
    iconEdit = faEdit;
  
    currentPage = 1;
    itemsPerPage = 8;
    totalProducts = 0;
  
    constructor(private product: ProductService,private categoryService: CategoryService) {}
  
    ngOnInit(): void {
      this.product.productList().subscribe((result) => {  
        console.warn(result)
        this.productList=result;
    });
    this.categoryService.getCategoryList().subscribe((categories) => {
      this.listCategories = categories;
    });  
    this.fetchProducts();
    }
    getPages(): number[] {
      const totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    
    fetchProducts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
  
      this.product.productList().subscribe((result) => {
        if (result) {
          this.productList = result.slice(startIndex, endIndex);
          this.totalProducts = result.length; // Lưu tổng số lượng sản phẩm
        }
      });
    }
    onPageChange(newPage: number) {
      this.currentPage = newPage;
      this.fetchProducts();
    }
  }
  
