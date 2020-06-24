import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  loading: Boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  language: string = localStorage.getItem('language');
  details: any = this._translate.instant("login");
  formDetails: any = this._translate.instant("form");
  forgotPswForm: FormGroup;
  submmitedFPsw: Boolean = false;

  constructor(
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public router: Router,
    public _userService: UserService,
    private _translate: TranslateService,
    public appcomponent: AppComponent,
    public http: HttpClient
  ) {
    console.log("in counstructor")
    this._initialiseTranslation()
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
    this.forgotPswForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })

  }

  ngOnInit() {
    // this.loading = true
    console.log("in ngoninit")
    this._initialiseTranslation()

    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  get f() { return this.loginForm.controls }
  get fpsw() { return this.forgotPswForm.controls; }

  /**
   * Show hide password
   */
  showHide() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  /**
   * Login User
   * @param {Object} data 
   */
  loginUser(data) {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return
    }
    console.log("login data", data);
    this.isDisable = true;
    this.loading = true;
    this._userService.login(data).then((res: any) => {
      console.log(res);
      this.loading = false;
      this.isDisable = false;
      this.loginForm.reset();
      this.submitted = false;
      this.appcomponent.sucessAlert(res.message);
      this.router.navigate(['/home']);
    }).catch((err) => {
      console.log(err);
      this.loading = false;
      this.isDisable = false;
      this.appcomponent.errorAlert(err.error.message);
    });
  }

  /**
   * Facebook login
   */
  facebookLogin() {
    console.log("facebook login ")
    this.isDisable = true;
    const permissions = ["public_profile", "email"];
    this.fb.login(permissions)
      .then((response: FacebookLoginResponse) => {
        console.log("response of fb", response);
        this.fetchFacebookData(response.authResponse.accessToken).subscribe(async (res: any) => {
          console.log('facebook data============>', res);
          const userId = response.authResponse.userID
          const data = {
            social_login_id: userId,
            access_token: response.authResponse.accessToken,
            social_login_type: 'facebook',
            first_name: res.first_name,
            last_name: res.last_name,
            username: res.name,
          }
          if (res.email) {
            data['email'] = res.email
          }
          // this.isDisable = false;
          this.loading = true;
        await this._userService.login(data).then((res: any) => {
            console.log(res);
            this.loading = false;
            this.isDisable = false;
            this.loginForm.reset();
            this.appcomponent.sucessAlert(res.message);
            this.router.navigate(['/home'])
          }).catch((err) => {
            console.log(err);
            this.appcomponent.errorAlert(err.error.message);
            this.loading = false;
            this.isDisable = false;
          });

        }, error => {
          console.log("facebook err", error);
          this.isDisable = false;
          this.loading = false;
        });
      })
  }

  fetchFacebookData(accessToken) {
    return this.http.get("https://graph.facebook.com/v5.0/me?access_token=" + accessToken + "&debug=all&fields=id,name,birthday,first_name,last_name,hometown,locale,gender,email&format=json&method=get&pretty=1&suppress_http_code=1")
  }
  /**
   * Google login
   */
  googleLogin() {
    console.log('google login');
    this.isDisable = true;
    this.googlePlus.login({})
      .then(user => {
        console.log("google response", user);
        const data = {
          social_login_id: user.userId,
          access_token: user.accessToken,
          social_login_type: 'google',
          email: user.email,
          first_name: user.givenName,
          last_name: user.familyName,
          username: user.givenName + ' ' + user.familyName,
        }
        this._userService.login(data).then((res: any) => {
          console.log(res);
          this.loading = false;
          this.isDisable = false;
          this.loginForm.reset();
          this.appcomponent.sucessAlert(res.message);
          this.router.navigate(['/home'])
        }).catch((err) => {
          console.log(err);
          this.loading = false;
          this.isDisable = false;
          this.appcomponent.errorAlert(err.error.message);
        });
      }, err => {
        console.log("google err", err);
        this.isDisable = false;
      });
  }

  /**
   * language change
   */
  _initialiseTranslation() {
    console.log("in language", this.language)
    setTimeout(() => {
      this._translate.use(this.language);
      console.log(this._translate.instant("login"));
      this.details = this._translate.instant("login");
      this.formDetails = this._translate.instant("form");
    }, 250);
  }

  /**
   * Forgot password
   * @param {Object} data
   */
  forgotPassword(data) {
    console.log(data);
    this.submmitedFPsw = true;
    if (this.forgotPswForm.invalid) {
      return
    }
    this.loading = true;
    this.isDisable = true;
    this._userService.forgotPassword(data).then((res: any) => {
      console.log("res of forgot psw", res);
      this.loading = false;
      this.isDisable = false;
      $("#forgot-password").fadeOut();
      this.appcomponent.sucessAlert(res.message);
      // this.appComponent.sucessAlert("Please Check the mail")
    }).catch((err) => {
      console.log("err in f psw", err);
      // this.appComponent.errorAlert(err.error.message);
      this.loading = false;
      this.isDisable = false;
      $("#forgot-password").fadeOut();
      this.appcomponent.errorAlert(err.error.message);
    })
  }

  /**
   * open modal
   */
  openModal() {
    $('#forgot-password').fadeIn();
    $('#forgot-password .modal_body').click(function (event) {
      event.stopPropagation();
    });
    $('#forgot-password').click(() => {
      $('#forgot-password').fadeOut();
      this.submmitedFPsw = false;
    });
  }
}
