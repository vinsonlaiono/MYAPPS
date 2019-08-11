import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uid:String;
  user: Object = {
    name:"",
    avatar_url: ""
  };
  @Output() userHasLoggedIn = new EventEmitter
  constructor(
    private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("Users Access Token", params['uid'])
      this.uid = params['uid'];
  });
    this.getUserInfo();
  }

  getUserInfo(){
    this._httpService.githubLogIn(this.uid).subscribe(data => {
      console.log("Data back from oath", data);
      this.user = data['user'];
      this.userHasLoggedIn.emit(true);
      
    })
  }

  

}
