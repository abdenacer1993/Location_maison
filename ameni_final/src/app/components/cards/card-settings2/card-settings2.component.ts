import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators , FormBuilder , NgForm } from "@angular/forms";
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
  selector: "app-card-settings2",
  templateUrl: "./card-settings2.component.html",
  styleUrls: ["./card-settings2.component.css"],
})
export class CardSettings2Component implements OnInit {
  isForConnectedUser: boolean = false; //either this card is for the connected user or for another
  userId;
  userData: IUser;
  images = [...doctor_gallery];
  files = [];
  infoForm: FormGroup;
 
 
  constructor(private fb:FormBuilder , private dataService : ApiService , private router :Router ,private activatedRoute: ActivatedRoute,) {
    this.infoForm = this.fb.group({
      id: new FormControl("", Validators.required),
      nom: new FormControl("", Validators.required),
      prenom: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      telephone: new FormControl("", Validators.required),
      adresse: new FormControl("", Validators.required),
      
      
      
     
    });

    this.activatedRoute.params.subscribe(async (params) => {
      this.userId = params["id"];
      
      if (this.userId) {
        this.isForConnectedUser = false;
        this.getUserDataById(this.userId);
      } else {
        this.isForConnectedUser = true;
        this.getLocalUserData();
      }
     
    });

  }

  ngOnInit(): void {
  
  }

  getLocalUserData() {
  
  }

  handleSubmit() {
    showConfirmationAlert("Vous souhaitez mettre à jour cet utilisateur?", () => {
      this.dataService
        .updateUsers(
          this.infoForm.value.id,
          this.infoForm.value.nom,
          this.infoForm.value.prenom,
          this.infoForm.value.email,
          this.infoForm.value.adresse,
          this.infoForm.value.telephone,
          this.infoForm.value.password
        )
        .pipe(first())
        .subscribe(
          (data) => {
            showSuccessAlert("Mise à jour avec succès");
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
  
  


  getUserDataById(userId : any) {
    this.dataService.getUserById(userId).subscribe(res => {
      this.infoForm.controls.id.setValue(res.id);
      this.infoForm.controls.nom.setValue(res.nom);
      this.infoForm.controls.prenom.setValue(res.prenom);
      this.infoForm.controls.adresse.setValue(res.adresse);
      this.infoForm.controls.email.setValue(res.email);
      this.infoForm.controls.password.setValue(res.password);
      this.infoForm.controls.telephone.setValue(res.telephone);
     
      console.log('res', res);
     
    
    });
  }
  



  

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
