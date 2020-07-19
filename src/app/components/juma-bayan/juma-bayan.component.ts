import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-juma-bayan',
  templateUrl: './juma-bayan.component.html',
  styleUrls: ['./juma-bayan.component.css']
})
export class JumaBayanComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  dataSourceEng: MatTableDataSource<any>;
  dataSourceUr: MatTableDataSource<any>;
  displayedEngColumns = ['JumaId', 'Title', 'MolanaName', 'UploadDate', 'Action'];
  displayedUrColumns = ['JumaId', 'UrTitle', 'UrMolanaName', 'UrUploadDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getJumaBayanEng();
  }

  getJumaBayanEng() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.fetchJumaBayanList()
      .subscribe((data: any) => {
        this.dataSourceEng = new MatTableDataSource(data);
        this.dataSourceEng.paginator = this.paginator;
        this.dataSourceEng.sort = this.sort;
        document.getElementById('loader-wrapper-overlay').style.display = 'none';
      });
  }

  getJumaBayanUr(event) {
    if (event.tab.textLabel === 'Juma Bayan (Urdu)') {
      document.getElementById('loader-wrapper-overlay').style.display = 'block';
      this.adminActivitiesService.fetchJumaBayanUrList()
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

  deleteJumaBayanById(id: number) {
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
