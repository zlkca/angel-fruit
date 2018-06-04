import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor(private router: Router, private translate:TranslateService) {

	}

	ngOnInit() {
		
	}
  
  closeNavMenu(){
      $('.navbar-collapse').removeClass('show');
  }
  
  toPage(url){
      this.closeNavMenu();
      this.router.navigate([url]);
  }

  changeLanguage(code){
      this.closeNavMenu();
      this.translate.use(code);
  }
}
