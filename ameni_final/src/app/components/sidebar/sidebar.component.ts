import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  routes: IRoute[] = [];
  adminRoutes: IRoute[] = [
    // { path: "/admin/dashboard", title: "Dashboard", icon: "fas fa-tv" },

    { path: "/admin/profile", title: "Profile", icon: "fas fa-tools" },
    { path: "/admin/users", title: "Utilisateurs", icon: "fas fa-table" },
    { path: "/admin/ajouter-admin", title: "Ajouter admin", icon: "fas fa-table" },
    
    {
      path: "/admin/announce-requests",
      title: "Annoncements",
      icon: "fas fa-table",
    },
    { path: "/admin/reclamations", title: "Reclamations", icon: "fas fa-table" },
  ];
  simpleAdminRoutes: IRoute[] = [
    // { path: "/admin/dashboard", title: "Dashboard", icon: "fas fa-tv" },

    { path: "/simpleAdmin/profile", title: "Profile", icon: "fas fa-tools" },
    
    
    {
      path: "/simpleAdmin/announce-requests",
      title: "Annoncements",
      icon: "fas fa-table",
    },
    { path: "/simpleAdmin/reviews", title: "Reclamations", icon: "fas fa-table" },
  ];
  userRoutes: IRoute[] = [
    
    { path: "/user/profile", title: "Profile", icon: "fas fa-tools" },
    {
      path: "/user/ajouter-announce",
      title: "Ajouter annonce",
      icon: "fas fa-comments",
    },
    {
      path: "/user/mes-announces",
      title: "Mes annonces",
      icon: "fas fa-hospital-user",
    },
   
  ];
  constructor(private authService: AuthService, private router: Router) {
    const isAdmin = this.authService.getIsAdmin();
    const isSimpleAdmin = this.authService.getIsSimpleAdmin();
    const isUser = this.authService.getIsUser();
    if (isAdmin) this.routes = this.adminRoutes;
    if (isSimpleAdmin) this.routes = this.adminRoutes;
    if (isUser) this.routes = this.userRoutes;
  }

  ngOnInit() {}
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }

  isActiveRoute(route: string) {
    const currentRoute = this.router.url;
    return currentRoute.includes(route);
  }
}

interface IRoute {
  path: string;
  title: string;
  icon: string;
}
