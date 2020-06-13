import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-price-check',
  templateUrl: './price-check.component.html',
  styleUrls: ['./price-check.component.scss'],
})
export class PriceCheckComponent implements OnInit {

  priceCheckForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  formDetail: any = this._translate.instant("form");
  language: string = "en";

  constructor(
    private _translate: TranslateService,
    public _userService: UserService
  ) {
    this.priceCheckForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      medicine_name_1: new FormControl(''),
      medicine_1_strength: new FormControl(''),
      madicine_1_quantity: new FormControl(''),
      medicine_name_2: new FormControl(''),
      medicine_2_strength: new FormControl(''),
      madicine_2_quantity: new FormControl(''),
      medicine_name_3: new FormControl(''),
      medicine_3_strength: new FormControl(''),
      madicine_3_quantity: new FormControl(''),
      medicine_name_4: new FormControl(''),
      medicine_4_strength: new FormControl(''),
      madicine_4_quantity: new FormControl(''),
      medicine_name_5: new FormControl(''),
      medicine_5_strength: new FormControl(''),
      madicine_5_quantity: new FormControl(''),
      note_to_pharmacy: new FormControl('')
    })
  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  get f() { return this.priceCheckForm.controls }

  /**
   * Add Price Check Form
   * @param {object} data 
   */
  addPriceForm(data) {
    this.submitted = true;
    if (this.priceCheckForm.invalid) {
      return
    }
    this.isDisable = true;
    console.log(data);
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
