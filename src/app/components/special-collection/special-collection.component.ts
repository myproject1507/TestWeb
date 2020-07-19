import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-special-collection',
  templateUrl: './special-collection.component.html',
  styleUrls: ['./special-collection.component.css']
})
export class SpecialCollectionComponent implements OnInit {

  siteUrl: any;
  @ViewChild('input') input: ElementRef;
  dataSourceEng: MatTableDataSource<any>;
  dataSourceUr: MatTableDataSource<any>;
  displayedEngColumns = ['CollectionlId', 'Title', 'Category', 'ImageIcon', 'ImgPath', 'UploadDate', 'Action'];
  displayedUrColumns = ['CollectionlId', 'UrTitle', 'UrCategory', 'UrImageIcon', 'UrImgPath', 'UrUploadDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) {
    this.siteUrl = environment.siteUrl;
  }

  ngOnInit(): void {
    this.getSpecialCollectionEng();
  }

  getSpecialCollectionEng() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.fetchSpecialCollectionList()
      .subscribe((data: any) => {
        this.dataSourceEng = new MatTableDataSource(data);
        this.dataSourceEng.paginator = this.paginator;
        this.dataSourceEng.sort = this.sort;
        document.getElementById('loader-wrapper-overlay').style.display = 'none';
      });
  }

  getSpecialCollectionUr(event) {
    if (event.tab.textLabel === 'Special Collection (Urdu)') {
      document.getElementById('loader-wrapper-overlay').style.display = 'block';
      this.adminActivitiesService.fetchSpecialCollectionUrList()
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

  deleteSpecialCollectionById(id: number) {
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
