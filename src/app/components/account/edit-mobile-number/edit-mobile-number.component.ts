import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminAccountService } from 'src/app/services/account/admin-account.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

declare var jQuery: any;
@Component({
  selector: 'app-edit-mobile-number',
  templateUrl: './edit-mobile-number.component.html',
  styleUrls: ['./edit-mobile-number.component.css']
})
export class EditMobileNumberComponent implements OnInit {

  tokenId: any;
  editMobileNo: any;
  mobileNo: any;

  constructor(private adminAccountService: AdminAccountService,
              private utilsService: UtilsService) {
    this.tokenId = localStorage.getItem('LoggedInUser');
    this.mobileNo = localStorage.getItem('mobileNo');
  }

  ngOnInit(): void {
    this.editMobileNo = {
      TokenId: this.tokenId,
      MobileNo: this.mobileNo,
    };
  }

  onSubmitEditMobileNo(form: NgForm) {
    jQuery('#btn-admin-mobileNo').attr('disabled', 'disabled');
    if (form.invalid) {
      this.visibleOriginal();
      return;
    } else {
      this.adminAccountService.editMobileNo(this.editMobileNo)
        .subscribe((data: any) => {
          if (data.Status === 1) {
            localStorage.setItem('mobileNo', this.editMobileNo.MobileNo);
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Mobile Number has been changed successfully..', 'success');
            this.visibleOriginal();
          } else if (data.Status === 0) {
            this.utilsService.showNotificationMessasge('top', 'right', '', `Mobile Number can't change, please re-loging.`, 'info');
            this.visibleOriginal();
          } else {
            this.utilsService.showNotificationMessasge('top', 'right', '', 'Oops ! Something wrong, please try again.', 'danger');
            this.visibleOriginal();
          }
        });
    }
  }

  visibleOriginal() {
    jQuery('#btn-admin-mobileNo').removeAttr('disabled');
  }
}
