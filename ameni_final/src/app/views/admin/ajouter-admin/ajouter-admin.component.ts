import { Component, OnInit, ViewChild } from "@angular/core";
import { ICommente } from "src/app/models/commente";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { comments } from "src/app/lib/dummy";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { FormControl, FormGroup, Validators , FormBuilder , NgForm } from "@angular/forms";
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'
import Swal from "sweetalert2";

@Component({
  selector: "app-ajouter-admin",
  templateUrl: "./ajouter-admin.component.html",
  styleUrls: ["./ajouter-admin.component.css"],
})
export class AjouterAdminComponent implements OnInit {

  addForm: FormGroup;

  
  role = localStorage.getItem('Role')  ;

  
  constructor(private fb:FormBuilder , private dataService : ApiService , private router :Router) {
    this.addForm = this.fb.group({
      nom: new FormControl("", Validators.required),
      prenom: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      telephone: new FormControl("", Validators.required),
      adresse: new FormControl("", Validators.required),
      
      
     
    });

  }
  
  
  ngOnInit(): void {}

  handleSubmit( addForm : any) {
    this.dataService.addAdmin(
      addForm.value.nom,
      addForm.value.prenom,
      addForm.value.email,
      addForm.value.password,
      addForm.value.telephone,
      addForm.value.adresse,
      
     
    )
    .pipe(first())
    .subscribe( data => { 
     
      showSuccessAlert("Admin compte ajouter avec succés");
        this.addForm.reset()

    },
    error => { 
      // Error message
      console.error('An error occurred while adding the account:', error);
      Swal.fire({
        title: "Erreur",
        text: "Verifier  les données saisis!",
        icon: "error",
        confirmButtonText: "OK"
      });

    });

    
  }
  
}
