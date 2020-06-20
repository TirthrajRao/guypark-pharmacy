import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit {
  language: string = "en";
  details: any = this._translate.instant("notification");
  notificationId: any;

  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public route: ActivatedRoute
  ) {
    this._initialiseTranslation();

    this.route.params.subscribe((param) => {
      this.notificationId = param.id;
    })
  }
  
  ngOnInit() {
    console.log("notification id",this.notificationId)
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })

  }

  ionViewWillEnter() {
    this._userService.detectFooterChange('notification-detail');
  }

  _initialiseTranslation(): void {
    this._translate.use(this.language);
    setTimeout(() => {
      console.log(this._translate.instant("freeHome"));
      this.details = this._translate.instant("notification");

    }, 250);
  }

}
