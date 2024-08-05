import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientsComponent } from './clients/clients.component';
import { BooksComponent } from './books/books.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'clients', component: ClientsComponent,canActivate: [AuthGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'order-summary', component: OrderSummaryComponent, canActivate: [AuthGuard] },
  { path: 'view-order', component: ViewOrderComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
