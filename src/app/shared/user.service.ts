import { Injectable } from '@angular/core';
//import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {
    private API_URL = environment.API_URL;

    constructor(private http:HttpClient) { }

    public postFeedback(username:string, email:string, phone:string, message:string):Observable<any>{
        const url = this.API_URL + 'feedbacks';
        let self = this;
        let headers = new HttpHeaders().set('Content-Type', "application/json");
        let options = { 'headers': headers };
        return this.http.post(url, {'username':username, 'email':email, 'phone':phone, 'message':message}, options)
          .map(function(res:any){
            return res;
          })
          .catch((error:any)=>{
              return Observable.throw(error.message || error);
          });
      }

}
