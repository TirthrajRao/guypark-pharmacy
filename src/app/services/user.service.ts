import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public footerVariableSubject = new Subject();
  public changeLanguageSubject = new Subject();

  constructor() {
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
    localStorage.setItem('currentUser', JSON.stringify(data));
    this.currentUserSubject.next(data);
  }

  logOut(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
