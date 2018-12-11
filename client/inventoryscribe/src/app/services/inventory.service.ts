import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Inventory} from '../classes/inventory';
import { Observable, of } from 'rxjs';
import { INVENTORYURL, ITEMURL} from "../constants";
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private jwtService:JwtService, private http: HttpClient) {
  }

  postInventory(inventory:Inventory, charid:String): Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };

    return this.http.post(INVENTORYURL, {type: inventory.type, charid: charid}, httpOptions)
    .pipe(
      tap(
        error => {
          return new Observable(error.error);
        }
      )
    )
  }

  getInventory(invId:String) : Observable<any>{
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      })
    };
 
    return this.http.get(ITEMURL + "/inventory/" + invId, httpOptions);
  }

  deleteInventory(charId:String, inventoryId:String){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.jwtService.getJwtToken()
      }),
      body: {charid: charId}
    };

    return this.http.delete(INVENTORYURL + "/" + inventoryId, httpOptions);
  }
}
