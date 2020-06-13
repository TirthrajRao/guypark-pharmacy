import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.scss'],
})
export class EmploymentComponent implements OnInit {

  fileName: any;
  files: any;
  employmentForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  language: string = "en";
  details: any = this._translate.instant("employment");
  formDetail: any = this._translate.instant("form");


  constructor(
    private _translate: TranslateService,
    public _userService: UserService
  ) {
    this._initialiseTranslation();

    this.employmentForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      position: new FormControl(''),
      message: new FormControl(''),
    })

  }

  ngOnInit() { 
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  get f() { return this.employmentForm.controls }

  /**
   * Select resume file
   */
  selectFile(e) {
    console.log(e.target.files);
    this.files = e.target.files[0];
    this.fileName = this.files.name;
  }

  /**
   * add employement form
   * @param {object} data 
   */
  addEmploymentForm(data) {
    this.submitted = true;
    if (this.employmentForm.invalid) {
      return
    }
    this.isDisable = true;
    console.log(data);
  }

  /**
   * Change language
   */
  _initialiseTranslation(): void {
    this._translate.use(this.language);
    setTimeout(() => {
      console.log(this._translate.instant("employment"));
      this.details = this._translate.instant("employment");
      this.formDetail = this._translate.instant("form");
    }, 250);
  }
}
