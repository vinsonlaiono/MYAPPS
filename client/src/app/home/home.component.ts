import { Component, OnInit } from '@angular/core';
import { OAuthService } from '../o-auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private oauth: OAuthService,
    private _router: Router
    ) { }

  ngOnInit() {
    this.oauth.authenticate().subscribe( data => {
      let authenticated = data['message'] === "Success" ? true : false;
      if(authenticated){
        // this._router.navigate(`/apps/profile/${data.user._id}`)
        this._router.navigate(['apps', 'profile', data['user']._id]);
      } else {
        console.log("please signin")
      }
    });
  }

}
