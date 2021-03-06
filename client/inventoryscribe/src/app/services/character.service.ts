import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Character} from '../classes/character';
import { Observable, of } from 'rxjs';
import { GETCHARURL, POSTCHARURL} from "../constants";
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private jwtService:JwtService, private http: HttpClient) {
   }

  postCharacter(character: Character): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };

    return this.http.post(POSTCHARURL ,character, httpOptions)
    .pipe(
       tap(
           error => {
               return new Observable(error.error);
             }
         )
    );
  }

  putCharacter(character: Character): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };

    return this.http.put(GETCHARURL + '/' + character._id ,character, httpOptions)
    .pipe(
       tap(
           error => {
               return new Observable(error.error);
             }
         )
    );
  }

  getCharacter(id:String): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };

    return this.http.get(GETCHARURL + '/' + id, httpOptions);
  }

  deleteCharacter(id:String):Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };

    return this.http.delete(GETCHARURL + '/' + id, httpOptions)
    .pipe(
      tap(
        error =>{
          return new Observable(error.error);
        }
      )
    )
  }

  getCharacters(): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };

    console.log(httpOptions);
    return this.http.get(GETCHARURL, httpOptions);
  }
}
