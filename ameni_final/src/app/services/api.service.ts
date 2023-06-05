
import { Injectable, Output, EventEmitter } from '@angular/core'; 
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class ApiService {
  
  @Output() getLoggedInName: EventEmitter<boolean> = new EventEmitter<boolean>();
baseUrl:string = "http://localhost/projet_angular/"; 
  redirectUrl: any;
constructor(private httpClient: HttpClient) { }

//login users 
// userlogin(email, password) {
//   return this.httpClient.post<any>(this.baseUrl + 'login.php', { email, password })
//     .pipe(map(Users => {
//       if (Users && Users.length > 0) {
//         const user = Users[0];
//         this.setToken('token', user.nom);
//         this.saveId(user.id);
//         this.saveNom(user.nom);
//         this.savePrenom(user.prenom);
//         this.saveRole(user.role);
//         this.saveEmail(user.email);
        
//         this.getLoggedInName.emit(true);
//         return Users;
//       } else {
//         throw new Error('User data is empty.');
//       }
//     }),
//       catchError(error => {
//         console.error('Error during user login:', error);
//         throw error; // Rethrow the error to be handled by the caller
//       }))
// }

login(email, password): Observable<any> {
  const requestData = { email, password };

  return this.httpClient.post<any>('http://localhost/projet_angular/login.php', requestData);
}

saveId(id: string) {
  localStorage.setItem('Id', id);
}
getId() {
  return localStorage.getItem('Id');
}

saveEmail(email: string) {
  localStorage.setItem('email', email);
}

getEmail() {
  return localStorage.getItem('email');
}

saveNom(nom: string) {
  localStorage.setItem('Nom', nom);
}

getNom() {
  return localStorage.getItem('nom');
}

savePrenom(prenom: string) {
  localStorage.setItem('Prnom', prenom);
}

getPrenom() {
  return localStorage.getItem('prenom');
}

saveRole(role: string) {
  localStorage.setItem('Role', role);
}

getRole() {
  return localStorage.getItem('Role');
}
setToken(key: string, token: string) {
  localStorage.setItem(key, token);
}

getToken(key: string) {
  return localStorage.getItem(key);
}

deleteToken(key: string) {
  localStorage.removeItem(key);
}

isLoggedIn() {
  return this.getToken('token') != null;
}






clearSavedData() {
  localStorage.removeItem('Name');
  localStorage.removeItem('Role');
  localStorage.removeItem('email');
  localStorage.removeItem('Id');
  
}



public userregistration (nom: any, prenom: any, email: any, password: any, telephone: any ,prof: any,  adresse: any )
{
return this.httpClient.post<any>(this.baseUrl + 'register.php',
{
 nom,
 prenom,
 email, 
 password,
 adresse, 
 prof,
 telephone 

})
.pipe(map (User => {
return User;
}));
}


public addAdmin (nom: any, prenom: any, email: any, password: any, telephone: any ,  adresse: any )
{
return this.httpClient.post<any>(this.baseUrl + 'addAdmin.php',
{
 nom,
 prenom,
 email, 
 password,
 adresse, 
 telephone 

})
.pipe(map (User => {
return User;
}));
}


public ajouter_reclamation (nom: any, email: any, message: any )
{
return this.httpClient.post<any>(this.baseUrl + 'ajouter_reclamation.php',
{
 nom,
 email, 
 message

})
.pipe(map (Reclamation => {
return Reclamation;
}));
}


public updateUser (f: any)
{  return this.httpClient.post<any>(this.baseUrl + 'updateUser.php', f);
}

public acceptAnnonce (id: any  )
{
return this.httpClient.post<any>(this.baseUrl + 'acceptAnnonce.php',
{

 id

})
.pipe(map (Annonce => {
return Annonce;
}));
}


public refuserAnnonce (id: any  )
{
return this.httpClient.post<any>(this.baseUrl + 'refuserAnnonce.php',
{

 id

})
.pipe(map (Annonce => {
return Annonce;
}));
}


public updateUsers (id: any ,nom: any, prenom: any, email: any, password: any, telephone: any ,  adresse: any )
{
return this.httpClient.post<any>(this.baseUrl + 'updateUsers.php',
{
 nom,
 prenom,
 email, 
 adresse, 
 telephone ,
 password,
 id

})
.pipe(map (User => {
return User;
}));
}

public read_reclamation() {
    return this.httpClient.get<any>(this.baseUrl + 'read_reclamations.php')
      .pipe(map(reclamations => {
        return reclamations;
      }));
  }

  public get_users() {
    return this.httpClient.get<any>(this.baseUrl + 'getUsers.php')
      .pipe(map(users => {
        return users;
      }));
  }

  public getAnnonces() {
    return this.httpClient.get<any>(this.baseUrl + 'getAnnonces.php')
      .pipe(map(annonces => {
        return annonces;
      }));
  }
  public getOneAnnonce(id: any){
    return this.httpClient.get<any>(this.baseUrl + 'getOneAnnonce.php?id=' +id);
  }

  public getAnnoncesAdmin() {
    return this.httpClient.get<any>(this.baseUrl + 'getAnnoncesAdmin.php')
      .pipe(map(annonces => {
        return annonces;
      }));
  }

  getUserById(userId: any) {
    return this.httpClient.get<any>(this.baseUrl + 'userDetails.php?id='+userId);
  }

  getMesannonces(userId: any) {
    return this.httpClient.get<any>(this.baseUrl + 'getMesannonce?id='+userId);
  }

  

  public readMesAnnonces(id:any): Observable<User> {
    return this.httpClient.get<any>(this.baseUrl + 'readMesAnnonces.php?id='+id)
      .pipe(map(annonces => {
        return annonces;
      }));
  }

  public deleteReclamation( id:any) {
    return this.httpClient.get<any>(this.baseUrl+'deleteReclamation.php?id='+id);
  }

  public deleteUser( id:any) {
    return this.httpClient.get<any>(this.baseUrl+'deleteUser.php?id='+id);
  }
  
  
  public deleteAnnonce( id:any) {
    return this.httpClient.get<any>(this.baseUrl+'deleteAnnonce.php?id='+id);
  }

  getAnnonceById(id: any) {
    return this.httpClient.get<any>(
      this.baseUrl+'getOneAnnonce?id='+id
    );
  }

   //update annonce
   updateAnnonce(form: any) {
    return this.httpClient.get<any>(
      this.baseUrl+'updateAnnonce',form
    );
  }

}

