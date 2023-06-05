import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "role",
    
    "address",
    "email",
    "phone",
    "action",
  ];

  dataSource: MatTableDataSource<IUser>;
  users: IUser[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.users = users;
    this.dataSource = new MatTableDataSource(users);
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

  ngOnInit(): void {}

  removeUser(requestId: any) {
    showConfirmationAlert("Vous souhaitez supprimer cet utilisateur?", () => {
      const newUsers = this.users.filter((user) => user.id != requestId);
      this.users = newUsers;
      this.dataSource = new MatTableDataSource(newUsers);
      showSuccessAlert("Cet utilisateur a été supprimé");
    });
  }
}
