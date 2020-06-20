import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public fcm: FCM,
    public _translate:TranslateService
  ) {

     //Exit app
     this.platform.backButton.subscribe(() => {
      if (this.router.url === '/home/home-page' || this.router.url === '/login') {
        navigator['app'].exitApp();
      }
    })
    
    this.initializeApp();
    // this.router.navigate(['/home'])
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#1F3C92");
      this.splashScreen.hide();
      this._translate.setDefaultLang('en');
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
}

