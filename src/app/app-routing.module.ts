import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.module').then((m) => m.AboutModule),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./pages/contact/contact.module').then((m) => m.ContactModule),
  },

  {path:'login',loadChildren:()=>import('./pages/login/login.module').then((m)=>m.LoginModule)},

  {path:'cart',loadChildren:()=>import('./pages/cart/cart.module').then((m)=>m.CartModule)},
  {path:'dashboard',loadChildren:()=>import('./pages/dashboard/dashboard.module').then((m)=>m.DashboardModule)},


  {
    path: 'not_found',
    loadChildren: () =>
      import('./pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  { path: '**', redirectTo: 'not_found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
