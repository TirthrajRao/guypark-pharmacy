import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notificationList: any = [];
  colors = ['first', 'second', 'third', 'fourth'];
  lastImage: any;
  constructor() {
    this.notificationList = [
      {
        title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
        message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
      },
      {
        title: "80% Discount on Generic Products",
        message: "Grab The Discount Before goes away."
      },
      {
        title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
        message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
      },
      {
        title: "80% Discount on Generic Products",
        message: "Grab The Discount Before goes away."
      },
      {
        title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
        message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
      },
      {
        title: "80% Discount on Generic Products",
        message: "Grab The Discount Before goes away."
      },
      {
        title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
        message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
      },
      {
        title: "80% Discount on Generic Products",
        message: "Grab The Discount Before goes away."
      },
      {
        title: "We Offer free Delivery On Purchase of 100$ Drugs & Medicine Dose.",
        message: "Cashout For 100$ cashback worth coupons Cashout For 100$ cashback worth coupons"
      },
      {
        title: "80% Discount on Generic Products",
        message: "Grab The Discount Before goes away."
      },
    ]
  }

  ngOnInit() {
    this.notificationList.map((notification, index) => {
      console.log(index)
      var rand:any = this.colors[ Math.floor(Math.random() * this.colors.length)];
      rand = index % this.colors.length;
      console.log(rand)
      this.lastImage = rand;
      notification['color'] = this.colors[rand];
      return notification;
    });
  }

}
