import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-madarsa-time-setting',
  templateUrl: './madarsa-time-setting.component.html',
  styleUrls: ['./madarsa-time-setting.component.css']
})
export class MadarsaTimeSettingComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  dataSourceEng: MatTableDataSource<any>;
  dataSourceUr: MatTableDataSource<any>;
  displayedEngColumns = ['MadarsaId', 'Session1', 'Session2', 'Session3', 'UploadDate', 'Action'];
  displayedUrColumns = ['MadarsaId', 'UrSession1', 'UrSession2', 'UrSession3', 'UrUploadDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getMadarsaTimingEng();
  }

  getMadarsaTimingEng() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.fetchMadarsaTimingList()
      .subscribe((data: any) => {
        this.dataSourceEng = new MatTableDataSource(data);
        this.dataSourceEng.paginator = this.paginator;
        this.dataSourceEng.sort = this.sort;
        document.getElementById('loader-wrapper-overlay').style.display = 'none';
      });
  }

  getMadarsaTimingUr(event) {
    if (event.tab.textLabel === "Madarsa Timing (Urdu)") {
      document.getElementById('loader-wrapper-overlay').style.display = 'block';
      this.adminActivitiesService.fetchMadarsaTimingUrList()
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

  deleteMadarsaTimingById(id: number) {
    this.utilsService.confirmAlert()
      .then(success => {
        if (success.isConfirmed) {
          
        }
      },
        error => {
          console.log('error');
        });
  }
}
