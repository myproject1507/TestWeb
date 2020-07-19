import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminAccountService } from 'src/app/services/account/admin-account.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

declare var jQuery: any;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassword: any;
  tokenId: any;
  constructor(
    private adminAccountService: AdminAccountService,
    private utilsService: UtilsService
  ) {
    this.tokenId = localStorage.getItem('LoggedInUser');
  }

  ngOnInit(): void {
    this.changePassword = {
      TokenId: this.tokenId,
      OldPassword: '',
      NewPassword: '',
      RePassword: ''
    };
  }

  onSubmitChangePassword(form: NgForm) {
    jQuery('#btn-admin-login').attr('disabled', 'disabled');
    if (form.invalid) {
      this.visibleOriginal();
      return;
    }
    else {
      this.adminAccountService.adminChangePassword(this.changePassword)
        .subscribe((data: any) => {
          if (data.Status === 1) {
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Password has been changed successfully..', 'success');
            this.visibleOriginal();
          } else if (data.Status === -2) {
            this.utilsService.showNotificationMessasge('top', 'right', '', `Password can't change, please re-loging.`, 'info');
            this.visibleOriginal();
          } else if (data.Status === 0) {
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Please enter correct existing password.', 'warning');
            this.visibleOriginal();
          } else {
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Oops ! Something wrong, please try again.', 'danger');
            this.visibleOriginal();
          }
        });
    }
  }

  visibleOriginal() {
    jQuery('#btn-admin-login').removeAttr('disabled');
  }
}
