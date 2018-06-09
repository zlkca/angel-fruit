import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ServiceComponent } from '../../ui/service/service.component';
import { PortfolioComponent } from '../../ui/portfolio/portfolio.component';
import { FeedbackComponent } from '../../ui/feedback/feedback.component';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	APP_URL = environment.APP_URL;
  
  constructor(private translate:TranslateService) { }

  ngOnInit() {
      
  }

}
