import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-latest-books',
  templateUrl: './latest-books.component.html',
  styleUrls: ['./latest-books.component.css']
})
export class LatestBooksComponent implements OnInit {

  siteUrl: any;
  @ViewChild('input') input: ElementRef;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['LatestBooksId', 'UrTitle', 'UrImagePath', 'UploadDate', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) { 
    this.siteUrl = environment.siteUrl;
  }

  ngOnInit(): void {
    this.getLatestBooks();
  }

  getLatestBooks() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.fetchLatestBooksList()
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

  deleteLatestBookById(id: number) {
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
