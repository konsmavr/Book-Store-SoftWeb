import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientsComponent } from './clients/clients.component';
import { BooksComponent } from './books/books.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ViewOrderComponent } from './view-order/view-order.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: 'view-order', component: ViewOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
