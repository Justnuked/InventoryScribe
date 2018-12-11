import { Component, OnInit, Input } from '@angular/core';
import {Character} from '../classes/character';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {JwtService} from '../services/jwt.service';
import {CharacterService} from '../services/character.service';
import {MatSnackBar} from '@angular/material';
import {Router, ActivatedRoute, NavigationStart, NavigationEnd} from '@angular/router'

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  navigationSub;

  @Input() character:Character
  constructor(private activeRoute:ActivatedRoute, private router:Router, private snackBar:MatSnackBar, private jwtService: JwtService, private characterService:CharacterService) {
    this.navigationSub = router.events.subscribe(event =>{
      if(event instanceof NavigationStart || event instanceof NavigationEnd){
        this.ngOnInit();
      }
    });
   }

  ngOnInit() {
    setTimeout(() =>{
      if(this.jwtService.getJwtToken() == null){
        //redirect to login page
        this.snackBar.open("Please login first", null, {duration: 2000});
        this.router.navigate(['login']);
      }else{

       var id = this.activeRoute.snapshot.paramMap.get('id');
        this.characterService.getCharacter(id).subscribe(result=>{
          this.character = result;
          console.log(this.character);
        })
      }
    });
  }

  addNewInventory(characterId: String): void {
    this.router.navigate(['./newinventory'], {relativeTo: this.activeRoute});
  }

  updateCharacter(){
    this.characterService.putCharacter(this.character).subscribe(
      result =>{
        this.snackBar.open("Character updated",null, {duration:2000});
        this.router.navigate(['characters']);
      },
      error =>{
        console.log(error);
      }
    )
  }

  deleteCharacter(){
    this.characterService.deleteCharacter(this.activeRoute.snapshot.paramMap.get('id')).subscribe(
      result =>{
        this.snackBar.open("Character deleted",null, {duration:2000});
        this.router.navigate(['characters']);
      },
      error =>{
        console.log(error);
      }
    )
  }

}
