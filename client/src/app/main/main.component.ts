import { Component, OnInit } from '@angular/core';
import { OAuthService } from '../o-auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user_id:String;
  jwt_token:String;

  constructor(
    private oAuth: OAuthService,
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    let url = window.location.href;
    let access = url.split('/')
    console.log("Current URL: ", window.location.href)
    console.log(access)
    console.log("User id: ", access[5])
    console.log("User jwt: ", access[6])
    this.user_id = access[5];
    this.jwt_token = access[6];
    
  }

  auth(){
    let payLoad = {
      'user_id' : this.user_id,
      'jwt_token' : this.jwt_token
    }
    
    this.oAuth.authenticate(payLoad).subscribe( data => {
      console.group()
      console.log("data back from authentication:", data);

    }, err => {
      console.log(err);
    });
  }

}
