import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] = []; // Khởi tạo mảng cartData rỗng để tránh lỗi trong *ngFor
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  };

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  removeToCart(cartId: number | undefined) {
    if (cartId && this.cartData) {
      this.product.removeToCart(cartId).subscribe((result) => {
        this.loadDetails();
      });
    }
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);

      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;

      if (!this.cartData.length) {
        this.router.navigate(['/']); // Chuyển về trang chủ nếu giỏ hàng rỗng
      }
    });
  }

  checkout() {
    // Truyền dữ liệu giỏ hàng sang trang CheckoutComponent
    this.router.navigate(['/checkout'], { state: { cartData: this.cartData, priceSummary: this.priceSummary } });
  }
}
