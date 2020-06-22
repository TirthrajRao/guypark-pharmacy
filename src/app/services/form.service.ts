import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    public http: HttpClient
  ) { }

  /**
   * Add transfer form
   * @param {object} data 
   */
  addTransferForm(data) {
    return this.http.post(config.baseApiUrl + 'trans_pre/create', data)
  }

  /**
   * Add Refill form
   * @param {object} data
   */
  addRefillForm(data) {
    return this.http.post(config.baseApiUrl + 'refill_request/create', data)
  }

  /**
   * Add Price check form
   * @param {object} data 
   */
  addPriceCheckForm(data) {
    return this.http.post(config.baseApiUrl + 'price_check/create', data);
  }

  /**
   * Add employment Form
   * @param {object} data 
   */
  addEmploymentForm(data){
    return this.http.post(config.baseApiUrl + 'employment/create', data);
  }

  /**
   * Add free delivery form
   * @param {object} data 
   */
  addFreeDeliveryForm(data){
    return this.http.post(config.baseApiUrl + 'home_delivery/create', data);
  }
}
