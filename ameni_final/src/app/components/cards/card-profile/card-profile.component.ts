import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-card-profile",
  templateUrl: "./card-profile.component.html",
  styleUrls: ["./card-profile.component.css"],
})
export class CardProfileComponent implements OnInit {
  isForConnectedUser: boolean = false;
  userId;
  userData: IUser;
  profilePicSrc: any;
  profilePicFile;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.activatedRoute.params.subscribe(async (params) => {
      this.userId = params["id"];
      if (this.userId) {
        this.isForConnectedUser = false;
        this.getUserDataById();
      } else {
        this.isForConnectedUser = true;
        this.getLocalUserData();
      }
    });
  }
  getUserDataById() {
    this.userData = users.find((user: IUser) => user.id == this.userId);
    if (!this.userData) this.router.navigateByUrl("/");
    if (this.userData.role === "user")
      this.profilePicSrc = "assets/img/doctors/doctor_default_male.jpg";
    else this.profilePicSrc = "assets/img/defaultAvatar.jpeg";
  }
  getLocalUserData() {
    this.userData = this.authService.getConnectedUser();
    if (!this.userData) this.router.navigateByUrl("/");
    if (this.userData.role === "user")
      this.profilePicSrc = "assets/img/doctors/doctor_default_male.jpg";
    else this.profilePicSrc = "assets/img/defaultAvatar.jpeg";
  }

  ngOnInit(): void {}

  get isUser() {
    return this.userData.role === "user";
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) return;
    this.profilePicFile = file;
    const reader = new FileReader();
    reader.onload = (e) => (this.profilePicSrc = reader.result);
    reader.readAsDataURL(this.profilePicFile);
  }
}
