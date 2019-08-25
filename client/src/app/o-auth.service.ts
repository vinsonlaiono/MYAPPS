import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import { paths } from './const';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class OAuthService implements HttpInterceptor{

  constructor(
    private _http: HttpClient
  ) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{

    let jwt_token:string;
    jwt_token = req.url.split('/')[2]
    if (!req.url.includes(paths.error)) {
      console.log("Not in path.errors")
      console.log(req)
      return next.handle(req);
    } 
    if(jwt_token === "undefined"){
      console.log("jwt is undefined");
    }
    console.log(req.body);
    paths.token = jwt_token
    paths.inSession=true;
    console.log("Interception route... ", req)
    
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization: 'Bearer ' + jwt_token
      },
      url: paths.secret
    })
    return next.handle(tokenizedReq)
  }

  authenticate(payLoad=null) {
    console.group()
    console.log("Sending Authentication Request...", localStorage.getItem('token_id'))
    return this._http.get('/secret/'+localStorage.getItem("token_id") )
    .catch( err => {
      console.log("Catching error...")
      return Observable.throw(err);
    });
  }
}
