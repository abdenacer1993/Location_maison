import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { types, announces } from "src/app/lib/dummy";
import { IAnnounce } from "src/app/models/announce";
import { MapService } from "src/app/services/map.service";
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-announce-doctor",
  templateUrl: "./search-announce.component.html",
  styleUrls: ["./search-announce.component.css"],
})
export class SearchDoctorComponent implements OnInit {
  types: string[] = types;
  searchForm: FormGroup;
  announces: IAnnounce[];
  filteredAnnounces: IAnnounce[];
  dataSource: MatTableDataSource<any>; 
  annoncesList = [];
  annoncesListSubscribe: any;
  filteredAnnonces: IAnnounce[];
  rowData: any = [];

  constructor(private map: MapService , private dataService: ApiService, private router: Router) {
    this.searchForm = new FormGroup({
      types: new FormControl("", [Validators.required]),
      searchWord: new FormControl("", [Validators.required]),
    });
    this.getAnnoncesList();
    this.handleSearchListner();
  }
  getAllAnnounces() {
    this.announces = announces;
    this.filteredAnnounces = [...this.announces];
  }
  ngOnInit() {
    this.getAnnoncesList();
    // this.map.buildMap();
  }


  getAnnoncesList() {
    this.annoncesListSubscribe = this.dataService.getAnnonces().subscribe(res => {
      this.annoncesList = res;
      console.log('res', res);
    //  this.rowData = res;
     
    });
  }

  



  handleSearchListner() {
    this.searchForm.valueChanges.subscribe(({ searchWord, type }) => {
      this.filteredAnnounces = this.announces
        .filter((announce) =>
          announce.type.toLowerCase().includes(type.toLowerCase())
        )
        .filter(({  type, phone, prix , adresse }) => {
          const word = searchWord.toLowerCase();
          if (
           
            `${phone}`.includes(word) ||
            `${prix}`.includes(word) ||
            adresse.toLowerCase().includes(word)
          )
            return true;
          return false;
        });
    });
  }
  handleSearch() {
    const searchInput = this.searchForm.get("searchWord").value;
    console.log({ searchInput });
  }
}
