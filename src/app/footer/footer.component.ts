import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
declare const $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  details: any = this._translate.instant("footer");
  language: string = localStorage.getItem('language');
  constructor(
    public router: Router,
    public _userService: UserService,
    private _translate: TranslateService,

  ) {
    // this._userService.notiFicationCounts().subscribe(response => {
    //   this._zone.run(() => {
    //     this.notificationCount = response.notification;
    //     console.log("response of notification count =====>", this.notificationCount);
    //   })
    // })

    this._userService.footerChanges().subscribe((res) => {
      console.log("in footer", res);
      this.addActiveClass(res.componantName)
    });
    this._initialiseTranslation()
  }


  ngOnInit() {
    console.log("current url", this.router.url);
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  addActiveClass(name) {
    if ($('li').hasClass('active-page')) {
      $('li').removeClass('active-page')
    }
    if (name == 'home') {
      $('.home').addClass('active-page')
    } else if (name == 'services') {
      $('.services').addClass('active-page')
    } else if (name == 'request') {
      $('.request').addClass('active-page')
    } else if (name == 'notification' || name=='notification-detail') {
      $('.notification').addClass('active-page')
    } else if (name == 'contact') {
      $('.contact').addClass('active-page')
    }

  }

   /**
   * langugae 
   */
  _initialiseTranslation(): void {
    console.log(this.language)
    setTimeout(() => {
      this._translate.use(this.language);
      this.details = this._translate.instant("footer");
      console.log("----------",this.details)
    }, 25);
  }
}