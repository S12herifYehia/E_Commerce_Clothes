import { Injectable, ViewChild, viewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandleServicesService {
  private errorSubject = new BehaviorSubject<any>(null);
  error$ = this.errorSubject.asObservable();

  constructor(private toastr: ToastrService) {}

  handleError(error: any) {
    if (error.status === 0) {
      this.errorSubject.next({
        message: 'يجب التحقق من الانترنت',
        type: 'error',
      });
    }

    if (error.status == 500) {
      this.errorSubject.next({
        message: 'هناك مشكلة في الخادم. الرجاء المحاولة لاحقًا.',
        type: 'error',
      });
    }

    if (error.status == 400) {
      this.errorSubject.next({
        message: 'طلب غير صالح. يرجى التحقق من البيانات المدخلة.',
        type: 'error',
      });
    }

    if (error.status === 401) {
     this.errorSubject.next({message:'لا يمكنك الوصول إلى هذه الصفحة. يرجى تسجيل الدخول أولاً.',type:'error'})
    }

    if (error.status == 403) {
      this.errorSubject.next({
        message: 'أنت لا تملك الإذن للوصول إلى هذه الصفحة.',
        type: 'error',
      });
    }
    if (error.status == 404) {
      this.errorSubject.next({
        message: 'المورد الذي طلبته غير موجود.',
        type: 'error',
      });
    }
    if (!error.status) {
      this.errorSubject.next({
        message: 'حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.',
        type: 'error',
      });
    }
  }
}
