import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order, orderItem } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;
  
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadCartDetails();
  }

  loadCartDetails(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result || [];
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
      });
      this.totalPrice = price + (price / 10) + 100 - (price / 10);
    });
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice && this.cartData) {
      let orderData: order = {
        ...data,
        status: 'In Progress',
        totalPrice: this.totalPrice,
        userId, 
        id: 0, // Replace with a valid order id
        items: this.cartData.map((item) => {
          const orderItem: orderItem = {
            name: item.name,
            price: item.price,
            quantity: item.quantity || 0,
            image: item.image
          };
          return orderItem;
        })
      };

     
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 700)
      })
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders'])
          }, 4000
          );
        }
      });
    }
  }
}
