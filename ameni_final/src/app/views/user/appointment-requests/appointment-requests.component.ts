import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { showConfirmationAlert, showSuccessAlert } from "src/app/lib/alerts";
import { appointments, users } from "src/app/lib/dummy";
import { IAppointment } from "src/app/models/appointment";
import { AuthService } from "src/app/services/auth.service";
import { ScheduleService } from "src/app/services/schedule.service";
import { getFormatedDate } from "src/app/utils/date";

@Component({
  selector: "app-appointment-requests",
  templateUrl: "./appointment-requests.component.html",
  styleUrls: ["./appointment-requests.component.css"],
})
export class AppointmentRequestsComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "start", "end", "action"];
  dataSource: MatTableDataSource<IAppointment>;
  appointmentRequests: IAppointment[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private scheduleService: ScheduleService
  ) {
    this.getMedAppointmentRequests();
  }
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getMedAppointmentRequests() {
    const medId = this.authService.getConnectedUser().id;
    this.appointmentRequests =
      this.scheduleService.getMedAppointmentRequests(medId);
    this.dataSource = new MatTableDataSource(this.appointmentRequests);
  }

  getPatientName(patientId: number) {
    const { firstName, lastName } = users.find((user) => user.id == patientId);
    return `${firstName} ${lastName}`;
  }
  getPatientEmail(patientId: number) {
    const { email } = users.find((user) => user.id == patientId);
    return email;
  }
  formatDate(date: Date) {
    return getFormatedDate(date);
  }

  acceptAppointment(appointmentId: number) {
    showConfirmationAlert("Vous souhaitez accepter cette demande?", () => {
      this.appointmentRequests = this.appointmentRequests.filter(
        (appointment) => appointment.id != appointmentId
      );
      this.dataSource = new MatTableDataSource(this.appointmentRequests);
      showSuccessAlert("Cette demande a été acceptée");
    });
  }
  declineAppointment(appointmentId: number) {
    showConfirmationAlert("Vous souhaitez accepter cette demande?", () => {
      this.appointmentRequests = this.appointmentRequests.filter(
        (appointment) => appointment.id != appointmentId
      );
      this.dataSource = new MatTableDataSource(this.appointmentRequests);
      showSuccessAlert("Cette demande a été refusée");
    });
  }
}
