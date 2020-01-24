import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './products/register/register.component';
import { ListComponent } from './products/list/list.component';

const routes: Routes = [
  {path: 'register-products', component: RegisterComponent },
  {path: 'products-list', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
