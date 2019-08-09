import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  acc_token:String;

  constructor() { }

  ngOnInit() {
    let url = window.location.href;
    let access = url.split('/')
    console.log("Current URL: ", window.location.href)
    console.log(access)
    console.log("Token: ", access[5])
    this.acc_token = access[5];
  }

}
