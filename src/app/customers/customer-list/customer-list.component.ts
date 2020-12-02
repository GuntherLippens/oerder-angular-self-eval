import { Component, OnInit } from '@angular/core';
import { Customer } from '../../classes/customer-class';
import { CustomerServiceService } from '../../services/customer-service.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers!: Customer[];
  constructor(
    private customerService: CustomerServiceService
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers()
      .subscribe((customers: Customer[]) => this.customers = customers);
  }
  add(name: string, description: string, priceString: string, amountOfStockString: string): void {
    name = name.trim();
    const price: number = Number(priceString);
    const amountOfStock: number = Number(amountOfStockString);
    if (!name) { return; }
    // @ts-ignore
    this.customerService.addCustomer({firstname, lastname} as Customer)
      .subscribe(customer => {
        this.customers.push(customer);
      });
  }
  delete(customer: Customer): void {
    this.customers = this.customers.filter(i => i !== customer);
    this.customerService.deleteCustomer(customer).subscribe();
  }

}
