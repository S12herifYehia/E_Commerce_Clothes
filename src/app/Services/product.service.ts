import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { catchError, forkJoin, map } from 'rxjs';

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
    return forkJoin([
      this.http.post('https://producthome-f6fa5-default-rtdb.firebaseio.com/productHome'+'.json',val),
      this.http.post(this.apiUrl + '.json', val)
    ]).pipe(catchError((error)=>{

      this.toastr.error(error.message, 'خطأ');
      throw error
    }))
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
    return forkJoin([
      this.http.delete(this.apiUrl + '.json'),
      this.http.delete("https://producthome-f6fa5-default-rtdb.firebaseio.com/productHome"+'.json')
    ]).pipe(catchError((error)=>{
      this.toastr.error(error.message, 'خطأ');
      throw error
    }))
  }

  deleteProduct(id: any) {
    return forkJoin([
      this.http.delete(environment.baseApi + '/' + id + '.json'),
      this.http.delete("https://producthome-f6fa5-default-rtdb.firebaseio.com/productHome/" + id + '.json' )
    ]).pipe(catchError((error)=>{
        this.toastr.error(error.message, 'خطأ');
        throw error
      }))

  }

  editProduct(id: any, data: any) {
    return forkJoin([
      this.http.put(this.apiUrl + '/' + id + '.json', data),
      this.http.put("https://producthome-f6fa5-default-rtdb.firebaseio.com/productHome/" + id + '.json',data)
    ]).pipe(catchError((error)=>{
        this.toastr.error(error.message, 'خطأ');
        throw error
      }))
  }

  detailsProduct(id: any) {
    return forkJoin([
      this.http.get(this.apiUrl + '/' + id + '.json'),
      this.http.get('https://producthome-f6fa5-default-rtdb.firebaseio.com/productHome/' + '/'+id+'.json')
    ])


    .pipe(catchError((error)=>{

      this.toastr.error(error.message, 'خطأ');
      throw error
    }))
  }






  getAllHome(){

    return this.http.get('https://producthome-f6fa5-default-rtdb.firebaseio.com/productHome'+'.json').pipe(map((res:any)=>{

      var productHome:any=[];

      for(let key in res){
        if(res.hasOwnProperty(key)){
          productHome.push({...res[key],id:key})
        }

      }


      return productHome;



    }),catchError((error)=>{


      this.toastr.error(error.message, 'خطأ');

      throw error
    }))
  }
}
