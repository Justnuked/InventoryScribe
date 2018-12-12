import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  jwtToken:String

   getJwtToken(){
     return this.jwtToken;
   }

   setJwtToken(jwtToken:String){
    var temp = jwtToken.substring(1, (jwtToken.length - 1));
     this.jwtToken = temp;
   }

   clearJwtToken(){
     this.jwtToken = null;
   }


}
