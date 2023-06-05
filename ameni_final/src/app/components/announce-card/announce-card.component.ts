import { Component, Input, OnInit } from "@angular/core";
import { IAnnounce } from "src/app/models/announce";
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service'

@Component({
  selector: "app-announce-card",
  templateUrl: "./announce-card.component.html",
  styleUrls: ["./announce-card.component.css"],
})
export class DoctorCardComponent implements OnInit {
  @Input() data: IAnnounce;

  rowData: any = [];
  annoncesList = [];
  annoncesListSubscribe: any;

  constructor(private dataService: ApiService, private router: Router) {}

  ngOnInit(): void {
    console.log({ data: this.data });
    
  }


  getAnnoncesList() {
    this.annoncesListSubscribe = this.dataService.getAnnonces().subscribe(res => {
      this.annoncesList = res;
      console.log('res', res);
      this.rowData = res;
     
    });
  }

 
  get announceType() {
    const {  type = "" } = this.data || {};
    return type;
  }
  get announceAdresse() {
    const { adresse = "" } = this.data || {};
    return adresse;
  }
  get announcePhone() {
    const { phone = "" } = this.data || {};
    return phone;
  }
  get announcePrix() {
    const { prix = "" } = this.data || {};
    return prix;
  }
}
