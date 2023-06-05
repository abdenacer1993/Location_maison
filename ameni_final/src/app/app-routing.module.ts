import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "./guard/admin.guard";
import { AuthGuard } from "./guard/auth.guard";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { SimpleAdminComponent } from "./layouts/simpleAdmin/simpleAdmin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { AjouterAdminComponent } from "./views/admin/ajouter-admin/ajouter-admin.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { ReviewComponent } from "./views/admin/reclamation/reclamation.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { SettingsAnnounceComponent } from "./views/user/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";
import { UserRequestsComponent } from "./views/admin/user-requests/user-requests.component";
import { UsersComponent } from "./views/admin/users/users.component";
import { AnnounceRequestsComponent } from "./views/admin/announce-requests/announce-requests.component";





// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { BookingComponent } from "./views/booking/booking.component";

// no layouts views
import { LandingComponent } from "./views/landing/landing.component";
import { MapComponent } from "./views/map/map.component";
import { AppointmentRequestsComponent } from "./views/user/appointment-requests/appointment-requests.component";
import { AjouterAnnounceComponent } from "./views/user/ajouter-announce/ajouter-announce.component";
import { MesAnnouncesComponent } from "./views/user/mes-announces/mes-announces.component";
import { MySchedulesComponent } from "./views/user/my-schedules/my-schedules.component";
import { ProfileDoctorComponent } from "./views/profile-doctor/profile-doctor.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { SearchDoctorComponent } from "./views/search-announce/search-announce.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "profile", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "ajouter-admin", component: AjouterAdminComponent },
      { path: "reclamations", component: ReviewComponent },
      { path: "announcer-requests", component: AnnounceRequestsComponent },
      { path: "announce-requests/:id", component: SettingsAnnounceComponent },
      { path: "users", component: UsersComponent },
      { path: "users/:id", component: SettingsComponent },
      { path: "announce-requests", component: UserRequestsComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
    canActivate: [AdminGuard],
  },
  {
    path: "simpleAdmin",
    component: SimpleAdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "profile", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "ajouter-admin", component: AjouterAdminComponent },
      { path: "reclamation", component: ReviewComponent },
      { path: "announcer-requests", component: AnnounceRequestsComponent },
      { path: "announce-requests/:id", component: SettingsAnnounceComponent },
      { path: "users", component: UsersComponent },
      { path: "users/:id", component: SettingsComponent },
      { path: "announce-requests", component: UserRequestsComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
    canActivate: [AdminGuard],
  },
  {
    path: "user",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "profile", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "ajouter-announce", component: AjouterAnnounceComponent },
      { path: "mes-announces", component: MesAnnouncesComponent },
      { path: "mes-announces/:id", component: SettingsAnnounceComponent  },
      { path: "my-schedule", component: MySchedulesComponent },
      { path: "appointment-requests", component: AppointmentRequestsComponent },
      { path: "users", component: UsersComponent },
      { path: "doctor-requests", component: UserRequestsComponent },
      { path: "maps", component: MapsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
    canActivate: [AuthGuard],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  // { path: "profile", component: ProfileComponent },
  { path: "profile/:id", component: ProfileDoctorComponent },
  { path: "booking/:id", component: BookingComponent },
  { path: "search", component: SearchDoctorComponent },

  { path: "map", component: MapComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
