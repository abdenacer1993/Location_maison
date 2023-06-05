import { Component, OnInit } from "@angular/core";
import DataSource from "devextreme/data/data_source";
import { users } from "src/app/lib/dummy";
import { AuthService } from "src/app/services/auth.service";
import { ScheduleService } from "src/app/services/schedule.service";
import { getConvertedDate } from "src/app/utils/date";

@Component({
  selector: "app-my-schedules",
  templateUrl: "./my-schedules.component.html",
  styleUrls: ["./my-schedules.component.css"],
})
export class MySchedulesComponent implements OnInit {
  dataSource: DataSource;
  currentDate = new Date(2021, 3, 27);
  views = ["week"];

  currentView = this.views[0];
  constructor(
    private scheduleService: ScheduleService,
    private authService: AuthService
  ) {
    const medId = this.authService.getConnectedUser().id;
    this.dataSource = new DataSource({
      store: this.scheduleService.getMedAppointments(medId),
    });
  }
  onAppointmentFormOpening(e: any) {
    let startDate = e.appointmentData.startDate;
    const patientName = this.getPatientNameById(e.appointmentData.medId);
    let form = e.form;
    form.option("items", [
      {
        label: {
          text: "Patient",
        },
        name: "patient",
        editorType: "dxTextBox",
        editorOptions: {
          value: patientName,
          readOnly: true,
        },
      },
      {
        dataField: "startDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
          readOnly: true,
        },
      },

      {
        name: "endDate",
        dataField: "endDate",
        editorType: "dxDateBox",
        editorOptions: {
          width: "100%",
          type: "datetime",
          readOnly: true,
        },
      },
    ]);

    // this.applyDisableDatesToDateEditors(e.form);
  }
  ngOnInit(): void {}

  getPatientNameById(patientId) {
    const { firstName, lastName } = users.find((user) => user.id == patientId);
    return `${firstName} ${lastName}`;
  }

  getFormattedDate(date: Date) {
    return getConvertedDate(date);
  }
}
