import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() {

    this.employmentForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      position: new FormControl(''),
      message: new FormControl(''),
    })

  }

  ngOnInit() { }

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
}
