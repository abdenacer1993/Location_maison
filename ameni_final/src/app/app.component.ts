import { Component } from "@angular/core";
import { ApiService } from "./services/api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  isLogged: any;

  title = "angular-dashboard-page";
  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  constructor(private dataService: ApiService) {


    this.isLogged = this.dataService.isLoggedIn();
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    //dataService.getLoggedInRole.subscribe(role => this.changeName(role));
    if (this.dataService.isLoggedIn()) {
      console.log("loggedin");
      this.loginbtn = false;
      this.logoutbtn = true
    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false
    }

  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  
}

