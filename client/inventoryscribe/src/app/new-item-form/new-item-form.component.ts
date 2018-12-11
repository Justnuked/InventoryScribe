import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Item} from '../classes/item';
import {JwtService} from '../services/jwt.service';
import {ItemService} from '../services/item.service';
import {Router, ActivatedRoute} from '@angular/router'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-new-item-form',
  templateUrl: './new-item-form.component.html',
  styleUrls: ['./new-item-form.component.css']
})
export class NewItemFormComponent implements OnInit {

  constructor(public activeRoute: ActivatedRoute, public itemService:ItemService, public jwtService:JwtService, public snackBar:MatSnackBar, public router:Router) { }

  item:Item;

  ngOnInit() {
    setTimeout(() =>{
      if(this.jwtService.getJwtToken() == null){
        //redirect to login page
        this.snackBar.open("Please login first", null, {duration: 2000});
        this.router.navigate(['login']);
      }
    });
  }

  itemForm = new FormGroup({
    name: new FormControl('',
    Validators.required),
    description: new FormControl('',
    Validators.required),
    amount: new FormControl('',[
      Validators.required,
      Validators.pattern(/^[0-9]*$/)]
    )
  });

  get name(){
    return this.itemForm.get('name');
  }

  get description(){
    return this.itemForm.get('description');
  }

  get amount(){
    return this.itemForm.get('amount');
  }

  onSubmit(){
    var charid = null;
    this.item = this.itemForm.value;

    this.activeRoute.parent.params.subscribe(params =>{
      charid = params["id"];
    });

    var invId = this.activeRoute.snapshot.paramMap.get('invid');


    this.itemService.postItem(this.item,charid,invId)
    .subscribe((result) =>{
      if(result){
        this.snackBar.open("Item added", null, {duration:2000});
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
