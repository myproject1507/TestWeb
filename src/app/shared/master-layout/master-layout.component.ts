import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from 'src/app/services/auth/admin-auth/admin-auth.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  displayName: any;

  constructor(
    private adminAuthService: AdminAuthService
  ) { }

  ngOnInit(): void {
    this.displayName = localStorage.getItem('displayName');
  }

  signOut() {
    this.adminAuthService.logout();
  }
}
