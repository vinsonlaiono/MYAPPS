import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  
  constructor(
    private _http : HttpClient
    ) { }
    
    getJobs(filters){
      console.log('In get jobs function in service file')
      let headers = new HttpHeaders();
      headers.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Content-Length, Accept, Origin,");
      headers.set("Access-Control-Allow-Credentials", "true");
      headers.set('Cache-Control', 'no-cache');
      headers.set('Content-Type', 'application/json')
      
      console.log("Filters from job search", filters)
      
      let jobsApiUrl = 'https://jobs.github.com/positions.json?description=python&location=new+york';
      let location = filters.location || null;
      let description = filters.description || null;

      if(!location && !description) jobsApiUrl     = `https://jobs.github.com/positions.json`;
      else if(!location && description) jobsApiUrl = `https://jobs.github.com/positions.json?description=${description}`;
      else if(!description && location) jobsApiUrl = `https://jobs.github.com/positions.json?location=${location}`;
      else jobsApiUrl                              = `https://jobs.github.com/positions.json?description${description}&location=${location}`

      console.log("Seach url: ", jobsApiUrl)
      return this._http.get(`${jobsApiUrl}`, {headers:headers})
  }

  githubLogIn(){
    return this._http.get("https://github.com/login/oauth/authorize?client_id=a303fa5e19523e6c9c0b");
  }
}
