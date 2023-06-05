import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";
import { MapService } from "src/app/services/map.service";
import { Gallery } from "angular-gallery";
import { doctor_gallery, users } from "../../../lib/dummy";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-card-announce",
  templateUrl: "./card-announce.component.html",
})
export class CardAnnounceComponent implements OnInit {
  isConnected: boolean = false;
  images = [...doctor_gallery];
  url = "http://localhost:4401";
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 30,
    navSpeed: 700,
    autoWidth: true,
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1.2,
      },
      740: {
        items: 2.3,
      },
      940: {
        items: 3.2,
      },
    },
    nav: true,
  };

  slideConfig = { slidesToShow: 4, slidesToScroll: 2 };
  infoForm: any;
  announcement: any; // Variable to hold the announcement data

  constructor(
    private map: MapService,
    private gallery: Gallery,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private ds: ApiService
  ) {}

  ngOnInit(): void {
    // Retrieve the announcement ID from the route parameters
    this.activatedRoute.params.subscribe((params) => {
      const announcementId = params['id'];
      
      // Call a method to fetch the announcement data using the announcementId
      this.getAnnouncement(announcementId);
    });
  }

  getAnnouncement(announcementId: string) {
    // Make an API call to fetch the announcement data using the provided announcementId
    // Replace this with your own API call
    // Example API call using map service
    this.ds.getOneAnnonce(announcementId).subscribe((response) => {
      this.announcement = response; // Store the announcement data in the 'announcement' variable
    });
  }
}
