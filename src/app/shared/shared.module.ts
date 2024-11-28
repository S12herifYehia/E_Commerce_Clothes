import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { ScrollBarComponent } from './scroll-bar/scroll-bar.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ScrollBarComponent,

  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    ScrollBarComponent,

  ],
})
export class SharedModule {}
