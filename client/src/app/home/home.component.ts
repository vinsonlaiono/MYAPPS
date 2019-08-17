import { Component, OnInit } from '@angular/core';
import { OAuthService } from '../o-auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { paths } from '../const'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_id:String;
  jwt_token:String;

  constructor(
    private oAuth: OAuthService,
    private _router: ActivatedRoute,
    private _route: Router
    ) { }

  ngOnInit() {
    this.auth()
  }
  auth(){
    if(!paths['payload']['jwt_token']){
      paths.payload = {
        'user_id' : this.user_id,
        'jwt_token' : this.jwt_token
      }
    }
    
    
    this.oAuth.authenticate(paths['payload']).subscribe( data => {
      console.group()
      console.log("data back from authentication:", data);
      this._route.navigate(['apps', 'profile', this.user_id, this.jwt_token])
    }, err => {
      console.log("there was an error while making API CALL");
      console.log(err);
    });
  }


}
