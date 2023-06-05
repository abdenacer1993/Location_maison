import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators , FormBuilder , NgForm } from "@angular/forms";
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service'
import Swal from "sweetalert2";
import { showSuccessAlert } from "src/app/lib/alerts";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  step: number = 0;
  registerForm: FormGroup;

  
  constructor(private fb:FormBuilder , private dataService : ApiService , private router :Router) {
    this.registerForm = this.fb.group({
      nom: new FormControl("", Validators.required),
      prenom: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      telephone: new FormControl("", Validators.required),
      prof: new FormControl("", Validators.required),
      adresse: new FormControl("", Validators.required),
      
      
     
    });

  }

  ngOnInit(): void {}

 



  handleSubmit( registerForm : any) {
    this.dataService.userregistration(
      registerForm.value.nom,
      registerForm.value.prenom,
      registerForm.value.email,
      registerForm.value.password,
      registerForm.value.telephone,
      registerForm.value.prof,
      registerForm.value.adresse,
      
     
    )
    .pipe(first())
    .subscribe( () => { 
      this.router.navigate(['login']);
      showSuccessAlert("S'inscrire avec succés");
        this.registerForm.reset()

    },
    error => { 
      // Error message
      console.error('An error occurred while adding the account:', error);
      showSuccessAlert("S'inscrire avec succés");

    });

    
  }
}


