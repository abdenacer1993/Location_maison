import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { isLoggedIn } from "src/app/lib/storage";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-pages-dropdown",
  templateUrl: "./pages-dropdown.component.html",
  styleUrls: ["./pages-dropdown.component.css"],
})
export class PagesDropdownComponent implements OnInit {
  isLoggedIn: boolean = isLoggedIn();
  user: IUser;
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  constructor(private authService: AuthService) {
    this.user = this.authService.getConnectedUser();
  }
  ngOnInit() {}
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }
  createPoppper() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  logout() {
    this.authService.logout();
  }
  get isAdmin() {
    return this.user.role === "admin";
  }
  get isSimpleAdmin() {
    return this.user.role === "simpleAdmin";
  }
  get isUser() {
    return this.user.role === "user";
  }
}
