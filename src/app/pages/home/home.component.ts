import { ProductService } from './../../Services/product.service';
import { Component, inject } from '@angular/core';

import { Swiper } from 'swiper';

import { register } from 'swiper/element/bundle';
import { AuthService } from '../../Services/auth.service';

register();
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {




}
