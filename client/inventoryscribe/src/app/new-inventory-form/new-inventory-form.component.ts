import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Inventory} from '../classes/inventory';
import {JwtService} from '../services/jwt.service';
import {InventoryService} from '../services/inventory.service';
import {Router, ActivatedRoute} from '@angular/router'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-new-inventory-form',
  templateUrl: './new-inventory-form.component.html',
  styleUrls: ['./new-inventory-form.component.css']
})
export class NewInventoryFormComponent implements OnInit {

  constructor(public activeRoute: ActivatedRoute, public inventoryService:InventoryService, public jwtService:JwtService, public snackBar:MatSnackBar, public router:Router) { }

  inventory:Inventory;
  ngOnInit() {
    setTimeout(() =>{
      if(this.jwtService.getJwtToken() == null){
        //redirect to login page
        this.snackBar.open("Please login first", null, {duration: 2000});
        this.router.navigate(['login']);
      }
    });
  }

  inventoryForm = new FormGroup({
    type: new FormControl('',
    Validators.required)
  });

  onSubmit(){
    var charid = null;
    this.inventory = this.inventoryForm.value;
    console.log(this.inventory);

    this.activeRoute.parent.params.subscribe(params =>{
      charid = params["id"];
    })

    this.inventoryService.postInventory(this.inventory,charid)
    .subscribe((result) =>{
      if(result){
        this.snackBar.open("Inventory added", null, {duration:2000});
        this.router.navigate(["characters/" + charid]);
      }
    }),
    (error =>{
      if(error){
        this.snackBar.open("Something went wrong please try again", null, {duration:2000});
      }
    })
  }

}
