import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-audio-maulana-bayan',
  templateUrl: './audio-maulana-bayan.component.html',
  styleUrls: ['./audio-maulana-bayan.component.css']
})
export class AudioMaulanaBayanComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  dataSourceEng: MatTableDataSource<any>;
  dataSourceUr: MatTableDataSource<any>;
  displayedEngColumns = ['MolanaBayanId', 'Title', 'Catagory', 'CountViews', 'UploadDate', 'Action'];
  displayedUrColumns = ['MolanaBayanId', 'UrTitle', 'UrCatagory', 'UrCountViews', 'UrUploadDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getMolanaBayanEng();
  }

  getMolanaBayanEng() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.fetchMolanaBayanList()
      .subscribe((data: any) => {
        this.dataSourceEng = new MatTableDataSource(data);
        this.dataSourceEng.paginator = this.paginator;
        this.dataSourceEng.sort = this.sort;
        document.getElementById('loader-wrapper-overlay').style.display = 'none';
      });
  }

  getMolanaBayanUr(event) {
    if (event.tab.textLabel === 'Molana Bayan (Urdu)') {
      document.getElementById('loader-wrapper-overlay').style.display = 'block';
      this.adminActivitiesService.fetchMolanaBayanUrList()
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

  deleteMolanaBayanById(id: number) {
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
