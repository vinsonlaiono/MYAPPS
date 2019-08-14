import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  constructor(
    private _http: HttpClient
  ) { }

  authenticate(payLoad=null){
    console.log("Must check if user is in session: ")
    if(payLoad === null){
      // return this._http.get('/authenticate/user')
      return this._http.get('/secret')
    } else {
      let headers = {
        'Authorization' : 'Bearer ' + payLoad.jwt_token
      }
      console.log("Authenticating current user: ")
      return this._http.get('/secret', {headers:headers})
    }
    
  }
}
