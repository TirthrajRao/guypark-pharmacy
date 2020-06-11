import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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

  constructor(
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public router: Router,
    public _userService: UserService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() { }

  get f() { return this.loginForm.controls }

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
    this._userService.login(data);
    this.router.navigate(['/home']);
  }

  facebookLogin() {
    console.log("facebook login ")
    this.isDisable = true;

    const permissions = ["public_profile", "email"];

    this.fb.login(permissions)
      .then(response => {
        let userId = response.authResponse.userID;
        console.log("response of fb", response)
        this.isDisable = false;
        //Getting name and gender properties
        this.fb.api("/me?fields=name,email", permissions)
          .then(user => {
            console.log('Facebook Res', user)
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            console.log("picture", user.picture);
            this.router.navigate(['/home']);
            //now we have the users info, let's save it in the NativeStorage
          })
      }, error => {
        console.log("facebook err", error);
        this.isDisable = false;
      });
  }

  googleLogin() {
    console.log('google login');
    this.isDisable = true;
    this.googlePlus.login({})
      .then(user => {
        console.log("google response", user);
        this.router.navigate(['/home']);
      }, err => {
        console.log("google err", err);
        this.isDisable = false;
      });
  }
}
