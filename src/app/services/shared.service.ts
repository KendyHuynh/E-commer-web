import { Injectable } from '@angular/core';
import { cart } from '../data-type';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private cartDataSubject = new BehaviorSubject<cart[]>([]);
  public cartData$ = this.cartDataSubject.asObservable();

  updateCartData(data: cart[]): void {
    this.cartDataSubject.next(data);
  }
}
