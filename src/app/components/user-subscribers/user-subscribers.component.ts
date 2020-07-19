import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-user-subscribers',
  templateUrl: './user-subscribers.component.html',
  styleUrls: ['./user-subscribers.component.css']
})
export class UserSubscribersComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['SubscriberId', 'Name', 'EmailId', 'Date', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getUserSubscriber();
  }

  getUserSubscriber() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.userSubsciberList()
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

  deleteUserSubscriberById(id: number) {
    this.utilsService.confirmAlert()
      .then(success => {
        if (success.isConfirmed)
          alert('Record deleted successfully.');
      },
        error => {
          console.log('error');
        });
  }

}
