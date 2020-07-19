import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminAccountService } from 'src/app/services/account/admin-account.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

declare var jQuery: any;
@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html',
  styleUrls: ['./edit-name.component.css']
})
export class EditNameComponent implements OnInit {

  tokenId: any;
  editName: any;
  displayName: any;

  constructor(private adminAccountService: AdminAccountService,
              private utilsService: UtilsService) {
    this.tokenId = localStorage.getItem('LoggedInUser');
    this.displayName = localStorage.getItem('displayName');
  }

  ngOnInit(): void {
    this.editName = {
      TokenId: this.tokenId,
      DisplayName: this.displayName,
    };
  }

  onSubmitEditName(form: NgForm) {
    jQuery('#btn-admin-name').attr('disabled', 'disabled');
    if (form.invalid) {
      this.visibleOriginal();
      return;
    } else {
      this.adminAccountService.editDisplayName(this.editName)
        .subscribe((data: any) => {
          if (data.Status === 1) {
            localStorage.setItem('displayName', this.editName.DisplayName);
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Display name has been changed successfully..', 'success');
            this.visibleOriginal();
          } else if (data.Status === 0) {
            this.utilsService.showNotificationMessasge('top', 'right', '', `Display name can't change, please re-loging.`, 'info');
            this.visibleOriginal();
          } else {
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Oops ! Something wrong, please try again.', 'danger');
            this.visibleOriginal();
          }
        });
    }
  }

  visibleOriginal() {
    jQuery('#btn-admin-name').removeAttr('disabled');
  }
}
