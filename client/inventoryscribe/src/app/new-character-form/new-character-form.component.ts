import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Character} from '../classes/character';
import {JwtService} from '../services/jwt.service';
import {CharacterService} from '../services/character.service';
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-new-character-form',
  templateUrl: './new-character-form.component.html',
  styleUrls: ['./new-character-form.component.css']
})
export class NewCharacterFormComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private router:Router,private jwtService:JwtService, private characterService:CharacterService) { }

  character:Character;

  characterForm = new FormGroup({
    name: new FormControl('',
    Validators.required),
    class: new FormControl('',
    Validators.required),
    race: new FormControl('',
    Validators.required)
  });

  get name(){
    return this.characterForm.get('name');
  }

  get class(){
    return this.characterForm.get('class');
  }
  get race(){
    return this.characterForm.get('race');
  }

  ngOnInit() {
    setTimeout(() =>{
      if(this.jwtService.getJwtToken() == null){
        //redirect to login page
        this.snackBar.open("Please login first", null, {duration: 2000});
        this.router.navigate(['login']);
      }
    });
  }

  onSubmit() {
    this.character = this.characterForm.value;
    this.characterService.postCharacter(this.character).subscribe(result =>{
        this.snackBar.open("Character created!", null, {duration: 2000});
        this.router.navigate(['characters']);
        
      },err =>{
        var temp = JSON.stringify(err.error.Message);
        this.snackBar.open(temp, null, {duration: 2000});
      }
    );
  }

}
