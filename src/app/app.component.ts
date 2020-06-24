import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { TranslateService } from '@ngx-translate/core';
declare const $:any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  language: any = localStorage.getItem('language');
  message:any;
  errMessage:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public fcm: FCM,
    public _translate: TranslateService
  ) {

    //Exit app
    this.platform.backButton.subscribe(() => {
      if (this.router.url === '/home/home-page' || this.router.url === '/login') {
        navigator['app'].exitApp();
      }
    })

    this.initializeApp();
    this.router.navigate(['/home'])
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#1F3C92");
      setTimeout(() => {
        this.splashScreen.hide();
      }, 700);
      if (!this.language) {
        this._translate.setDefaultLang('en');
        localStorage.setItem('language', 'en');
      }else{
        this._translate.setDefaultLang(this.language)
      }
      this.getNotification();
    });
  }

  /**
 * Get Notification
 */
  getNotification() {
    this.getToken();
    this.fcm.clearAllNotifications();
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log("reresh token", token);
    });

    this.fcm.onNotification().subscribe(data => {
      console.log("notification data", data, data.notification_id);
      if (data.wasTapped) {
        console.log("Received in background", data);
        // this.router.navigateByUrl('/home/notification-detail/' + data.notification_id)
      } else {
        console.log("Received in foreground", data);
        this.getLocalNotification(data);
      };
      this.getNotificationCount();
    });
  }

  /**
   * Get LOcal NOtification when app is in foreground
   */
  getLocalNotification(data) {
    console.log("daata in local notification", data);
    // this.localNotifications.schedule({
    //   id: data.notification_id,
    //   title: data.title,
    //   text: data.body,
    //   foreground: true,
    //   icon: data.image
    // });

  }

  /**
   * Get DeviceToken
   */
  getToken() {
    this.fcm.getToken().then(token => {
      console.log('token======>', token);
      localStorage.setItem('deviceToken', token);
    });

  }

  /**
   * get unread notification count
   */
  getNotificationCount() {
    // this._formService.getNotificationCount().subscribe((res: any) => {
    // }, (err) => {
    //   console.log("err in notification count", err)
    // })
  }

  /** 
   *Sucess Alert
   */
  sucessAlert(message?) {
    this.message = message;
    $('.success_alert_box').fadeIn().addClass('animate');
    $('.success_alert_box').click(function () {
      $(this).hide().removeClass('animate');
    });
    $('.success_alert_box .alert_box_content').click(function (event) {
      event.stopPropagation();
    });
  }

  /** 
   *Error Alert
   */
  errorAlert(message?) {
    this.errMessage = message
    $('.error_alert_box').fadeIn().addClass('animate');
    $('.error_alert_box').click(function () {
      $(this).hide().removeClass('animate');
    });
    $(' .error_alert_box .alert_box_content').click(function (event) {
      event.stopPropagation();
    });
  }
}

