import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { IAnnounce } from "src/app/models/announce";
import { PopupModifannonceComponent } from "src/app/popup-modifannonce/popup-modifannonce.component";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-mes-announces",
  templateUrl: "./mes-announces.component.html",
  styleUrls: ["./mes-announces.component.css"],
})
export class MesAnnouncesComponent implements OnInit {
  displayedColumns: string[] = ["id", "type", "nom", "prenom", "prix", "etat", "action"];
  userId: number;
  dataSourceformation: MatTableDataSource<any>;
  pageSize: number = 5; // change this value to change the number of items per page
  currentPage: number = 1;
  totalItems: number;
  dataSource: MatTableDataSource<any>;

  rowData: any = [];
  annoncesList = [];
  annoncesListSubscribe: any;
  filteredDataSourceformationData: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: ApiService,public dialog: MatDialog) {
    this.dataSourceformation = new MatTableDataSource<any>(this.annoncesList);
   
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
   // this.getCongie();
   this.getAnnoncesList();
  }

  pageChanged(event) {
    this.currentPage = event; // update the current page number
  }

  getCongie() {
    this.userId = parseInt(localStorage.getItem("Id"));
    this.dataService.getMesannonces(this.userId).subscribe(
      (data) => {
        
        this.totalItems = data.length; // set the total number of items for pagination
        console.log('API Response:', data); // Check the API response
      },
      (error) => {
        console.log('Error retrieving user data:', error);
      }
    );
  }

  getAnnoncesList() {
    this.userId = parseInt(localStorage.getItem("Id"));
    this.annoncesListSubscribe = this.dataService.readMesAnnonces(this.userId).subscribe(res => {
      
      console.log('res', res);
      this.rowData = res;
      this.dataSourceformation.data = this.rowData; // Update the data source with the fetched reclamation list
    });
  }



  deleteRecord(id: number): void {
    showConfirmationAlert("Vous souhaitez supprimer cet enregistrement?", () => {
      this.dataService.deleteAnnonce(id).subscribe(
        (response) => {
          console.log(response); // Log the response from the backend
          
          showSuccessAlert("Enregistrement supprimé avec succès");
          
          // Remove the deleted record from the dataSourceformation.data list
          this.dataSourceformation.data = this.dataSourceformation.data.filter(record => record.id !== id);
           // Assign the filtered data to a new property
          //  window.location.reload();
        },
        (error) => {
          console.log(error); // Log any errors
        }
      );
    });

  }

  openDialog(id: number): void {
    // Use the MatDialog service to open the dialog
     this.dialog.open(PopupModifannonceComponent, {
      data: { id: id } // Pass the ID as data to the dialog
    }).
    afterClosed().subscribe(result => {
      console.log('Dialog closed');
      this.getCongie();
      // Handle any actions after the dialog is closed, if needed
    });
  }
}
  

