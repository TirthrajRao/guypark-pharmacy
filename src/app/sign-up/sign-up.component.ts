import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  loading: Boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  language: string = "en";
  details: any = this._translate.instant("login");
  formDetails: any = this._translate.instant("form");

  constructor(
    private _translate: TranslateService,
    public _userService: UserService,
    public router:Router
  ) {
    this.signUpForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_number: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])

    })
    this._initialiseTranslation()
  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }
  get f() { return this.signUpForm.controls }

  /**
   * Show hide password
   */
  showHide() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  /**
   * SignUp User
   * @param {Object} data 
   */
  signUpUser(data) {
    console.log(data)
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return
    }
    this.isDisable = true;
    this.loading = true;
    console.log("sign up data", data);
    this._userService.registerUser(data).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.isDisable = false;
      this.signUpForm.reset();
      this.submitted = false;
      this.router.navigate(['/home'])
    },err=>{
      console.log(err);
      this.loading = false;
      this.isDisable = false;
    })
  }

  /**
   * language change
   */
  _initialiseTranslation(): void {
    this._translate.use(this.language);
    setTimeout(() => {
      console.log(this._translate.instant("login"));
      this.details = this._translate.instant("login");
      this.formDetails = this._translate.instant("form");
    }, 250);
  }
}
