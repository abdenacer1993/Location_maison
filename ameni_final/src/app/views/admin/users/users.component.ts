
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "ID",
    "name",
    "Email",
    "Telephone",
    "Role",
    "Prof",
    "Adresse",
    "action",
  ];

  dataSource: MatTableDataSource<any>; // Update the type parameter to 'any'
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  rowData: any = [];
  usersList = [];
  usersListSubscribe: any;

  constructor(private dataService: ApiService, private router: Router) {
    this.dataSource = new MatTableDataSource<any>(this.usersList); // Update the type parameter to 'any'
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getUsersList();
  }


  getUsersList() {
    this.usersListSubscribe = this.dataService.get_users().subscribe(res => {
      this.usersList = res;
      console.log('res', res);
      this.rowData = res;
      this.dataSource.data = this.usersList; // Update the data source with the fetched reclamation list
    });
  }

  deleteUser(id: any) {
    showConfirmationAlert("Vous souhaitez supprimer cet utilisateur?", () => {
      this.dataService.deleteUser(id).subscribe(res => {
        showSuccessAlert("Cet utilisateur a été supprimé");
      });
      
      
    });
  }
}
