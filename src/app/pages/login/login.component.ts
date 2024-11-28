import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  auth:AuthService=inject(AuthService)
  router:Router=inject(Router)
  toastr:ToastrService=inject(ToastrService)


  onSignUp(f:any){
    var email=f.value.email;
    var password=f.value.password


    if(f.valid){
      this.auth.SignUp(email,password).subscribe((data)=>{

        console.log(data)

        this.toastr.success('تم انشاء مستخدم جديد','تمت');

        this.router.navigate(['dashboard'])

      })

      f.reset();
    }
  }



  SignIn(f:any){
    var email_login=f.value.email;
    var password_login=f.value.password;

    if(f.valid){


       this.auth.SignIn(email_login,password_login).subscribe((data)=>{
        this.toastr.success('تم تسجيل الدخول بنجاح','تمت')


        this.router.navigate(['dashboard'])
      })


      f.reset()
    }

  }


  



}
