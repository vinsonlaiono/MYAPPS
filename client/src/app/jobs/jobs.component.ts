import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: any;
  searchOptions: Object;

  constructor(
    private _httpSerivce : HttpService,
  ) { }

  ngOnInit() {
    // this.getAllJobs()
    this.searchOptions = {
      description : '',
      location: '',
      full_time: true
    }
  }

  getAllJobs(){
    console.log("Search Options in component", this.searchOptions)
    this._httpSerivce.getJobs(this.searchOptions).subscribe( data => {
      console.log("List of jobs from Github API: ", data)
      this.jobs = data
    })
  }

  addToMyApps(myJob){
    console.log("Adding this job to my list of jobs", myJob)
  }
}
