import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminAccountService } from 'src/app/services/account/admin-account.service';
import { AdminAuthService } from 'src/app/services/auth/admin-auth/admin-auth.service';
import { AccountModel } from 'src/app/models/account-model';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils/utils.service';

declare var jQuery: any;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  formAdminLogin: FormGroup;
  accountModel: AccountModel;
  loginStatus = true;
  pleaseWait = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminAccountService: AdminAccountService,
    private adminAuthService: AdminAuthService,
    private router: Router,
    private utilsService: UtilsService) {
    this.accountModel = new AccountModel();
  }

  ngOnInit(): void {
    this.formAdminLogin = this.formBuilder.group({
      EmailOrMobileOrUserName: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  onSubmitAdminLogin() {
    debugger;
    this.submitted = true;
    this.loginStatus = false;
    this.pleaseWait = true;
    jQuery('#btn-admin-login').attr('disabled', 'disabled');
    if (this.formAdminLogin.invalid) {
      this.visibleOriginal();
      return;
    }
    this.accountModel.userName = this.formAdminLogin.controls.EmailOrMobileOrUserName.value;
    this.accountModel.password = this.formAdminLogin.controls.Password.value;
    this.adminAccountService.adminLogin(this.accountModel)
      .subscribe((data: any) => {
        if (data.Status === 1) {
          this.adminAuthService.sendToken(data.TokenId, data.EmailId, data.DisplayName, data.UserName, data.MobileNo);
          this.visibleOriginal();
          this.router.navigate(['/dashboard']);
        } else if (data.Status === 0) {
          this.utilsService.showNotificationMessasge('top', 'right', '', 'Please enter correct credentials.', 'warning');
          this.visibleOriginal();
        } else {
          this.utilsService.showNotificationMessasge('top', 'right', '', 'Oops ! Something is wrong, please try again later.', 'danger');
          this.visibleOriginal();
        }
      });
  }

  visibleOriginal() {
    this.loginStatus = true;
    this.pleaseWait = false;
    jQuery('#btn-admin-login').removeAttr('disabled');
  }

}
