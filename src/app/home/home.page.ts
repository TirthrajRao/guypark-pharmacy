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
    }, 30);

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
        icon: '',
        url: '/home/home-page'
      },
      {
        name: this.details.Medication,
        icon: '',
        url: '/home/service-list'
      },
      {
        name: 'About Us',
        icon: '',
        url: '/home/about-us'
      },
      {
        name: 'Services',
        icon: '',
        url: '/home/our-services'
      },
      {
        name: 'Career',
        icon: '',
        url: '/home/employment'
      },
      {
        name: 'Hippa Notice',
        icon: '',
        url: '/home/hippa-notice'
      },
      {
        name: 'Notification',
        icon: '',
        url: '/home/notification'
      },
      {
        name: 'Contact Us',
        icon: '',
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
    }, 25);
  }

  changeLanguage(language){
    console.log(language);
    this.language = language;
    this._translate.use(this.language);
    this.details = this._translate.instant("sidemenu");
    this._userService.detectLanguageChange(this.language);
  }
}
