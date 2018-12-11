import { Component, OnInit, Input } from '@angular/core';
import {Inventory} from '../classes/inventory';
import {InventoryService} from '../services/inventory.service';
import {ItemService} from '../services/item.service';
import {Router, ActivatedRoute} from '@angular/router'
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  @Input() inventory:Inventory;
  constructor( private itemService: ItemService, private router:Router,private snackBar: MatSnackBar, private activeRoute:ActivatedRoute, private inventoryService: InventoryService) { 
  }

  ngOnInit() {
    this.inventoryService.getInventory(this.inventory._id).subscribe((result) =>{
      this.inventory.items = <any>result;
    })
  }

  updateItem(itemId:String){
    this.router.navigate(['./updateitem/' + this.inventory._id + '/' + itemId], {relativeTo: this.activeRoute});
  }

  addItem(){
    this.router.navigate(['./newitem/' + this.inventory._id], {relativeTo:this.activeRoute});
  }

  deleteItem(itemId:String){
    this.itemService.deleteItem(this.activeRoute.snapshot.paramMap.get("id"), this.inventory._id, itemId)
    .subscribe(result =>{
      if(result){
        this.snackBar.open("Item deleted", null, {duration: 2000});
        this.router.navigateByUrl('/fake', {skipLocationChange: true}).then(() =>{
           this.router.navigate["characters" + "/" + this.activeRoute.snapshot.paramMap.get("id")];
        });
      }else{
        this.snackBar.open("Something went wrong, please try again", null, {duration: 2000});
      }
    })
  }

  deleteInventory(){
    var charId = this.activeRoute.snapshot.paramMap.get("id");

    this.inventoryService.deleteInventory(charId, this.inventory._id).subscribe(result =>{
      if(result){
        this.snackBar.open("Inventory deleted", null, {duration: 2000});
        this.router.navigateByUrl('/fake', {skipLocationChange: true}).then(() =>{
           this.router.navigate["characters" + "/" + charId];
        });
      }else{
        this.snackBar.open("Something went wrong, please try again", null, {duration: 2000});
      }
    })
  }

}
