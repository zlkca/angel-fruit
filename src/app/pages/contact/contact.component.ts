import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FeedbackComponent } from '../../ui/feedback/feedback.component';

@Component({
  selector: 'page-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private translate:TranslateService) { }

  ngOnInit() {
  }

}
