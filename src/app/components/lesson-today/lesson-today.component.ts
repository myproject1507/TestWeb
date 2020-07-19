import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-lesson-today',
  templateUrl: './lesson-today.component.html',
  styleUrls: ['./lesson-today.component.css']
})
export class LessonTodayComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  dataSourceEng: MatTableDataSource<any>;
  dataSourceUr: MatTableDataSource<any>;
  displayedEngColumns = ['LessonId', 'OneIslamiAqeeda', 'OneFarzOrWajib', 'OneSunnah',
    'OneMajorSin', 'OneLossOfSins', 'UploadDate', 'Action'];
  displayedUrColumns = ['LessonId', 'UrOneIslamiAqeeda', 'UrOneFarzOrWajib', 'UrOneSunnah',
    'UrOneMajorSin', 'UrOneLossOfSins', 'UploadDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getLessonOfTheDayEng();
  }

  getLessonOfTheDayEng() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.fetchTodaysLessonList()
      .subscribe((data: any) => {
        this.dataSourceEng = new MatTableDataSource(data);
        this.dataSourceEng.paginator = this.paginator;
        this.dataSourceEng.sort = this.sort;
        document.getElementById('loader-wrapper-overlay').style.display = 'none';
      });
  }

  getLessonOfTheDayUr(event) {
    if (event.tab.textLabel === 'Lesson of the Day (Urdu)') {
      document.getElementById('loader-wrapper-overlay').style.display = 'block';
      this.adminActivitiesService.fetchTodaysLessonUrList()
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

  deleteLessonToday(id: number) {
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
