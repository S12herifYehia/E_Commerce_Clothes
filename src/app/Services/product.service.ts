import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { catchError, map } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http: HttpClient = inject(HttpClient);

  toastr: ToastrService = inject(ToastrService);
  constructor() {}

  apiUrl = environment.baseApi;

  CreateProduct(val: any) {
    console.log(val);
    return this.http.post(this.apiUrl + '.json', val).pipe(catchError((error)=>{

      this.toastr.error(error.message, 'خطأ');
      throw error
    })
    );
  }

  getAllProduct() {
    return this.http.get(this.apiUrl + '.json').pipe(
      map((res: any) => {
        let product = [];

        for (var key in res) {
          product.push({ ...res[key], id: key });
        }

        return product;
      // })
      }),
      // catchError((error) => {
      //   this.toastr.error(error.message, 'خطأ');
      //   throw error;
      // })
    );
  }

  clearAllData() {
    return this.http.delete(this.apiUrl + '.json').pipe(catchError((error)=>{
      this.toastr.error(error.message, 'خطأ');
      throw error
    }))
  }

  deleteProduct(id: any) {
    return this.http
      .delete(environment.baseApi + '/' + id + '.json').pipe(catchError((error)=>{
        this.toastr.error(error.message, 'خطأ');
        throw error
      }))

  }

  editProduct(id: any, data: any) {
    return this.http
      .put(this.apiUrl + '/' + id + '.json', data)
      .pipe(catchError((error)=>{
        this.toastr.error(error.message, 'خطأ');
        throw error
      }))
  }

  detailsProduct(id: any) {
    return this.http.get(this.apiUrl + '/' + id + '.json').pipe(catchError((error)=>{

      this.toastr.error(error.message, 'خطأ');
      throw error
    }))
  }
}
