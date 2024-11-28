import { tap } from 'rxjs';
// // import { HttpInterceptorFn } from '@angular/common/http';

// // export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
// //   return next(req);
// // };


import { Injectable } from '@angular/core';

import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpErrorResponse,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

import { exhaustMap, take } from 'rxjs/operators';
import { ErrorHandleServicesService } from './error-handle-services.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private httpError:ErrorHandleServicesService,private auth:AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {








  // return  this.auth.mySubj.pipe(take(1),e(user:=>{
  //     if(!user){
  //       return next.handle(req)
  //     }
  // }))


  // return this.auth.mySubj.pipe(take(1),exhaustMap((user)=>{

  // }))\a



  return this.auth.mySubj.pipe(take(1),exhaustMap((user)=>{
         if(!user || !user.token){
        return next.handle(req)
      }


      const modify=req.clone({params:req.params.set('auth',user.token)})

      return next.handle(modify).pipe(tap((event)=>{

        if(event.type === HttpEventType.Response){
          console.log(event.body)
        }

      }),catchError((error:HttpErrorResponse)=>{
        this.httpError.handleError(error)
        throw error
      }));
  }))



    // return next.handle(req)
  }
}
