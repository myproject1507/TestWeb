import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { FormGroup } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-audio-ashaar',
  templateUrl: './audio-ashaar.component.html',
  styleUrls: ['./audio-ashaar.component.css']
})
export class AudioAshaarComponent implements OnInit {

  audioAshaarForm: FormGroup;
  @ViewChild('input') input: ElementRef;
  dataSourceEng: MatTableDataSource<any>;
  dataSourceUr: MatTableDataSource<any>;
  displayedEngColumns = ['NaatId', 'Title', 'Catagory', 'CountViews', 'UploadDate', 'Action'];
  displayedUrColumns = ['NaatId', 'UrTitle', 'UrCatagory', 'UrCountViews', 'UrUploadDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getAshaarEng();
  }

  getAshaarEng() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.fetchAshaarList()
      .subscribe((data: any) => {
        this.dataSourceEng = new MatTableDataSource(data);
        this.dataSourceEng.paginator = this.paginator;
        this.dataSourceEng.sort = this.sort;
        document.getElementById('loader-wrapper-overlay').style.display = 'none';
      });
  }

  getAshaarUr(event) {
    if (event.tab.textLabel === "Asha'ar (Urdu)") {
      document.getElementById('loader-wrapper-overlay').style.display = 'block';
      this.adminActivitiesService.FetchAshaarUrList()
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

  onSubmitAudioAshaarForm(){
    
  }

  deleteAudioAshaarById(id: number) {
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
