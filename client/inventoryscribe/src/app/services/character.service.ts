import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {User} from '../classes/user';
import { Observable, of } from 'rxjs';
import { GETCHARURL} from "../constants";
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private jwtService:JwtService, private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
    })
  };

  getCharacters(): Observable<any>{
    console.log(this.httpOptions);
    return this.http.get(GETCHARURL, this.httpOptions);
  }
}
