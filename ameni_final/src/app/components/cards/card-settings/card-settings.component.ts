import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OwlOptions } from "ngx-owl-carousel-o";
import { doctor_gallery, users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { ApiService } from '../../../services/api.service'
import { first } from 'rxjs/operators';
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import Swal from "sweetalert2";

@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
  styleUrls: ["./card-settings.component.css"],
})
export class CardSettingsComponent implements OnInit {
  isForConnectedUser: boolean = false; //either this card is for the connected user or for another
  userId: any;
  userData: any;
  images = [...doctor_gallery];
  files = [];
  infoForm: FormGroup;


  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router, private activatedRoute: ActivatedRoute,) {
    this.userData = {};
  }
  ngOnInit(): void {
    this.infoForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],




    });

    this.getUser();

  }

    // this.activatedRoute.params.subscribe(async (params) => {
    //   this.userId = params["id"];

    //   if (this.userId) {
    //     this.isForConnectedUser = false;
    //     this.getUserDataById(this.userId);
    //   } else {
    //     this.isForConnectedUser = true;
    //     this.getLocalUserData();
    //   }

    // });
    getUser() {
      // Parse the user ID from the localStorage
      
      this.userId = parseInt(localStorage.getItem('Id'));
      
      // Call the API to get the user data by ID
      this.dataService.getUserById(this.userId).subscribe(
        (data) => {
          
          console.log('API Response:', data); // Check the API response
          console.log('API nbr Response:', data.length ); // Check the API response
          console.log('Type of data:', typeof data);
    
          if (data && data.length > 0) {
            this.userData = data[0]; // Assign the first item in the data array to userData
            console.log('Inside API call:', this.userData); // Log the updated userData
    
            // Update the form values with the user data
            this.infoForm.patchValue({
              id: this.userData.id,
              nom: this.userData.nom,
              prenom: this.userData.prenom,
              email: this.userData.email,
              password: this.userData.password,
              telephone: this.userData.telephone,
              adresse: this.userData.adresse,
            });
          } else {
            console.log('No user data found');
          }
        },
        error => {
          console.log('Error retrieving user data:', error);
        }
      );
    }
    

  

  
  getLocalUserData() {

  }

  handleSubmit(f: any) {
    showConfirmationAlert("Vous souhaitez mettre à jour cet utilisateur?", () => {
      this.dataService
        .updateUser(f).subscribe(
         
          (data) => {
            showSuccessAlert("Mise à jour avec succès");
            this.infoForm.reset(); 
            // Handle success
          },
          (error) => {
            console.error('An error occurred while adding the account:', error);
            Swal.fire({
              title: "Erreur",
              text: "Vérifiez les données saisies!",
              icon: "error",
              confirmButtonText: "OK"
            });
          }
        );
    });
  }




  // getUserDataById(userId: any) {
  //   this.dataService.getUserById(userId).subscribe(res => {
  //     this.infoForm.controls.id.setValue(res.id);
  //     this.infoForm.controls.nom.setValue(res.nom);
  //     this.infoForm.controls.prenom.setValue(res.prenom);
  //     this.infoForm.controls.adresse.setValue(res.adresse);
  //     this.infoForm.controls.email.setValue(res.email);
  //     this.infoForm.controls.password.setValue(res.password);
  //     this.infoForm.controls.telephone.setValue(res.telephone);

  //     console.log('res', res);


  //   });
  // }






  get isChangingTime() {
    return this.infoForm.get("isChangingTime").value;
  }

  onFileChange(event: any) {
    const { files } = event.target;
    const self = this;
    for (var i = 0; i < files.length; i++) {
      this.files.push(files[i]);
      (function (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          self.images.unshift({ path: reader.result });
        };
      })(files[i]);
    }
  }

  get isUser() {
    return this.userData.role === "user";
  }

  get isEditDisabled() {
    return this.isForConnectedUser ? true : null;
  }
}
