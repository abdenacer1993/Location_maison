import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "src/app/services/api.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-ajouter-announce",
  templateUrl: "./ajouter-announce.component.html",
  styleUrls: ["./ajouter-announce.component.css"],
})
export class AjouterAnnounceComponent implements OnInit {
  infoForm: FormGroup;
  selectedFiles: File[] ; // Initialize as an empty array
  userId: number;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dataService: ApiService
  ) {}

  ngOnInit(): void {
    this.infoForm = this.fb.group({
      id_user: [""],
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      etat: ["en cours..."],
      prix: ["", Validators.required],
      description: ["", Validators.required],
      adresse: ["", Validators.required],
      telephone: ["", Validators.required],
      images: ["", Validators.required],
    });
    this.getUserData();
  }

  getUserData() {
    this.userId = parseInt(localStorage.getItem("Id"));
    this.dataService.getUserById(this.userId).subscribe(
      (data) => {
        console.log("API Response:", data); // Check the API response

        if (data && data.length > 0) {
          this.userData = data[0]; // Assign the first item in the data array to userData
          console.log("Inside API call:", this.userData); // Log the updated userData

          // Update the form values with the user data
          this.infoForm.patchValue({
            nom: this.userData.nom,
            prenom: this.userData.prenom,
            id_user: this.userData.id,
            email: this.userData.email,
          });
        } else {
          console.log("No user data found");
        }
      },
      (error) => {
        console.log("Error retrieving user data");
      }
    );
  }

  // onFileChange(event: any) {
  //   const files: FileList = event.target.files;
  //   this.selectedFiles = [...this.selectedFiles, ...Array.from(files)];
  // }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.infoForm.patchValue({
        images: file
      });
    }
  }
  

  handleSubmit() {
    const formData = new FormData();
    formData.append("id_user", this.infoForm.get("id_user")?.value);
    formData.append("nom", this.infoForm.get("nom")?.value);
    formData.append("prenom", this.infoForm.get("prenom")?.value);
    formData.append("etat", this.infoForm.get("etat")?.value);
    formData.append("prix", this.infoForm.get("prix")?.value);
    formData.append("description", this.infoForm.get("description")?.value);
    formData.append("adresse", this.infoForm.get("adresse")?.value);
    formData.append("telephone", this.infoForm.get("telephone")?.value);
    formData.append('images', this.infoForm.get('images').value);

    // Append each selected file to the form data
    // for (let i = 0; i < this.selectedFiles.length; i++) {
    //   formData.append("images[]", this.selectedFiles[i], this.selectedFiles[i].name);
    // }
    Swal.fire({
      title: 'Do you want to add annonce?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
    this.http.post<any>("http://localhost/projet_angular/addAnnonce.php", formData).subscribe(
      (response) => {
        console.log(response);
        // Handle the response from the server
      },
      (error) => {
        console.log(this.infoForm.value)
        console.log(error);
        // Handle the error
      }
    );
    Swal.fire('annonce Partager!', '', 'success')
        
      } else if (result.isDenied) {
        Swal.fire('annonce n est pas partager', '', 'info')
      }
    })
  }
}
