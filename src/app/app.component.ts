import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID, SimpleChange } from '@angular/core';
import SimpleBar from 'simplebar';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard';


  auth:AuthService=inject(AuthService)


  ngOnInit(){
    this.auth.autoLogin();
  }

}
