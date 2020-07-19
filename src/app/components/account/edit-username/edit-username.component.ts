import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AdminAccountService } from 'src/app/services/account/admin-account.service';

declare var jQuery: any;
@Component({
  selector: 'app-edit-username',
  templateUrl: './edit-username.component.html',
  styleUrls: ['./edit-username.component.css']
})
export class EditUsernameComponent implements OnInit {

  tokenId: any;
  editUserName: any;
  userName: any;

  constructor(private adminAccountService: AdminAccountService,
              private utilsService: UtilsService) {
    this.tokenId = localStorage.getItem('LoggedInUser');
    this.userName = localStorage.getItem('userName');
  }

  ngOnInit(): void {
    this.editUserName = {
      TokenId: this.tokenId,
      UserName: this.userName,
    };
  }

  onSubmitEditUserName(form: NgForm) {
    jQuery('#btn-admin-username').attr('disabled', 'disabled');
    if (form.invalid) {
      this.visibleOriginal();
      return;
    } else {
      this.adminAccountService.editUserName(this.editUserName)
        .subscribe((data: any) => {
          if (data.Status === 1) {
            localStorage.setItem('userName', this.editUserName.UserName);
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Username has been changed successfully..', 'success');
            this.visibleOriginal();
          } else if (data.Status === 0) {
            this.utilsService.showNotificationMessasge('top', 'right', '', `Username can't change, please re-loging.`, 'info');
            this.visibleOriginal();
          } else {
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Oops ! Something wrong, please try again.', 'danger');
            this.visibleOriginal();
          }
        });
    }
  }

  visibleOriginal() {
    jQuery('#btn-admin-username').removeAttr('disabled');
  }
}
