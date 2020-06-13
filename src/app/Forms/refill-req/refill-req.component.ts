import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-refill-req',
  templateUrl: './refill-req.component.html',
  styleUrls: ['./refill-req.component.scss'],
})
export class RefillReqComponent implements OnInit {

  curruntDate: string = new Date().toISOString();
  nextYear: any;
  refillReqForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  formDetail: any = this._translate.instant("form");
  language: string = "en";


  constructor(
    private _translate: TranslateService,
    public _userService: UserService
  ) {
    this.nextYearCount();

    this.refillReqForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      birthDate: new FormControl(''),
      pickUpDate: new FormControl(''),
      pickUpTime: new FormControl(''),
      deliveryMethod: new FormControl(''),
      refillRemnder: new FormControl(''),
      rx1: new FormControl(''),
      rx2: new FormControl(''),
      rx3: new FormControl(''),
      rx4: new FormControl(''),
      rx5: new FormControl(''),
      rx6: new FormControl(''),
      rx7: new FormControl(''),
      rx8: new FormControl(''),
      rx9: new FormControl(''),
      rx10: new FormControl(''),
      rx11: new FormControl(''),
      rx12: new FormControl(''),

    })
  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  get f() {
    return this.refillReqForm.controls
  }

  // Count next 25 year for date
  nextYearCount() {
    this.nextYear = this.curruntDate.split("-")[0];
    this.nextYear = this.nextYear++;
    this.nextYear = this.nextYear + +25;
  }

  /**
   * Add refill req form
   * @param {object} data 
   */
  addRefillReq(data) {
    this.submitted = true;
    if (this.refillReqForm.invalid) {
      return
    }
    this.isDisable = true;
    console.log(data)
  }

  /**
   * change and detect language
   */
  _initialiseTranslation(): void {
    this._translate.use(this.language);
    setTimeout(() => {
      this.formDetail = this._translate.instant("form")
    }, 250);
  }
}
