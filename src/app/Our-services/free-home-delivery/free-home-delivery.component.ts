import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-free-home-delivery',
  templateUrl: './free-home-delivery.component.html',
  styleUrls: ['./free-home-delivery.component.scss'],
})
export class FreeHomeDeliveryComponent implements OnInit {

  freeDeliveryForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;

  constructor() {
    this.freeDeliveryForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      freeDeliveryRx: new FormControl('false'),
      notifyMethod: new FormControl('No Thanks'),

    })
  }

  ngOnInit() { }

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

}
