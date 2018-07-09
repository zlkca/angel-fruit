import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() center; // {lat, lng}
  @Input() zoom;
  @ViewChild('map') div: ElementRef;
  
  _coords;
  
  constructor() { }

  ngOnInit() {
    if(!this.zoom){
      this.zoom = 14;
    }
    if(!this.center){
      this.center = {lat:43.643, lng:-79.391};
    }
    this._coords = new google.maps.LatLng(this.center.lat, this.center.lng);
   
    this.initMap();
  }
  
  initMap() {
    let self = this;
        var map = new google.maps.Map(this.div.nativeElement,
        {
          zoom: self.zoom,
          center: self._coords
        });
        
        var marker = new google.maps.Marker({
          position: self._coords,
          map: map
        });
      }
}
