import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { showSuccessAlert } from "src/app/lib/alerts";
import { users } from "src/app/lib/dummy";
import { ICommente } from "src/app/models/commente";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"],
})
export class CommentComponent implements OnInit {
  @Input() comment: ICommente;
  @Input() doctorId;
  isConnected: boolean = false;
  isAllowedToReply: boolean = false; //only the doc owner of that profile is allowed to reply
  doctorData: IUser;
  formReply: FormGroup;
  isShowReply: boolean = false;
  constructor(private authService: AuthService) {
    this.isConnected = authService.getIsConnected();
    this.formReply = new FormGroup({
      reply: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    
    this.getDoctorData();
  }
  getDoctorData() {
    this.doctorData = users.find((user) => user.id == this.doctorId);
  }
  handleSubmit(event) {
    event.preventDefault();
    const reply = this.formReply.value.reply;
    console.log({ reply });
    showSuccessAlert("Reply added");
  }
  toggleReplyBox() {
    this.isShowReply = !this.isShowReply;
  }
  getIsAllowedToReply() {
    const connectedId = this.authService.getConnectedUser();
    this.isAllowedToReply = connectedId == this.doctorId;
  }
}
