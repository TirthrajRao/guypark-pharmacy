import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-transfer-prscription',
  templateUrl: './transfer-prscription.component.html',
  styleUrls: ['./transfer-prscription.component.scss'],
})
export class TransferPrscriptionComponent implements OnInit {

  curruntDate: string = new Date().toISOString();
  nextYear: any;
  transferPrescriptionForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  formDetail: any = this._translate.instant("form");
  language: string = "en";

  constructor(
    private _translate: TranslateService,
    public _userService: UserService
  ) {
    
    this.nextYearCount();

    this.transferPrescriptionForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      birthDate: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl(''),
      pharmacyName: new FormControl(''),
      pharmacyPhoneNo: new FormControl(''),
      address: new FormControl(''),
      refillRemnder: new FormControl(''),
      rx1MedName: new FormControl(''),
      rx1: new FormControl(''),
      rx2MedName: new FormControl(''),
      rx2: new FormControl(''),
      rx3MedName: new FormControl(''),
      rx3: new FormControl(''),
      rx4MedName: new FormControl(''),
      rx4: new FormControl(''),
      rx5MedName: new FormControl(''),
      rx5: new FormControl(''),
      rx6MedName: new FormControl(''),
      rx6: new FormControl(''),
      rx7MedName: new FormControl(''),
      rx7: new FormControl(''),
      rx8MedName: new FormControl(''),
      rx8: new FormControl(''),
      rx9MedName: new FormControl(''),
      rx9: new FormControl(''),
      rx10MedName: new FormControl(''),
      rx10: new FormControl(''),
    })
  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  get f() { return this.transferPrescriptionForm.controls }

  // Count next 25 year for date
  nextYearCount() {
    this.nextYear = this.curruntDate.split("-")[0];
    this.nextYear = this.nextYear++;
    this.nextYear = this.nextYear + +25;
  }

  /**
   * Add transfer form
   * @param {object} data 
   */
  addTransferPresForm(data) {
    console.log("--")
    this.submitted = true;
    if (this.transferPrescriptionForm.invalid) {
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
