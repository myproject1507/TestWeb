import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-urdu-books',
  templateUrl: './urdu-books.component.html',
  styleUrls: ['./urdu-books.component.css']
})
export class UrduBooksComponent implements OnInit {

  siteUrl: any;
  @ViewChild('input') input: ElementRef;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['UrduBooksId', 'UrTitle', 'UrImagePath', 'UrUploadDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) {
    this.siteUrl = environment.siteUrl;
  }

  ngOnInit(): void {
    this.getUrduBooks();
  }

  getUrduBooks() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.fetchUrduBooksList()
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        document.getElementById('loader-wrapper-overlay').style.display = 'none';
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUrduBookById(id: number) {
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
