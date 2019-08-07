import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  access_token:String;
  user: Object;
  constructor(
    private _httpService : HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log("Users Access Token", params['acc_token'])
      this.access_token = params['acc_token'];
  });
    this.getUserInfo();
  }

  getUserInfo(){
    this._httpService.githubLogIn(this.access_token).subscribe(data => {
      console.log("Data back from oath", data);
      this.user = data;
    })
  }

}
