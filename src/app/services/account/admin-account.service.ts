import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAccountService {

  rootUrl: any;
  constructor(private httpClient: HttpClient) {
    this.rootUrl = environment.apiUrl;
   }

  adminLogin(data: any) {
    debugger;
    return this.httpClient.post(this.rootUrl + 'api/adminAccount/adminLogin', data);
  }

  adminForgotPassword(data: any) {
    return this.httpClient.post(this.rootUrl + 'api/adminAccount/adminForgotPassword', data);
  }

  adminChangePassword(data: any) {
    return this.httpClient.post(this.rootUrl + 'api/adminAccount/adminChangePassword', data);
  }

  editDisplayName(data: any) {
    return this.httpClient.post(this.rootUrl + 'api/adminAccount/editDisplayName', data);
  }
  editUserName(data: any) {
    return this.httpClient.post(this.rootUrl + 'api/adminAccount/editUserName', data);
  }
  editEmailId(data: any) {
    return this.httpClient.post(this.rootUrl + 'api/adminAccount/editEmailId', data);
  }
  editMobileNo(data: any) {
    return this.httpClient.post(this.rootUrl + 'api/adminAccount/editMobileNo', data);
  }
}
