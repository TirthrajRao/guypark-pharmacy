import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public footerVariableSubject = new Subject();
  public changeLanguageSubject = new Subject();

  constructor(
    public http: HttpClient
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

  /**
   * Login User
   * @param {object} data 
   */
  login(data) {
    return this.http.post(config.baseApiUrl + 'auth/login', data)
      .pipe(map((user: any) => {
        console.log("login user=========>", user.data);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  /**
   * Register user
   * @param {object} data 
   */
  registerUser(data) {
    return this.http.post(config.baseApiUrl + 'auth/register', data)
      .pipe(map((user: any) => {
        console.log("register user=========>", user.data);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
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
    return this.http.post(config.baseApiUrl + 'auth/forgot-password', data)
  }

  getUserDetail(data) {
    return this.http.post(config.baseApiUrl + 'auth/user-data', data);
  }
}
