import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { announces } from "src/app/lib/dummy";
import { IAnnounce } from "src/app/models/announce";
import { ApiService } from '../../../services/api.service'
import { Router } from '@angular/router';

@Component({
  selector: "app-user-requests",
  templateUrl: "./user-requests.component.html",
  styleUrls: ["./user-requests.component.css"],
})
export class UserRequestsComponent implements OnInit {
  displayedColumns: string[] = [
    "image",
    "id",
    "userId",
    "type",
    "adresse",
    "phone",
    "prix",
    "etat",
    "action",
  ];
  dataSource: MatTableDataSource<IAnnounce>;
  announces: IAnnounce[];
  
  filteredAnnounces: IAnnounce[];
 
  annoncesList = [];
  annoncesListSubscribe: any;
  filteredAnnonces: IAnnounce[];
  rowData: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 

  constructor( private dataService : ApiService , private router :Router) {
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

  

  ngOnInit(): void {

    this.getAnnoncesList();
  }
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


  getAnnoncesList() {
    this.annoncesListSubscribe = this.dataService.getAnnoncesAdmin().subscribe((res :any[])=> {
      this.annoncesList = res;
      console.log('res', res);
      this.rowData = res;
      this.dataSource.data = this.annoncesList; // Update the data source with the fetched reclamation list
    });
  }


  acceptAnnonce(id: any) {
    showConfirmationAlert("Vous souhaitez accepter cet annonce?", () => {
      this.dataService.acceptAnnonce(id).subscribe(res => {
        showSuccessAlert("Cet annonce a été accepté");
      });
      
      
    });
  }

  getBase64Image(imageData) {
    return 'data:image;base64,' + imageData;
  }
  
  refuserAnnonce(id: any) {
    showConfirmationAlert("Vous souhaitez refuser cet annonce?", () => {
      this.dataService.refuserAnnonce(id).subscribe(res => {
        showSuccessAlert("Cet annonce a été refusé");
      });
      
      
    });
  }
}
