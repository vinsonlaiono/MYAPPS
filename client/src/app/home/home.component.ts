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
  user_id:string;
  jwt_token:string;

  constructor(
    private oAuth: OAuthService,
    private _router: ActivatedRoute,
    private _route: Router
    ) { }

  ngOnInit() {
    if(localStorage.getItem('user_id')){
      localStorage.setItem("user_id", this.user_id)
      localStorage.setItem("token_id", this.jwt_token)
      console.log("In oninit in home componite", localStorage.getItem('user_id'))
      let payload = {
        'user_id' : this.user_id,
        'jwt_token' : this.jwt_token
      }
      // this.auth(payload)

    } else {
      console.log("User in localstorage: ", localStorage.getItem("user_id"))
      let uid = localStorage.getItem("user_id")
      let tid = localStorage.getItem("token_id")
      this._route.navigate(['apps', 'profile', uid, tid])
    }

  }
  // auth(pl){
  //   // if(!paths['payload']['jwt_token']){
  //   //   paths.payload = {
  //   //     'user_id' : this.user_id,
  //   //     'jwt_token' : this.jwt_token
  //   //   }
  //   // }
    
  //   console.log("Payload: ", paths['payload'])
  //   console.log("Paths: ", paths)
  //   this.oAuth.authenticate(pl).subscribe( data => {
  //     console.group()
  //     console.log("data back from authentication:", data);
  //     this._route.navigate(['apps', 'profile', localStorage.getItem("user_id"), localStorage.getItem("token_id")])
  //   }, err => {
  //     console.log("there was an error while making API CALL");
  //     console.log(err);
  //   });
  // }


}
