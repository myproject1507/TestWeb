import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminAccountService } from 'src/app/services/account/admin-account.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

declare var jQuery: any;
@Component({
  selector: 'app-edit-email-id',
  templateUrl: './edit-email-id.component.html',
  styleUrls: ['./edit-email-id.component.css']
})
export class EditEmailIdComponent implements OnInit {

  tokenId: any;
  editEmailId: any;
  emailId; any;

  constructor(private adminAccountService: AdminAccountService,
    private utilsService: UtilsService) {
    this.tokenId = localStorage.getItem('LoggedInUser');
    this.emailId = localStorage.getItem('emailId');
  }

  ngOnInit(): void {
    this.editEmailId = {
      TokenId: this.tokenId,
      EmailId: this.emailId,
    };
  }

  onSubmitEditEmailId(form: NgForm) {
    jQuery('#btn-admin-emailid').attr('disabled', 'disabled');
    if (form.invalid) {
      this.visibleOriginal();
      return;
    } else {
      this.adminAccountService.editEmailId(this.editEmailId)
        .subscribe((data: any) => {
          if (data.Status === 1) {
            localStorage.setItem('emailId', this.editEmailId.EmailId);
            this.utilsService.showNotificationMessasge('top', 'right', '', 'EmailId has been changed successfully..', 'success');
            this.visibleOriginal();
          } else if (data.Status === 0) {
            this.utilsService.showNotificationMessasge('top', 'right', '', `EmailId can't change, please re-loging.`, 'info');
            this.visibleOriginal();
          } else {
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Oops ! Something wrong, please try again.', 'danger');
            this.visibleOriginal();
          }
        });
    }
  }

  visibleOriginal() {
    jQuery('#btn-admin-emailid').removeAttr('disabled');
  }

}
