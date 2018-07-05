import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FeedbackComponent } from '../../ui/feedback/feedback.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'page-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	addresses: any[] = [
	 {unit:'Unit-106', street:'53 ParkHurst Square, Brampton, ON L6T5H5', center:{lat: 43.728282, lng: -79.665341}}
	,{unit:'Unit-106', street:'73 ParkHurst Square, Brampton, ON L6T5J2', center:{lat: 43.729168, lng: -79.66618}}
	,{unit:'Unit-106', street:'8 Westmore Drive, Etobicoke, ON M5V3Z7', center:{lat: 43.741986, lng: -79.605158}}
	,{unit:'Unit-106', street:'2300 Lawrence Avenue East, Scarborough ON M1P2R3', center:{lat: 43.7507919, lng: -79.2765612}}
	,{unit:'Unit-106', street:'53 ParkHurst Square, Brampton, ON L6T5H5', center:{lat: 43.728282, lng: -79.665341}}
	,{unit:'Unit-106', street:'53 ParkHurst Square, Brampton, ON L6T5H5', center:{lat: 43.728282, lng: -79.665341}}
	];

  constructor(private http:HttpClient, private translate:TranslateService) { }

  ngOnInit() {
  	let addr = this.addresses[3];
  	this.getLocation(addr.street).subscribe(x=>{
  		let kk = x;
  	})
  }


    getLocation(addr:string):Observable<any>{
        let url = 'http://maps.google.com/maps/api/geocode/json?address=' + addr + 'CA&sensor=false'
        return this.http.get(url).pipe(map((res:any)=>{
            if(res.results && res.results.length>0){
                let r = res.results[0];
                let postal_code = '', sub_locality = '', locality = '';
                for(let addr of r.address_components){
                    if(addr.types.indexOf('postal_code')!=-1){
                        postal_code = addr.long_name;
                    }
                    if(addr.types.indexOf('sublocality_level_1')!=-1 || addr.types.indexOf('sublocality')!=-1){
                        sub_locality = addr.long_name;
                    }
                    if(addr.types.indexOf('locality')!=-1){
                        locality = addr.long_name;
                    }
                }
                return {...r.geometry.location, ...{'formatted_addr':r.formatted_address,
                    'locality':locality,
                    'sub_locality':sub_locality,
                    'postal_code':postal_code}};//{lat: 43.7825004, lng: -79.3930389}
            }else{
                return null;
            }
        }));
    }
}
