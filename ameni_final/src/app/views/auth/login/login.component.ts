import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string;
  @Output() getLoggedInName: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
    this.navRole();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
  
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
  
    this.authService.login(email, password).pipe(first()).subscribe(
      (data: any) => {
        // Successful login
        if (data && data.length > 0) {
          const user = data[0];
          this.setToken('token', user.nom);
          this.saveId(user.id);
          this.saveNom(user.nom);
          this.savePreom(user.prenom);
          this.saveRole(user.role);
          this.saveEmail(user.email);
          console.log(user);
          // Save user data or perform any necessary actions
  
          // Redirect to the desired page based on the user's role
          
          location.reload();
        } else {
          this.loginError = 'User name or password is incorrect';
        }
      },
      (error) => {
        // Login error
        console.error(error);
        this.loginError = 'Error during login. Please try again.';
      }
    );
  }

  navRole(){
  switch (localStorage.getItem('Role')) {
    case 'admin':
      window.location.replace('/admin/profile');
      break;
    case 'simpleAdmin':
      window.location.replace('/admin/profile');
      break;
    case 'user':
      window.location.replace('/user/profile');
      break;
    default:
      this.loginError = 'Unknown user role.';
      console.log(localStorage.getItem('Role'))
  }
}

  setToken(key: string, token: string) {
    localStorage.setItem(key, token);
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
    return localStorage.getItem('Nom');
  }

  savePreom(prenom: string) {
    localStorage.setItem('Prenom', prenom);
  }

  getPrenom() {
    return localStorage.getItem('Prenom');
  }

  saveRole(role: string) {
    localStorage.setItem('Role', role);
  }

  getRole() {
    return localStorage.getItem('Role');
  }

  




  clearSavedData() {
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
    localStorage.removeItem('Role');
    localStorage.removeItem('email');
    localStorage.removeItem('Id');
    
  }

  getToken(key: string) {
    return localStorage.getItem(key);
  }

  isLoggedIn() {
    return this.getToken('token') != null;
    
  }
 
}
