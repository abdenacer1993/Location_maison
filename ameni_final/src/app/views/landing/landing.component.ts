import { Component, OnInit } from "@angular/core";
import { announces } from "src/app/lib/dummy";
import { IAnnounce } from "src/app/models/announce";
import { showSuccessAlert } from "src/app/lib/alerts";
import { FormControl, FormGroup, Validators , FormBuilder , NgForm } from "@angular/forms";
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'
import Swal from "sweetalert2";
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"],
})
export class LandingComponent implements OnInit {
  

  reclamationForm: FormGroup;

  announces: IAnnounce[];
  filteredAnnounces: IAnnounce[];
  dataSource: MatTableDataSource<any>; 
  annoncesList = [];
  annoncesListSubscribe: any;
  filteredAnnonces: IAnnounce[];
  rowData: any = [];

  
  constructor(private fb:FormBuilder , private dataService : ApiService , private router :Router) {
    this.getRecentSearch();
    this.reclamationForm = this.fb.group({
      nom: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      message: new FormControl("", Validators.required),
      
      
     
    });

  }
 
  ngOnInit(): void {
    this.getAnnoncesList();
  }

  getRecentSearch() {
    //top 4 doctors
    this.announces = announces
      .filter((announce, index) => index < 4);
      
  }


  getAnnoncesList() {
    this.annoncesListSubscribe = this.dataService.getAnnonces().subscribe(res => {
      this.annoncesList = res;
      console.log('res', res);
    //  this.rowData = res;
     
    });
  }

  




  handleSubmit(reclamationForm: any) {
    this.dataService.ajouter_reclamation(
      reclamationForm.value.nom,
      reclamationForm.value.email,
      reclamationForm.value.message
    )
    .pipe(first())
    .subscribe(
      data => {
        // Successful action message
        console.log('Reclamation added successfully.');
        this.router.navigate(['index']);
        showSuccessAlert("Message envoyé avec succés");
        this.reclamationForm.reset()
      },
      error => {
        // Error message
        console.error('An error occurred while adding the reclamation:', error);
        Swal.fire({
          title: "Erreur",
          text: "Verifier  les données saisis!",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    );
  }
  



}
