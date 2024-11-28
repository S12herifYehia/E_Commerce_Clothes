import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';
import { read } from 'fs';



export const dashboardGuard: CanActivateFn = (route, state) => {
  const user=inject(AuthService);


  const router=inject(Router)


  return user.mySubj.pipe(take(1),map((user)=>{
    const loggin= user ? true : false;
    // return
    if(loggin){
      return true;
    }else{
      return router.createUrlTree(['login'])
    }
  }))
  // return ;
};
