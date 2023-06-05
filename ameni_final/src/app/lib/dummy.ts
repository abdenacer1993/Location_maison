import { IAnnounce } from "../models/announce";
import { ICommente } from "../models/commente";
import { IUser } from "../models/user";
import { IReview } from "../models/review";
import { IAppointment } from "../models/appointment";

export const doctor_gallery: { path: any }[] = [
  { path: "../../assets/img/gallery/pic_1.jpg" },
  { path: "../../assets/img/gallery/pic_2.jpg" },
  { path: "../../assets/img/gallery/pic_3.jpg" },
  { path: "../../assets/img/gallery/pic_4.jpg" },
  { path: "../../assets/img/gallery/pic_5.jpg" },
  { path: "../../assets/img/gallery/pic_6.jpg" },
  { path: "../../assets/img/gallery/pic_7.jpg" },
  { path: "../../assets/img/gallery/pic_8.jpg" },
];

const amal_toumi = "../../assets/img/users/amal_toumi.jpg";
const ahlem_sellami = "../../assets/img/users/ahlem_sellami.jpg";
const mourad_ennour = "../../assets/img/users/mourad_ennour.jpg";
const kamal_ghanmi = "../../assets/img/users/kamal_ghanmi.jpg";

export const announces: IAnnounce[] = [
  {
    id: 1,
    userId: 6,
    type: "A louer",
    adresse: "Gafsa",
    phone: 98709021,
    prix : 500 ,
    etat : "Pending" ,
  },
  {
    id: 2,
    userId: 6,
    type: "A louer",
    adresse: "Tunis",
    phone: 98709021,
    prix : 500 ,
    etat : "Pending" ,
  },
  {
    id: 3,
    userId: 6,
    type: "A louer",
    adresse: "Manouba",
    phone: 98709021,
    prix : 500 ,
    etat : "accepted" ,
  },
  {
    id: 4,
    userId: 6,
    type: "A louer",
    adresse: "Ariana",
    phone: 98709021,
    prix : 500 ,
    etat : "Pending" ,
  },
 
];

export const comments: ICommente[] = [
  {
    id: 1,
    userId: 6,
    type: "A louer",
    adresse: "euismod est arcu ac orci. Ut semper pretium neque. Morbi quis urna. Nunc",
    phone: 98709021,
  },
 
];

export const users: IUser[] = [
  {
    id: 1,
    firstName: "Ameni",
    lastName: "Ameni",
    email: "admin@outlook.net",
    phone: 498644498,
    address: "test adresse",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    firstName: "Ameni",
    lastName: "Ameni",
    email: "ameni@gmail.com",
    phone: 55172166,
    address: "P.O. Box 836, 3956 Sollicitudin Av.",
    password: "123456",
    role: "user",
  },
  {
    id: 3,
    firstName: "simple",
    lastName: "admin",
    email: "simpleadmin@gmail.com",
    phone: 27411772,
    address: "Ap #896-1079 Ornare, St.",
    password: "123456",
    role: "simpleAdmin",
  },
  {
    id: 4,
    firstName: "Keefe",
    lastName: "Stephens",
    email: "congue.in@google.net",
    phone: 27428180,
    address: "Ap #394-9883 Erat Rd.",
    password: "123456",
    role: "admin",
  },
  {
    id: 5,
    firstName: "Demetrius",
    lastName: "Adams",
    email: "elit.elit.fermentum@outlook.net",
    phone: 55179167,
    address: "Ap #755-5824 Tempus Ave",
    password: "123456",
    role: "simpleAdmin",
  },
  
];

export const user_requests: IUser[] = [
  {
    id: 1,
    firstName: "Candice",
    lastName: "Sanchez",
    email: "varius@outlook.net",
    phone: 97181578,
    address: "P.O. Box 720, 2593 Commodo Ave",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    firstName: "Urielle",
    lastName: "Johnston",
    email: "non.magna@icloud.edu",
    phone: 55172166,
    address: "P.O. Box 836, 3956 Sollicitudin Av.",
    password: "123456",
    role: "simpleAdmin",
  },
  {
    id: 3,
    firstName: "Baxter",
    lastName: "Knowles",
    email: "euismod@protonmail.edu",
    phone: 27411772,
    address: "Ap #896-1079 Ornare, St.",
    password: "123456",
    role: "simpleAdmin",
  },
  {
    id: 4,
    firstName: "Keefe",
    lastName: "Stephens",
    email: "congue.in@google.net",
    phone: 27428180,
    address: "Ap #394-9883 Erat Rd.",
    password: "123456",
    role: "admin",
  },
  {
    id: 5,
    firstName: "Demetrius",
    lastName: "Adams",
    email: "elit.elit.fermentum@outlook.net",
    phone: 55179167,
    address: "Ap #755-5824 Tempus Ave",
    password: "123456",
    role: "simpleAdmin",
  },
];

