import { Component, OnInit } from '@angular/core';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  cartData: cart[] | undefined;
  orderData:order[]|undefined
 
  constructor(private product: ProductService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getOrderList();
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }
}
