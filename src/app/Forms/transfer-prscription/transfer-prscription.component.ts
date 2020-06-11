import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-prscription',
  templateUrl: './transfer-prscription.component.html',
  styleUrls: ['./transfer-prscription.component.scss'],
})
export class TransferPrscriptionComponent implements OnInit {

  currentDate = new Date().toISOString();
  transferPrescriptionForm: FormGroup;
  submitted: Boolean = false;
  isDisable:Boolean = false;

  constructor() {
    console.log(this.currentDate);

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

  ngOnInit() { }

  get f() { return this.transferPrescriptionForm.controls }


  addTransferPresForm(data) {
    console.log("--")
    this.submitted = true;
    if (this.transferPrescriptionForm.invalid) {
      return
    }
    this.isDisable = true;
    console.log(data)
  }
}