export const reviews: IReview[] = [
  {
    id: 1,
    email: "vitae.semper.egestas@hotmail.net",
    date: "Mar 17, 2023",
    message:
      "egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est ac mattis",
  },
  {
    id: 2,
    email: "metus.aenean.sed@protonmail.couk",
    date: "Aug 23, 2022",
    message:
      "in lobortis tellus justo sit amet nulla. Donec non justo. Proin non massa non",
  },
  {
    id: 3,
    email: "duis.mi@google.ca",
    date: "Feb 26, 2023",
    message:
      "odio. Phasellus at augue id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend nec,",
  },
  {
    id: 4,
    email: "vitae.nibh.donec@google.edu",
    date: "Mar 23, 2023",
    message:
      "luctus et ultrices posuere cubilia Curae Donec tincidunt. Donec vitae erat vel pede blandit",
  },
  {
    id: 5,
    email: "ante@hotmail.edu",
    date: "Apr 19, 2022",
    message:
      "semper pretium neque. Morbi quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam ac",
  },
];
export const appointments: IAppointment[] = [
  {
    id: 1,
    patientId: 2,
    medId: 6,
    startDate: new Date(2021, 3, 26, 9, 30),
    endDate: new Date(2021, 3, 26, 11, 30),
  },
  {
    id: 2,
    patientId: 3,
    medId: 6,
    startDate: new Date(2021, 3, 26, 13),
    endDate: new Date(2021, 3, 26, 14),
  },
  {
    id: 3,
    patientId: 3,
    medId: 7,
    startDate: new Date(2021, 3, 27, 10),
    endDate: new Date(2021, 3, 27, 11),
  },
  {
    id: 4,
    patientId: 5,
    medId: 8,
    startDate: new Date(2021, 3, 27, 13, 30),
    endDate: new Date(2021, 3, 27, 15),
  },
  {
    id: 5,
    patientId: 2,
    medId: 9,
    startDate: new Date(2021, 3, 26, 15),
    endDate: new Date(2021, 3, 26, 16, 15),
  },
  {
    id: 6,
    patientId: 5,
    medId: 10,
    startDate: new Date(2021, 3, 28, 9, 45),
    endDate: new Date(2021, 3, 28, 12),
  },
  {
    id: 7,
    patientId: 5,
    medId: 6,
    startDate: new Date(2021, 3, 28, 14, 30),
    endDate: new Date(2021, 3, 28, 16, 30),
  },
  {
    id: 8,
    patientId: 3,
    medId: 10,
    startDate: new Date(2021, 3, 27, 15, 30),
    endDate: new Date(2021, 3, 27, 16, 45),
  },
  {
    id: 9,
    patientId: 2,
    medId: 10,
    startDate: new Date(2021, 4, 3, 13),
    endDate: new Date(2021, 4, 3, 15),
  },
  {
    id: 10,
    patientId: 2,
    medId: 7,
    startDate: new Date(2021, 4, 4, 15, 30),
    endDate: new Date(2021, 4, 5),
  },
  {
    id: 11,
    patientId: 5,
    medId: 8,
    startDate: new Date(2021, 3, 30, 10),
    endDate: new Date(2021, 3, 30, 12),
  },
  {
    id: 12,
    patientId: 3,
    medId: 6,
    startDate: new Date(2021, 3, 30, 16, 30),
    endDate: new Date(2021, 3, 30, 18),
  },
  {
    id: 13,
    patientId: 2,
    medId: 10,
    startDate: new Date(2021, 4, 5, 10),
    endDate: new Date(2021, 4, 5, 11, 30),
  },
  {
    id: 14,
    patientId: 2,
    medId: 7,
    startDate: new Date(2021, 3, 30, 14, 30),
    endDate: new Date(2021, 3, 30, 16, 10),
  },
];
export const appointmentRequests: IAppointment[] = [
  {
    id: 1,
    patientId: 2,
    medId: 6,
    startDate: new Date(2021, 3, 26, 9, 30),
    endDate: new Date(2021, 3, 26, 11, 30),
  },
  {
    id: 2,
    patientId: 3,
    medId: 6,
    startDate: new Date(2021, 3, 26, 13),
    endDate: new Date(2021, 3, 26, 14),
  },
  {
    id: 3,
    patientId: 3,
    medId: 7,
    startDate: new Date(2021, 3, 27, 10),
    endDate: new Date(2021, 3, 27, 11),
  },
  {
    id: 4,
    patientId: 5,
    medId: 8,
    startDate: new Date(2021, 3, 27, 13, 30),
    endDate: new Date(2021, 3, 27, 15),
  },
  {
    id: 5,
    patientId: 2,
    medId: 9,
    startDate: new Date(2021, 3, 26, 15),
    endDate: new Date(2021, 3, 26, 16, 15),
  },
  {
    id: 6,
    patientId: 5,
    medId: 10,
    startDate: new Date(2021, 3, 28, 9, 45),
    endDate: new Date(2021, 3, 28, 12),
  },
  {
    id: 7,
    patientId: 5,
    medId: 6,
    startDate: new Date(2021, 3, 28, 14, 30),
    endDate: new Date(2021, 3, 28, 16, 30),
  },
  {
    id: 8,
    patientId: 3,
    medId: 10,
    startDate: new Date(2021, 3, 27, 15, 30),
    endDate: new Date(2021, 3, 27, 16, 45),
  },
  {
    id: 9,
    patientId: 2,
    medId: 10,
    startDate: new Date(2021, 4, 3, 13),
    endDate: new Date(2021, 4, 3, 15),
  },
  {
    id: 10,
    patientId: 2,
    medId: 7,
    startDate: new Date(2021, 4, 4, 15, 30),
    endDate: new Date(2021, 4, 5),
  },
  {
    id: 11,
    patientId: 5,
    medId: 8,
    startDate: new Date(2021, 3, 30, 10),
    endDate: new Date(2021, 3, 30, 12),
  },
  {
    id: 12,
    patientId: 3,
    medId: 6,
    startDate: new Date(2021, 3, 30, 16, 30),
    endDate: new Date(2021, 3, 30, 18),
  },
  {
    id: 13,
    patientId: 2,
    medId: 10,
    startDate: new Date(2021, 4, 5, 10),
    endDate: new Date(2021, 4, 5, 11, 30),
  },
  {
    id: 14,
    patientId: 2,
    medId: 7,
    startDate: new Date(2021, 3, 30, 14, 30),
    endDate: new Date(2021, 3, 30, 16, 10),
  },
];

export const types = [
  
  "A louer",
  "A vendre",
];
