import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent implements OnInit {

  formList: any = [];
  constructor() {
    this.formList = [
      {
        name: 'Transfer Prescription',
        url: '/home/transfer-prescription'
      },
      {
        name: 'Refill Request',
        url: '/home/refill-request'
      },
      {
        name: 'Price Check',
        url: '/home/price-check'
      },
      // {
      //   name: 'Employment',
      //   url: '/home/employment'
      // }
    ]
  }

  ngOnInit() { }

}
