import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../models/users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {



  subscri!:Subscription
  router:Router=inject(Router);

  auth:AuthService=inject(AuthService);


  logg:any=true;



  ngOnInit(){
    this.subscri=this.auth.mySubj.subscribe((user)=>{
      this.logg=!user
    })
  }

  showLogin(){
    this.router.navigate(['login'])
  }




  logout(){
    this.auth.logout();
  }

  ngOnDestory(){
    this.subscri.unsubscribe();
  }
}
