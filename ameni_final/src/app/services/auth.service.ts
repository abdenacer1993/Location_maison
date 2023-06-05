import { Injectable } from "@angular/core";
import { users } from "../lib/dummy";
import { getLocalUser, isLoggedIn, login, logout } from "../lib/storage";
import { ILocalUser, IUser } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { ApiService } from "./api.service";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  private baseUrl = "http://localhost/projet_angular/";
  constructor(private httpClient: HttpClient, private dataService: ApiService) {}

  // login(userData: ILocalUser) {
  //   login(userData);
  // }
  logout() {
    const key = 'token'; // Provide the appropriate key for your token
    this.dataService.deleteToken(key);
    this.dataService.clearSavedData();
    window.location.href = window.location.href;
  }
  
    
  login(email: string, password: string): Observable<any> {
    const requestData = { email, password };
  
    return this.httpClient.post<any>(this.baseUrl + 'login.php', requestData);
    console.log(requestData)
  }
   
   


  loging(email: string, password: string) {
    return this.httpClient.post<any>(this.baseUrl + "login.php", { email, password }).pipe(
      map((response: any) => {
        const users = response.users;
        if (users && users.length > 0) {
          const user = users[0];
          this.setToken('token', user.nom);
          this.saveId(user.id);
          this.saveNom(user.nom);
          this.savePrenom(user.prenom);
          this.saveRole(user.role);
          this.saveEmail(user.email);
          return user;
        } else {
          throw new Error('User data is empty.');
        }
      }),
      catchError((error: any) => {
        console.error('Error during user login:', error);
        return throwError(error);
      })
    );
  }

  setToken(key: string, token: string) {
    localStorage.setItem(key, token);
  }

  getToken(key: string) {
    return localStorage.getItem(key);
  }

  private saveId(id: string) {
    // Implement the logic to save the user id
    localStorage.setItem('Id', id);
  }

  private saveNom(nom: string) {
    // Implement the logic to save the user nom
   
    localStorage.setItem('Nom', nom);
  }

 

 
 
  
  

  private savePrenom(prenom: string) {
    // Implement the logic to save the user prenom
    localStorage.setItem('Prnom', prenom);
  }

  private saveRole(role: string) {
    // Implement the logic to save the user role
    localStorage.setItem('Role', role);
  }

  private saveEmail(email: string) {
    // Implement the logic to save the user email
    localStorage.setItem('Email', email);
  }


   getConnectedUser() {
     const localData: ILocalUser = getLocalUser();
     if (!localData) return;
     const { email } = localData;
     const user: IUser = users.find((user) => user.email === email);
     return user;
   }
  getIsUser() {
    // const localData: ILocalUser = getLocalUser();
    // if (!localData) return false;
    return localStorage.getItem('Role') === "user" ? true : false;
  }
  getIsAdmin() {
    // const localData: ILocalUser = getLocalUser();
    // if (!localData) return false;
    return localStorage.getItem('Role') === "admin" ? true : false;
  }
  getIsSimpleAdmin() {
    // const localData: ILocalUser = getLocalUser();
    // if (!localData) return false;
    return localStorage.getItem('Role') === "simpleAdmin" ? true : false;
  }
  getIsConnected() {
     const isAuth: boolean = this.getToken('token') != null;
     return isAuth;
     
  }

}
