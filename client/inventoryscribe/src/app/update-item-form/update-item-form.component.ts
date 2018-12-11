import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Item} from '../classes/item';
import {JwtService} from '../services/jwt.service';
import {ItemService} from '../services/item.service';
import {Router, ActivatedRoute} from '@angular/router'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-update-item-form',
  templateUrl: './update-item-form.component.html',
  styleUrls: ['./update-item-form.component.css']
})
export class UpdateItemFormComponent implements OnInit {

  constructor(public activeRoute: ActivatedRoute, public itemService:ItemService, public jwtService:JwtService, public snackBar:MatSnackBar, public router:Router) { }

  @Input() item:Item;

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

    this.item._id = this.activeRoute.snapshot.paramMap.get('itemid');

    var invId = this.activeRoute.snapshot.paramMap.get('invid');

    this.itemService.putItem(this.item, charid, invId)
    .subscribe((result) =>{
      if(result){
        this.snackBar.open("Item updated", null, {duration:2000});
        this.router.navigate(["characters/" + charid]);
      }else{
        this.snackBar.open("Something went wrong please try again", null, {duration:2000});
      }
    })
  }
}
