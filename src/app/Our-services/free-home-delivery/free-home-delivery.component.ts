import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-free-home-delivery',
  templateUrl: './free-home-delivery.component.html',
  styleUrls: ['./free-home-delivery.component.scss'],
})
export class FreeHomeDeliveryComponent implements OnInit {

  freeDeliveryForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  language: string = "en";
  details: any = this._translate.instant("freeHome")
  formDetail: any = this._translate.instant("form")
  constructor(
    private _translate: TranslateService,
    public _userService: UserService
  ) {
    this.freeDeliveryForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      freeDeliveryRx: new FormControl('false'),
      notifyMethod: new FormControl(this.formDetail.option1),
    })
    this._initialiseTranslation();
  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  get f() { return this.freeDeliveryForm.controls }

  /**
   * Add Free home delivery form
   * @param {object} data 
   */
  addFreeDeliveryForm(data) {
    this.submitted = true
    if (this.freeDeliveryForm.invalid) {
      return
    }
    this.isDisable = true;
    console.log(data);
  }

  _initialiseTranslation(): void {
    this._translate.use(this.language);
    setTimeout(() => {
      console.log(this._translate.instant("freeHome"));
      this.details = this._translate.instant("freeHome");
      this.formDetail = this._translate.instant("form")

    }, 250);
  }
}
