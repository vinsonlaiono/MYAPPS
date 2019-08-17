import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  home : Boolean = true;
  login : Boolean = false;
  authenticated : Boolean = false;

  isAuthenticated = true;

  constructor(
    private _httpService : HttpService, 
    private _router: Router
    ){}

  dataFromLogin(eventData){
    console.log(eventData, "THis is the event data from the other app")
    this.authenticated = eventData;
    // this.home = false;
    // this.login = false;
    this._router.navigate(['apps', 'profile']);
  }
  // showLogin(){
  //   this.home = false;
  //   this.login = true;
  // }
}
