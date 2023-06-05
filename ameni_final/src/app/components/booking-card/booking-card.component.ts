import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import DataSource from "devextreme/data/data_source";
import { ScheduleService } from "src/app/services/schedule.service";
import notify from "devextreme/ui/notify";
import { showSuccessAlert } from "src/app/lib/alerts";
import { users } from "src/app/lib/dummy";
import { IUser } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-booking-card",
  templateUrl: "./booking-card.component.html",
  styleUrls: ["./booking-card.component.css"],
})
export class BookingCardComponent implements OnInit {
  isAppointmentAdded: boolean = false;
  doctorId: number;
  docData: IUser;
  isConnected: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService,
    private authService: AuthService
  ) {
    this.isConnected = this.authService.getIsConnected();

    this.dataSource = new DataSource({
      store: this.scheduleService.getData(),
    });

    this.activatedRoute.params.subscribe(async (params) => {
      this.doctorId = params["id"];
      this.docData = users.find((user) => user.id == this.doctorId);
    });
  }

  ngOnInit(): void {}

  dataSource: DataSource;

  currentDate = new Date(2021, 3, 27);

  views = ["week"];

  currentView = this.views[0];

  onAppointmentFormOpening(e: any) {
    let startDate = e.appointmentData.startDate;
    if (!this.isConnected) {
      e.cancel = true;
      this.notifyConnect();
    }
    if (!this.isValidAppointmentDate(startDate)) {
      e.cancel = true;
      this.notifyDisableDate();
    }

    let form = e.form;
    form.option("items", [
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
      {
        label: {
          text: "Are you sure you want to proceed?",
        },
        editorOptions: {
          width: "100%",
        },
      },
    ]);

    // this.applyDisableDatesToDateEditors(e.form);
  }

  onAppointmentAdding(e: any) {
    const isValidAppointment = this.isValidAppointment(
      e.component,
      e.appointmentData
    );
    if (!isValidAppointment) {
      e.cancel = true;
      this.notifyDisableDate();
    }
    this.isAppointmentAdded = true;
  }

  onAppointmentUpdating(e: any) {
    const isValidAppointment = this.isValidAppointment(e.component, e.newData);
    if (!isValidAppointment) {
      e.cancel = true;
      this.notifyDisableDate();
    }
  }

  notifyDisableDate() {
    notify(
      "Cannot create or move an appointment/event to disabled time/date regions.",
      "warning",
      1000
    );
  }
  notifyConnect() {
    notify("You should connect first", "warning", 1000);
  }

  // isHoliday(date: Date) {
  //   const localeDate = date.toLocaleDateString();
  //   const holidays = this.scheduleService.getHolidays();
  //   return (
  //     holidays.filter((holiday) => holiday.toLocaleDateString() === localeDate)
  //       .length > 0
  //   );
  // }

  // isWeekend(date: Date) {
  //   const day = date.getDay();
  //   return day === 0 || day === 6;
  // }

  // isDisableDate(date: Date) {
  //   return this.isReserved(date);
  // }

  // isDinner(date: Date) {
  //   const hours = date.getHours();
  //   const dinnerTime = this.scheduleService.getDinnerTime();
  //   return hours >= dinnerTime.from && hours < dinnerTime.to;
  // }

  // hasCoffeeCupIcon(date: Date) {
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const dinnerTime = this.scheduleService.getDinnerTime();

  //   return hours === dinnerTime.from && minutes === 0;
  // }
  isReserved(date: Date) {
    return this.scheduleService.isReserved(date);
  }

  isValidAppointment(component: any, appointmentData: any) {
    const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = component.option("cellDuration");
    return this.isValidAppointmentInterval(startDate, endDate, cellDuration);
  }

  isValidAppointmentInterval(
    startDate: Date,
    endDate: Date,
    cellDuration: number
  ) {
    const edgeEndDate = new Date(endDate.getTime() - 1);

    if (!this.isValidAppointmentDate(edgeEndDate)) {
      return false;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
      if (!this.isValidAppointmentDate(date)) {
        return false;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }

    return true;
  }

  isValidAppointmentDate(date: Date) {
    return !this.isReserved(date);
    // return (
    //   !this.isHoliday(date) && !this.isDinner(date) && !this.isWeekend(date) && !this.isReserved(date)
    // );
  }

  // applyDisableDatesToDateEditors(form: any) {
  //   const holidays = this.scheduleService.getHolidays();
  //   const startDateEditor = form.getEditor("startDate");
  //   startDateEditor.option("disabledDates", holidays);

  //   const endDateEditor = form.getEditor("endDate");
  //   endDateEditor.option("disabledDates", holidays);
  // }
  proceedToPay() {
    showSuccessAlert("Réservation effectuée avec succès");
  }

  getPatientNameById(patientId) {
    const { firstName, lastName } = users.find((user) => user.id == patientId);
    return `${firstName} ${lastName}`;
  }
}
