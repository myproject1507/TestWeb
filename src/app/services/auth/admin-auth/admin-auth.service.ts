import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(
    private router: Router
  ) { }

  sendToken(token: string, emailId: string, displayName: string, userName: string, mobileNo: string) {
    localStorage.setItem('LoggedInUser', token);
    localStorage.setItem('emailId', emailId);
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('userName', userName);
    localStorage.setItem('mobileNo', mobileNo);
  }

  getToken() {
    return localStorage.getItem('LoggedInUser');
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('LoggedInUser');
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
