import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { category } from '../data-type'; // Đảm bảo import kiểu dữ liệu từ tệp data-type

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategoryList(): Observable<category[]> {
    return this.http.get<category[]>(' http://localhost:3000/category');
  }
}
