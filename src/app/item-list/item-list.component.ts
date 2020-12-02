import { Component, OnInit } from '@angular/core';
import { Item } from '../classes/item-class';
import { ItemServiceService } from '../services/item-service.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items!: Item[];
  constructor(private itemService: ItemServiceService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe((items: Item[]) => this.items = items);
  }
  add(name: string, description: string, priceString: string, amountOfStockString: string): void {
    name = name.trim();
    const price: number = Number(priceString);
    const amountOfStock: number = Number(amountOfStockString);
    if (!name) { return; }
    // @ts-ignore
    this.itemService.addItem({name, description, price, amountOfStock} as Item)
      .subscribe(item => {
        this.items.push(item);
      });
  }
  delete(item: Item): void {
    this.items = this.items.filter(i => i !== item);
    this.itemService.deleteItem(item).subscribe();
  }

}
