import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  menuPages: any;
  details: any;
  language: any = 'en';

  constructor(
    public menu: MenuController,
    public router: Router,
    private _translate: TranslateService,
    public _userService: UserService
  ) {
    
    this._initialiseTranslation();
    setTimeout(() => {
      this.createMenu();
    }, 300);

  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })

  }

  createMenu() {
    this.menuPages = [
      {
        name: this.details.Home,
        icon: 'assets/images/1.png',
        url: '/home/home-page'
      },
      {
        name: this.details.Medication,
        icon: 'assets/images/2.png',
        url: '/home/service-list'
      },
      {
        name: this.details.AboutUs,
        icon: 'assets/images/3.png',
        url: '/home/about-us'
      },
      {
        name: this.details.Services,
        icon: 'assets/images/4.png',
        url: '/home/our-services'
      },
      {
        name: this.details.Career,
        icon: 'assets/images/5.png',
        url: '/home/employment'
      },
      {
        name: this.details.HippaNotice,
        icon: 'assets/images/6.png',
        url: '/home/hippa-notice'
      },
      {
        name: this.details.Notification,
        icon: 'assets/images/7.png',
        url: '/home/notification'
      },
      {
        name: this.details.ContactUs,
        icon: 'assets/images/8.png',
        url: '/home/contact-us'
      },

    ]
  }

  /**
   * Close Menu
   */
  closeMenu() {
    this.menu.close();
  }

  /**
   * log out
   */
  logOut() {
    this._userService.logOut();
    this.router.navigate(['/login'])
  }


  _initialiseTranslation(): void {
    this._translate.use(this.language);
    setTimeout(() => {
      console.log("in home page", this._translate.instant("sidemenu"));
      this.details = this._translate.instant("sidemenu");
      this.createMenu();
    }, 250);
  }

  changeLanguage(language){
    console.log(language);
    this.language = language;
    this._translate.use(this.language);
    this.details = this._translate.instant("sidemenu");
    this._userService.detectLanguageChange(this.language);
  }
}
