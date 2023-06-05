import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { announces } from "src/app/lib/dummy";
import { IAnnounce } from "src/app/models/announce";
import { ApiService } from "src/app/services/api.service";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: "app-user-requests",
  templateUrl: "./announce-requests.component.html",
  styleUrls: ["./announce-requests.component.css"],
})
export class AnnounceRequestsComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "userId",
    "type",
    "adresse",
    "phone",
    "prix",
    "etat",
    "action",
  ];
  dataSourceformation: MatTableDataSource<IAnnounce>;
  pageSize: number = 5; // change this value to change the number of items per page
  currentPage: number = 1;
  totalItems: number;
  announces: IAnnounce[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: ApiService) {
    this.announces = announces;
    this.dataSourceformation = new MatTableDataSource(announces);
  }

  ngAfterViewInit() {
    this.dataSourceformation.paginator = this.paginator;
    this.dataSourceformation.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceformation.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceformation.paginator) {
      this.dataSourceformation.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAnnounces();
  }

  getAnnounces() {
    this.dataService.getAnnonces().subscribe(
      (data) => {
        this.dataSourceformation.data = data;
        this.totalItems = data.length; // set the total number of items for pagination
        console.log("API Response:", data); // Check the API response
      },
      (error) => {
        console.log("Error retrieving user data:", error);
      }
    );
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
  }

  acceptRequest(requestId: any) {
    showConfirmationAlert("Vous souhaitez accepter cette demande?", () => {
      const newRequests = this.dataSourceformation.data.filter(
        (announce) => announce.id != requestId
      );
      this.dataSourceformation.data = newRequests;
      showSuccessAlert("Cette demande a été acceptée");
    });
  }

  declineRequest(requestId: any) {
    showConfirmationAlert("Vous souhaitez refuser cette demande?", () => {
      const newRequests = this.dataSourceformation.data.filter(
        (announce) => announce.id != requestId
      );
      this.dataSourceformation.data = newRequests;
      showSuccessAlert("Cette demande a été refusée");
    });
  }
}
