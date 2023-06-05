import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from "src/app/services/api.service";
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-modifannonce',
  templateUrl: './popup-modifannonce.component.html',
  styleUrls: ['./popup-modifannonce.component.css']
})
export class PopupModifannonceComponent implements OnInit {

  angForm: FormGroup;
  congieData: any;
  Id: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: ApiService
  ) { }

  ngOnInit(): void {
    this.angForm = this.fb.group({
      id_user: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      etat: ['en cours...'],
      prix: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', Validators.required],
      images: ['', Validators.required]
    });

    this.getCongie();
  }

  getCongie() {
    this.Id = this.data.id;
    this.dataService.getAnnonceById(this.Id).subscribe(
      (data) => {
        console.log('API Response:', data);

        if (data && data.length > 0) {
          this.congieData = data[0];

          this.angForm.patchValue({
            id_user: this.congieData.id_user,
            nom: this.congieData.nom,
            prenom: this.congieData.prenom,
            etat: 'en cours...',
            prix: this.congieData.prix,
            description: this.congieData.description,
            email: this.congieData.email,
            images: this.congieData.images
          });
        } else {
          console.log('No user data found');
        }
      },
      (error) => {
        console.log('Error retrieving user data:', error);
      }
    );
  }

  postdata(form: any) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then((result) => {
      console.log(form);

      if (result.isConfirmed) {
        this.dataService.updateAnnonce(form).subscribe(
          (data) => {
            Swal.fire('Saved!', '', 'success');
          },
          (error) => {
            console.log('Error updating annonce:', error);
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
