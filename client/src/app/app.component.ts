import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title : String = 'client';
  home : Boolean = true;
  login : Boolean = false;
  loggedIn : Boolean = false;
  constructor(private _httpService : HttpService, private _router: Router){}

  dataFromLogin(eventData){
    this.loggedIn = eventData;
    this.home = false;
    this.login = false;
    this._router.navigate(['apps', 'profile']);
  }
  showLogin(){
    this.home = false;
    this.login = true;
  }

  githubLogIn(){
    this._httpService.githubLogIn().subscribe( data => {
      console.log("Loggin in to github oauth");
      console.log("data coming back: ", data);    
    })
  }
}
