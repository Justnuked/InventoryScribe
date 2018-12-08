import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../services/character.service';
import {JwtService} from '../services/jwt.service';
import {Character} from '../classes/character';
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character:Character;
  constructor(public snackBar: MatSnackBar,private characterService:CharacterService, private jwtService: JwtService, private router:Router) { }

  ngOnInit() {
    //have to set a timeout else snackbar throws an error even if it works fine.
    //https://github.com/angular/angular/issues/15634#issuecomment-345504902

    setTimeout(() =>{
      if(this.jwtService.getJwtToken() == null){
        //redirect to login page
        this.snackBar.open("Please login first", null, {duration: 2000});
        this.router.navigate(['login']);
      }else{
        var temp = this.characterService.getCharacters().subscribe(result=>{
          this.character = result;
          console.log(this.character);
        })
      }
    });

    
  }

}
