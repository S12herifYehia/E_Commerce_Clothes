import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { error } from 'console';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor() { }
  http:HttpClient=inject(HttpClient)

  toastr:ToastrService=inject(ToastrService)

  mySubj=new BehaviorSubject<User | null>(null);

  route:Router=inject(Router)


  public errormsg:any={
    EMAIL_EXISTS:'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED:'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER:'We have blocked all requests from this device due to unusual activity. Try again later.',
    EMAIL_NOT_FOUND:'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD:'The password is invalid or the user does not have a password.',
    USER_DISABLED:"The user account has been disabled by an administrator."
  }

  SignUp(email:string,password:string){

    var Email={ email: email, password:password,returnSecureToken:true}

    // pr errormsg



    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBoT3bXsttjx39ZUVMBz2dQ19arKvFganw',Email).pipe(catchError((error)=>{



      this.handleError(error)


      throw error
    }),tap((res)=>{


      this.handleCreateUser(res);


    }))

  }



  SignIn(email:any,password:any){
    let emailData={email:email,password:password,returnSecureToken:true}


    return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoT3bXsttjx39ZUVMBz2dQ19arKvFganw',emailData).pipe(catchError((error)=>{
      this.handleError(error)
      throw error
    }),tap((res)=>{
      this.handleCreateUser(res);
    }))

  }



  handleError(error:any){
    const msgError=this.errormsg[error?.error?.error?.message]



    if(msgError){
      this.toastr.error(msgError)
    }else {

      this.toastr.error("حدث خطأ غير معروف، يرجى المحاولة لاحقًا.", 'خطأ');
    }
  }



  handleCreateUser(res:any){

    const expiresTs=new Date().getTime() + res.expiresIn * 1000

    const expiresIn=new Date(expiresTs)


    const user = new User(res.email,res.localId,res.idToken,expiresIn)

    this.mySubj.next(user)









    localStorage.setItem('User',JSON.stringify({
      email: user.email,
      id: user.id,
      _token: user.token,
      _expiresIn: expiresIn.toISOString(),
    }))


    this.autoLogout(res.expiresIn * 1000)



  }


  tokenTime:any;
  logout(){
    this.mySubj.next(null)
    localStorage.removeItem('User');
    this.route.navigate(['login']);
   if(this.tokenTime){

    clearTimeout(this.tokenTime);


   }


   this.tokenTime = null

  }

  // refreshTokenThreshold = 30 * 60 * 1000;

  autoLogin(){
    let user=JSON.parse(localStorage.getItem('User')!)

    if(!user){
      return ;
    }




    // if(loguser.token){
      const currentTime=new Date().getTime();
      const expiresInDate=new Date(user._expiresIn).getTime();
      const timerval=expiresInDate - currentTime

      if(timerval <= 0 ){
        this.logout();
      }else{
        let loguser=new User(user.email,user.id,user._token,new Date(user._expiresIn))
        this.mySubj.next(loguser)
        this.autoLogout(timerval)
      }




  }






  // Onlogout(){


  // }







  autoLogout(expiresTime:any){


   this.tokenTime= setTimeout(()=>{

      this.logout();
    },expiresTime)

  }
}
