import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminAccountService } from 'src/app/services/account/admin-account.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

declare var jQuery: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  formAdminForgotPassword: FormGroup;
  getPassword = true;
  pleaseWait = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private adminAccountService: AdminAccountService) {
  }

  ngOnInit(): void {
    this.formAdminForgotPassword = this.formBuilder.group({
      EmailId: ['', [Validators.required, Validators.pattern('^([\\w\\.\\-]+)@([\\w\\-]+)((\\.(\\w){2,3})+)$')]]
    });
  }

  onSubmitAdminForgotPassword() {
    this.submitted = true;
    jQuery('#btn-admin-forgot').attr('disabled', 'disabled');
    this.getPassword = false;
    this.pleaseWait = true;
    if (this.formAdminForgotPassword.invalid) {
      this.visibleOriginal();
      return;
    }
    this.adminAccountService.adminForgotPassword(this.formAdminForgotPassword.value)
      .subscribe((data: any) => {
        if (data.Status === 1) {
          // tslint:disable-next-line: max-line-length
          this.utilsService.showNotificationMessasge('top', 'right', '', `Your password is sent to ` + this.formAdminForgotPassword.controls.EmailId.value + ' email id, please check it.', 'success');
          this.visibleOriginal();
        } else if (data.Status === 0) {
          this.utilsService.showNotificationMessasge('top', 'right', '', 'Sorry ! This email id not registered.', 'info');
          this.visibleOriginal();
        } else if (data.Status === -2) {
          this.utilsService.showNotificationMessasge('top', 'right', '', 'Sorry ! Some problem occured, please again.', 'danger');
          this.visibleOriginal();
        } else {
          this.utilsService.showNotificationMessasge('top', 'right', '', 'Oops ! Something is wrong, please try again later.', 'danger');
          this.visibleOriginal();
        }
      });
  }

  visibleOriginal() {
    this.getPassword = true;
    this.pleaseWait = false;
    jQuery('#btn-admin-forgot').removeAttr('disabled');
  }

}

