import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public footerVariableSubject = new Subject();
  public changeLanguageSubject = new Subject();
  public notificationCountSubject = new Subject();

  constructor(
    public http: HttpClient,
    public HTTP: HTTP,
    public platform: Platform
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  footerChanges(): any {
    return this.footerVariableSubject.asObservable();
  }

  detectFooterChange(name) {
    this.footerVariableSubject.next({ "componantName": name })
  }

  languageChanges(): any {
    return this.changeLanguageSubject.asObservable();
  }

  detectLanguageChange(name) {
    this.changeLanguageSubject.next({ "language": name })
  }

  notiFicationCounts(): any {
    return this.notificationCountSubject.asObservable();
  }

  /**
   * Login User
   * @param {object} data 
   */
  login(data) {
    return new Promise((resolve, reject) => {
      if (this.platform.is('ios')) {
        console.log("login ios.......")
        this.HTTP.post(config.baseApiUrl + 'auth/login', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              localStorage.setItem('currentUser', JSON.stringify(jsonRes.data));
              this.currentUserSubject.next(jsonRes);
            }
            resolve(jsonRes);
          }).catch((err) => {
            console.log("err", err)
            reject(err);
          });
      } else {
        return this.http.post(config.baseApiUrl + 'auth/login', data).subscribe((user: any) => {
          console.log("login user=========>", user.data);
          // login successful if there's a jwt token in the response
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            this.currentUserSubject.next(user);
            resolve(user)
          }
          return user;
        }, err => {
          console.log(err);
          reject(err);
        });
      }
    })
  }

  /**
   * Register user
   * @param {object} data 
   */
  registerUser(data) {
    return new Promise((resolve, reject) => {
      if (this.platform.is('ios')) {
        console.log("login ios.......")
        this.HTTP.post(config.baseApiUrl + 'auth/register', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              localStorage.setItem('currentUser', JSON.stringify(jsonRes.data));
              this.currentUserSubject.next(jsonRes);
            }
            resolve(jsonRes);
          }).catch((err) => {
            console.log("err", err)
            reject(err);
          });
      } else {
        return this.http.post(config.baseApiUrl + 'auth/register', data).subscribe((user: any) => {
          console.log("login user=========>", user.data);
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user.data));
            this.currentUserSubject.next(user);
            resolve(user)
          }
          return user;
        }, err => {
          console.log(err);
          reject(err);
        });
      }
    })
  }

  /**
   * log out
   */
  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('language');
    this.currentUserSubject.next(null);
  }

  /**
   * Forgot Password
   * @param {object} data 
   */
  forgotPassword(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'auth/forgot-password', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'auth/forgot-password', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  getUserDetail(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'auth/user-data', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'auth/user-data', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })

  }

   /**
   * reset password
   * @param {objct} data 
   */
  resetPassWord(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'auth/change-password', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'auth/change-password', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  /**
   * Edit profile
   * @param {objct} data 
   */
  editUserProfile(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'auth/edit-user', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'auth/edit-user', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  /**
   * Noification List
   * @param {object} data 
   */
  getNotificationList(data) {
    return new Promise((resolve, reject) => {
      if (!this.platform.is('ios')) {
        this.http.post(config.baseApiUrl + 'auth/user-data', data).subscribe((res) => {
          resolve(res)
        }, err => {
          reject(err)
        });
      } else {
        this.HTTP.post(config.baseApiUrl + 'auth/user-data', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              resolve(jsonRes);
            }
          }).catch((err) => {
            reject(err);
          });
      }
    })
  }

  getNotificationCount() {
    const deviceToken = localStorage.getItem('deviceToken');
    // console.log(deviceToken)
    const data = {
      device_token: deviceToken
      // device_token:"drPekkInCCA:APA91bGmPaGN4A9h2STBSdvXeEKVQ7nsBYFYyJH7gqNDpngNl-nZejJcy21T3CUi2ISC8a2OpWoZLUtbkRK9SqU2A-0efgYYe08WT5D9QSd6xsPyo0ZRo-BxwYnGQh4STWhS3xrjg3yH"
    }
    return new Promise((resolve, reject) => {
      if (this.platform.is('ios')) {
        console.log("login ios.......")
        this.HTTP.post(config.baseApiUrl + 'device_token/notification_unread_count', data, {}).
          then((user) => {
            const res = user.data;
            return JSON.parse(res)
          }).then((jsonRes) => {
            if (jsonRes) {
              this.notificationCountSubject.next(jsonRes);
            }
            resolve(jsonRes);
          }).catch((err) => {
            console.log("err", err)
            reject(err);
          });
      } else {
        return this.http.post(config.baseApiUrl + 'device_token/notification_unread_count', data).subscribe((user: any) => {
          console.log("login user=========>", user.data);
          if (user) {
            this.notificationCountSubject.next(user);
            resolve(user)
          }
          return user;
        }, err => {
          console.log(err);
          reject(err);
        });
      }
    })

  }
}
