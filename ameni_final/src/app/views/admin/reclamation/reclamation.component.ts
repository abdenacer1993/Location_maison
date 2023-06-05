import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { throwMatDialogContentAlreadyAttachedError } from "@angular/material/dialog";

@Component({
  selector: "app-reclamation",
  templateUrl: "./reclamation.component.html",
  styleUrls: ["./reclamation.component.css"],
})
export class ReviewComponent implements OnInit {
  displayedColumns: string[] = ["ID", "Email", "Message", "action"];
  dataSource: MatTableDataSource<any>; // Update the type parameter to 'any'
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  rowData: any = [];
  reclamationsList = [];
  reclamationListSubscribe: any;

  constructor(private dataService: ApiService, private router: Router) {
    this.dataSource = new MatTableDataSource<any>(this.reclamationsList); // Update the type parameter to 'any'
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
    this.getReclamationList();
  }


  deleteReclamation(id: any) {
    showConfirmationAlert("Vous souhaitez supprimer cet reclamation?", () => {
      this.dataService.deleteReclamation(id).subscribe(res => {
        showSuccessAlert("Cet reclamation a été supprimé");
      });
      
      
    });
  }

  getReclamationList() {
    this.reclamationListSubscribe = this.dataService.read_reclamation().subscribe(res => {
      this.reclamationsList = res;
      console.log('res', res);
      this.rowData = res;
      this.dataSource.data = this.reclamationsList; // Update the data source with the fetched reclamation list
    });
  }
}
