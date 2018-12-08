import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {User} from '../classes/user';
import { Observable, of } from 'rxjs';
import { REGISTERURL, LOGINURL } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(user:User): Observable<any>{
    return this.http.post(LOGINURL, user, this.httpOptions)
    .pipe(
      tap(
        error =>{
          return new Observable(error.error);
        }
      )
    );
  }

  register(user: User): Observable<any>{
    return this.http.post(REGISTERURL,user, this.httpOptions)
    .pipe(
       tap(
           error => {
             if(error.status == 422){
               return new Observable(error.error);
             }
           }
         )
    );
  }
}
