import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  orderItems: any[] = [];
  totalPrice: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getOrder().subscribe(data => {
      this.orderItems = data.items;
      this.totalPrice = data.totalPrice;
    });
  }
}
