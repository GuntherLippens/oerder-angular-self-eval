import {Component, Input, OnInit} from '@angular/core';
import {Customer} from '../../classes/customer-class';
import {ActivatedRoute} from '@angular/router';
import {CustomerServiceService} from '../../services/customer-service.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @Input() customer!: Customer;


  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerServiceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(): void {
    // @ts-ignore   REGULAR GET(ID) NOT WORKING WITH UUID IDs
    // const id = +this.route.snapshot.paramMap.get('id');
    // console.log(555 + id);
    // @ts-ignore
    console.log(this.route.snapshot.paramMap);
    // @ts-ignore
    const idBis = this.route.snapshot.paramMap.params.id;
    this.customerService.getCustomer(idBis.toString())
      .subscribe(customer => this.customer = customer);
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.customerService.updateCustomer(this.customer)
      .subscribe(() => this.goBack());
  }

}
