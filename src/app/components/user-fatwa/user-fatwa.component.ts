import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminActivitiesService } from 'src/app/services/admin-activities/admin-activities.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilsService } from 'src/app/services/utils/utils.service';

declare var jQuery: any;

@Component({
  selector: 'app-user-fatwa',
  templateUrl: './user-fatwa.component.html',
  styleUrls: ['./user-fatwa.component.css']
})
export class UserFatwaComponent implements OnInit {

  @ViewChild('input') input: ElementRef;
  @ViewChild('closeModal') closeModal: ElementRef;

  dataSource: MatTableDataSource<any>;
  columnNames = [
    {
      id: 'FatwaId',
      value: 'Fatwa #'
    },
    {
      id: 'UserName',
      value: 'Name'
    },
    {
      id: 'FatwaTitle',
      value: 'Title'
    },
    {
      id: 'FatwaStatus',
      value: 'Status'
    },
    {
      id: 'FatwaDate',
      value: 'Date'
    },
    {
      id: 'action',
      value: 'Action'
    },
  ];


  displayedColumns: string[] = this.columnNames.map(x => x.id);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminActivitiesService: AdminActivitiesService,
    private utilsService: UtilsService) { }

  ngOnInit(): void {
    this.getfatwaList();
  }

  getfatwaList() {
    document.getElementById('loader-wrapper-overlay').style.display = 'block';
    this.adminActivitiesService.userFatwaList()
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

  onUserFatwaSubmit() {

  }

  viewFatwa() {
    
  }

  deleteFatwaById(id: number) {
    this.utilsService.confirmAlert()
      .then(success => {
        if(success.isConfirmed) {
          
        }
      },
        error => {
          console.log('error');
        });
  }

}
