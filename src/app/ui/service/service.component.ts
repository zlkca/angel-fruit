import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor(private router:Router) {

  }

  ngOnInit() {
  	
  }

  postProject(){
      let bLoggedIn = true;

      if(bLoggedIn){
          this.router.navigate(['project-form']);
      }else{
          this.router.navigate(['home']);
      }
  }
}
