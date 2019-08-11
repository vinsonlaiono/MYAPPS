import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {

  constructor(
    private _http: HttpClient
  ) { }

  authenticate(){
    console.log("Must check if user is in session: ")
    console.log("Authenticating current user: ")
    return this._http.get('/authenticate/user')
  }
}
