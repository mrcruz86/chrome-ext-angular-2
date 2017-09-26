import { Component, OnInit } from '@angular/core';

import { WindowService } from '../../window/window.service';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-faq-btn',
  templateUrl: './faq-btn.component.html',
  styleUrls: ['./faq-btn.component.scss']
})
export class FaqBtnComponent implements OnInit {

  windowRef : any;

  constructor(private windowService : WindowService) {
    this.windowRef = windowService.nativeWindow;
  }

  ngOnInit() {
  }

  goToFAQ() : void {
    this.windowRef.open('http://faq.intricately.com/', '_blank');
  }

}
