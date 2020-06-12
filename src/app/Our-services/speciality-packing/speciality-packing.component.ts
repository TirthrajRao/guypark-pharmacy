import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-speciality-packing',
  templateUrl: './speciality-packing.component.html',
  styleUrls: ['./speciality-packing.component.scss'],
})
export class SpecialityPackingComponent implements OnInit {

  language: string = "en";
  details: any = this._translate.instant("speciality")

  constructor(
    private _translate: TranslateService,
    public _userService: UserService
  ) {
    this._initialiseTranslation();
  }

  ngOnInit() {
    this._userService.languageChanges().subscribe((res: any) => {
      console.log("RESPONSE", res);
      this.language = res.language
      this._initialiseTranslation();
    })
  }

  _initialiseTranslation(): void {
    this._translate.use(this.language);
    setTimeout(() => {
      console.log(this._translate.instant("speciality"));
      this.details = this._translate.instant("speciality");
    }, 250);
  }
}
