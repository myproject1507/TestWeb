import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-live-bayan-timer-setting',
  templateUrl: './live-bayan-timer-setting.component.html',
  styleUrls: ['./live-bayan-timer-setting.component.css']
})
export class LiveBayanTimerSettingComponent implements OnInit {

  siteUrl: any;
  saveUpdateButton: any;
  liveBayanTimerForm: FormGroup;
  submitted = false;

  @ViewChild('input') input: ElementRef;
  dataSourceEng: MatTableDataSource<any>;
  dataSourceUr: MatTableDataSource<any>;
  displayedEngColumns = ['TimerId', 'Heading', 'Title', 'MolanaName', 'TimerValue', 'UploadDate', 'Action'];
  displayedUrColumns = ['TimerId', 'UrHeading', 'UrTitle', 'UrMolanaName', 'UrTimerValue', 'UploadDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService,
    private formBuilder: FormBuilder) {
    this.siteUrl = environment.siteUrl;
  }

  ngOnInit(): void {

    this.liveBayanTimerForm = this.formBuilder.group({
      TimerId: [0],
      Title: [''],
      Heading: ['',  Validators.required],
      TimerValue: [''],
      Month: [''],
      Date: [''],
      Year: [''],
      Hours: [''],
      Minutes: [''],
      Seconds: [''],
      UrTitle: [''],
      UrHeading: [''],
      MolanaName: [''],
      UrMolanaName: [''],
      UrMolanaNameImgUrl: [''],
      MolanaNameImgUrl: [''],
    });

    this.getLiveBayanTimer();
  }

  getLiveBayanTimer() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.changeTimerSettingList()
      .subscribe((data: any) => {
        this.dataSourceEng = new MatTableDataSource(data);
        this.dataSourceEng.paginator = this.paginator;
        this.dataSourceEng.sort = this.sort;
        document.getElementById('loader-wrapper-overlay').style.display = 'none';
      });
  }

  getLiveBayanTimerUr(event) {
    if (event.tab.textLabel === "Timer Setting (Urdu)") {
      document.getElementById('loader-wrapper-overlay').style.display = 'block';
      this.adminActivitiesService.changeTimerSettingUrList()
        .subscribe((data: any) => {
          this.dataSourceUr = new MatTableDataSource(data);
          this.dataSourceUr.paginator = this.paginator;
          this.dataSourceUr.sort = this.sort;
          document.getElementById('loader-wrapper-overlay').style.display = 'none';
        });
    }
  }

  applyFilterForEng(filterValue: string) {
    this.dataSourceEng.filter = filterValue.trim().toLowerCase();
  }

  applyFilterForUr(filterValue: string) {
    this.dataSourceUr.filter = filterValue.trim().toLowerCase();
  }

  addLiveBayanTimer() {
    this.saveUpdateButton = 'Save';
  }

  editLiveBayanTimer() {
    this.saveUpdateButton = 'Update';
  }

  deleteLiveBayanTimerById(id: number) {
    this.utilsService.confirmAlert()
      .then(success => {
        if (success.isConfirmed) {
          this.adminActivitiesService.deleteTimerSetting(id)
            .subscribe((result: any) => {
              if (result.Status == "1") {
                this.utilsService.showNotificationMessasge('top', 'right', '', 'Record deleted successfully.', 'success');
              } else if (result.Status == "0") {
                this.utilsService.showNotificationMessasge('top', 'right', '', 'Sorry ! record not deleted successfully.', 'danger');
              } else if (result.Status == "-1") {
                this.utilsService.showNotificationMessasge('top', 'right', '', 'Oops ! Some thing is wrong, please try again.', 'danger');
              }
            });
        }
      },
        error => {
          console.log('error');
        });
  }

  onLiveBayanTimer() {
    this.submitted = true;
    if(this.liveBayanTimerForm.invalid)
      return;
    this.adminActivitiesService.addEditTimerSetting(this.liveBayanTimerForm.value)
      .subscribe((result: any) => {
        if (result.Status == "1") {
          this.utilsService.showNotificationMessasge('top', 'right', '', 'Record deleted successfully.', 'success');
        } else {
          this.utilsService.showNotificationMessasge('top', 'right', '', 'Sorry ! record not deleted successfully.', 'danger');
        } 
      });
  }

  fileChangeUr(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.liveBayanTimerForm.patchValue({ UrMolanaNameImgUrl: file });
    }
  }

  fileChangeEng(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.liveBayanTimerForm.patchValue({ MolanaNameImgUrl: file });
    }
  }

}

