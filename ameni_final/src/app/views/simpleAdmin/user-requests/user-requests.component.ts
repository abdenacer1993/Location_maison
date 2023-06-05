import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { announces } from "src/app/lib/dummy";
import { IAnnounce } from "src/app/models/announce";

@Component({
  selector: "app-user-requests",
  templateUrl: "./user-requests.component.html",
  styleUrls: ["./user-requests.component.css"],
})
export class UserRequestsComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "userId",
    "type",
    "adresse",
    "phone",
    "prix",
    "etat",
  ];
  dataSource: MatTableDataSource<IAnnounce>;
  announces: IAnnounce[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.announces = announces;
    this.dataSource = new MatTableDataSource(announces);
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
  acceptRequest(requestId: any) {
    showConfirmationAlert("Vous souhaitez accepter cette demande?", () => {
      const newRequests = this.announces.filter((announce) => announce.id != requestId);
      this.announces = newRequests;
      this.dataSource = new MatTableDataSource(newRequests);
      showSuccessAlert("Cette demande a été acceptée");
    });
  }
  declineRequest(requestId: any) {
    showConfirmationAlert("Vous souhaitez refuser cette demande?", () => {
      const newRequests = this.announces.filter((announce) => announce.id != requestId);
      this.announces = newRequests;
      this.dataSource = new MatTableDataSource(newRequests);
      showSuccessAlert("Cette demande a été refusée");
    });
  }
}
