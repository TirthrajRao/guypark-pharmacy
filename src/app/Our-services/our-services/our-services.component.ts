import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.scss'],
})
export class OurServicesComponent implements OnInit {

  allServices: any;
  constructor() {
    this.allServices = [
      {
        name: 'We offer free delivery',
        image: 'assets/images/free-delivery.png',
        content: "We assure you round-the-clock services along with providing you auto refills as and when your medicine supply draws to a close.",
        url: "/home/free-home-delivery"
      },
      {
        name: 'Accept E-scribe',
        image: 'assets/images/e-scribe.png',
        content: "E-Prescribing supports a shift to a paperless for prescribers, payers and pharmacists to make better medication management decisions.",
        url: "/home/e-scribe"
      },
      {
        name: 'Curbside delivery',
        image: 'assets/images/crubside.png',
        content: "Curbside delivery to prevent our patients from potential exposure to illness and reduce the number of people visiting our campus.",
        url: "/home/curb-side"
      },
      {
        name: 'We offer speciality packing show with picture dose packs',
        image: 'assets/images/offer.png',
        content: "The top of each individual blister pack lists the person's name, the medication within and the time it should be taken.",
        url: "/home/speciality-packing"
      },
      {
        name: '$4.99 Generic Drug Plan',
        image: 'assets/images/generic.png',
        content: "Our generic drug plan is to ensure that you get your medication in a less expensive way without compromising the quality of the medications.",
        url: "/home/generic-drug"
      },
      {
        name: 'Accept All Major Insurance Plans',
        image: 'assets/images/major.png',
        content: "Jax Pharmacy accepts all major insurance plans. We will also match our local competitors’ prices so you can definitely get the highest value for the least amount of money you are willing to pay!",
        url: "/home/major-insurance"
      }
    ]
  }

  ngOnInit() { }

}
