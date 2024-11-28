import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../models/product';
import { ErrorHandleServicesService } from '../../Services/error-handle-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  productServices: ProductService = inject(ProductService);
  isMenu = false;
  ShowCreateProduct = false;
  showSpinner=false
  products: Product[] = [];
  detailsData:any;
  showDetails=false;

  currentId:any;

  selectData:any;


  isEditmode=true

  showCreate() {

    this.ShowCreateProduct = true;
    this.isMenu = true;
    this.isEditmode=true
  }

  closeCreateProduct(value: any) {
    this.ShowCreateProduct = value;
    this.isEditmode=false

    // this.selectData=[]

    this.selectData = {};

  }



// Error


errorhandle:ErrorHandleServicesService=inject(ErrorHandleServicesService)

toastr:ToastrService=inject(ToastrService)
  ngOnInit() {
    this.getAllData();

this.errorhandle.error$.subscribe(error => {
  if (error && error.type === 'error') {
    this.toastr.error(error.message, 'خطأ');
    this.showSpinner = false;
  }
});

  }



  getAllData() {
    this.showSpinner=true
    this.productServices.getAllProduct().subscribe((data) => {
      this.products = data;
      this.showSpinner=false
    });
  }

  selectedFile: any;

  onSubmit(productData: any) {
    this.showSpinner=true




    if(this.isEditmode){
      this.productServices.CreateProduct(productData).subscribe((data: any) => {
        console.log(data);
        this.showSpinner=false
        this.getAllData();
      });


    }else{

      this.productServices.editProduct(this.currentId,productData).subscribe((data)=>{

        this.showSpinner=false
        this.getAllData()
      })
    }

  }



  clearAllData(){
    this.showSpinner=true;

    this.productServices.clearAllData().subscribe((data)=>{
      this.showSpinner=false
      this.getAllData();
    })
  }


  deleteProduct(id:any){
    this.showSpinner=true;



    this.productServices.deleteProduct(id).subscribe((data)=>{
      this.showSpinner=false
      this.getAllData()
    })
  }




  editProduct(id:any){
    this.selectData=this.products.find(x=>x.id == id)
    this.showCreate()
    this.isEditmode=false

    this.currentId=id

  }



  showProductDetails(id:any){
    this.showDetails=true;
    this.productServices.detailsProduct(id).subscribe((data)=>{
      this.detailsData=data
    })

  }

  closeProductDetails(){
    this.showDetails=false
  }

}
