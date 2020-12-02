import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Item} from '../classes/item-class';
import {ItemServiceService} from '../services/item-service.service';
import {ItemListComponent} from '../item-list/item-list.component';

@Component({
  selector: 'app-save-item',
  templateUrl: './save-item.component.html',
  styleUrls: ['./save-item.component.css']
})
export class SaveItemComponent implements OnInit {
  item!: Item;

  add(name: string, description: string, priceString: string, amountOfStockString: string): void {
    name = name.trim();
    const price: number = Number(priceString);
    const amountOfStock: number = Number(amountOfStockString);
    if (!name) { return; }
    this.itemService.addItem({name, description, price, amountOfStock} as Item)
      .subscribe();
  }
  constructor(private itemService: ItemServiceService) { }

  ngOnInit(): void {

  }

}
