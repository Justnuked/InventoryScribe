import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Item} from '../classes/item';
import { Observable, of } from 'rxjs';
import { ITEMURL} from "../constants";
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private jwtService:JwtService, private http: HttpClient) {
  }

  deleteItem(charId:String, inventoryId:String, itemId:String) :Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      }),
      body: {charid: charId, inventoryid: inventoryId}
    };

    return this.http.delete(ITEMURL + "/" + itemId, httpOptions);
  }

  getItem(itemId:String) :Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };

    return this.http.get(ITEMURL + '/' + itemId, httpOptions);
  }

  postItem(item:Item, charid:String, invId:String): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };

    return this.http.post(ITEMURL, {charid: charid,name: item.name, description: item.description, amount:item.amount
      ,inventoryid:invId}, httpOptions)
    .pipe(
      tap(
        error => {
          return new Observable(error.error);
        }
      )
    )
  }

  putItem(item:Item, charid:String, invId:String): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };

    return this.http.put(ITEMURL + '/' + item._id, {charid: charid,name: item.name, description: item.description, amount:item.amount
      ,inventoryid:invId}, httpOptions)
    .pipe(
      tap(
        error => {
          return new Observable(error.error);
        }
      )
    )
  }
}
