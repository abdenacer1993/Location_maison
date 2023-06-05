import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { comments, users } from "src/app/lib/dummy";
import { ICommente } from "src/app/models/commente";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-comments-box",
  templateUrl: "./comments-box.component.html",
  styleUrls: ["./comments-box.component.css"],
})
export class CommentsBoxComponent implements OnInit {
  @Input() doctorId;
  isConnected: boolean = false;
  comments: ICommente[];
  formComment: FormGroup;
  constructor(private authService: AuthService) {
    this.isConnected = authService.getIsConnected();
    this.getDoctorComments();
    this.formComment = new FormGroup({
      comment: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}

  getDoctorComments() {
    this.comments = comments;
  }
  getUserByEmail() {}
}
