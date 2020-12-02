import { Component, Input, OnInit} from '@angular/core';
import { Item } from '../../classes/item-class';
import { Location } from '@angular/common';
import { ItemServiceService } from '../../services/item-service.service';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item!: Item;
  descriptionCount(): number {
    return this.item.description.length;
  }

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemServiceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getItem();
  }

  getItem(): void {
    // @ts-ignore   REGULAR GET(ID) NOT WORKING WITH UUID IDs
    // const id = +this.route.snapshot.paramMap.get('id');
    // console.log(555 + id);
    // @ts-ignore
    console.log(this.route.snapshot.paramMap.params.id);
    // @ts-ignore
    const idBis = this.route.snapshot.paramMap.params.id;
    this.itemService.getItem(idBis.toString())
      .subscribe(item => this.item = item);
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.itemService.updateItem(this.item)
      .subscribe(() => this.goBack());
  }

}
