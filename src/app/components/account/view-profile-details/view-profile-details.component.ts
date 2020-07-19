import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile-details',
  templateUrl: './view-profile-details.component.html',
  styleUrls: ['./view-profile-details.component.css']
})
export class ViewProfileDetailsComponent implements OnInit {

  viewProfile: any;

  constructor() { }

  ngOnInit(): void {
    this.viewProfile = {
      DisplayName: localStorage.getItem('displayName'),
      EmailId: localStorage.getItem('emailId'),
      MobileNumber: localStorage.getItem('mobileNo'),
      UserName: localStorage.getItem('userName')
    };
  }

}
