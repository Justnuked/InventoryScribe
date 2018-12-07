import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {User} from '../classes/user';
import { Observable, of } from 'rxjs';

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

  register(user: User): Observable<any>{
    let url = "http://localhost:3000/api/auth/register";

    return this.http.post<any>(url,user, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('register'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
