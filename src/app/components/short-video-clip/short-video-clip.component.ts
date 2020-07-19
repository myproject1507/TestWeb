import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-short-video-clip',
  templateUrl: './short-video-clip.component.html',
  styleUrls: ['./short-video-clip.component.css']
})
export class ShortVideoClipComponent implements OnInit {

  siteUrl: any;
  @ViewChild('input') input: ElementRef;
  dataSourceEng: MatTableDataSource<any>;
  dataSourceUr: MatTableDataSource<any>;
  displayedEngColumns = ['ClipId', 'Title', 'MolanaName', 'Descriptions', 'ImagePath', 'CountViews', 'UploadDate', 'Action'];
  displayedUrColumns = ['ClipId', 'UrTitle', 'UrMolanaName', 'UrDescriptions', 'UrImagePath', 'UrCountViews', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) {
    this.siteUrl = environment.siteUrl;
   }

  ngOnInit(): void {
    this.getShortClipEng();
  }

  getShortClipEng() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.fetchShortClipList()
      .subscribe((data: any) => {
        this.dataSourceEng = new MatTableDataSource(data);
        this.dataSourceEng.paginator = this.paginator;
        this.dataSourceEng.sort = this.sort;
        document.getElementById('loader-wrapper-overlay').style.display = 'none';
      });
  }

  getShortClipUr(event) {
    if (event.tab.textLabel === "Short Clip (Urdu)") {
      document.getElementById('loader-wrapper-overlay').style.display = 'block';
      this.adminActivitiesService.fetchShortClipUrList()
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

  deleteShortClipById(id: number) {
    this.utilsService.confirmAlert()
      .then(success => {
        if (success.isConfirmed){
          
        }
      },
        error => {
          console.log('error');
        });
  }
}
