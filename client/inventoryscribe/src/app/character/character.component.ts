import { Component, OnInit, Inject } from '@angular/core';
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

  characters:Character[];
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

        this.characterService.getCharacters().subscribe(result=>{
          this.characters = result;
        })
      }
    });
  }

  onSelect(characterId: String): void {
    this.router.navigate(['characters',characterId]);
  }
}
