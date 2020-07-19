import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {

  strLenght: number;
  fullMessage: any;

  @ViewChild('input') input: ElementRef;
  dataSource: MatTableDataSource<any>;
  columnNames = [
    {
      id: 'FeedbackId',
      value: 'Id'
    },
    {
      id: 'Name',
      value: 'Name'
    },
    {
      id: 'Location',
      value: 'Location'
    },
    {
      id: 'EmailId',
      value: 'EmailId'
    },
    {
      id: 'OpinionOrMessage',
      value: 'Opinion/Message'
    },
    {
      id: 'Date',
      value: 'Date'
    },
    {
      id: 'action',
      value: 'Delete'
    },
  ];


  displayedColumns: string[] = this.columnNames.map(x => x.id);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getUserFeedbackList();
  }

  getUserFeedbackList() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.userFeedbackList()
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

  deleteFeedbackById(id: number) {
    this.utilsService.confirmAlert()
      .then(success => {
        if (success.isConfirmed)
          alert('Record deleted successfully.');
      },
        error => {
          console.log('error');
        });
  }

  readMoreMessage(msg: any) {
    if (msg.length >= 56)
      return true;
    else
      return false;
  }

  getMessage(msg: any) {
    return msg.substring(0, 55);
  }

  displayFullMessage(msg: any) {
    this.fullMessage = msg;
  }
}
