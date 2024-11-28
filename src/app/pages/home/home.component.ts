import { ProductService } from './../../Services/product.service';
import { Component, inject, ViewChild } from '@angular/core';

import { Swiper } from 'swiper';

import { register } from 'swiper/element/bundle';
import { AuthService } from '../../Services/auth.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

register();
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

ProductService:ProductService=inject(ProductService)



allProduct:any=[];


// productid:any;
getProduct1=[];

@ViewChild('DashboardComponent') dashboard!:DashboardComponent


ngOnInit(){
  this.getAllData();
  // this.deleteData();
}

  getAllData(){



    this.ProductService.getAllHome().subscribe((data)=>{
      console.log(data);

      this.allProduct=data

    })
  }


  // deleteData(){
  //   // this.ProductService.deleteProduct(this.allProduct['id']).subscribe((data)=>{
  //   //  console.log("تم حذف الداتا ")
  //   // //  this.allProduct=data
  //   // this.getAllData();


  //   // })
  // }





  // ngOnAfterViewInit(){
  //   // console.log(this.dashboard.editProduct)
  //   // console.log(this.dashboard.subobs);

  //   this.dashboard.subobs.s
  // }






}
