import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from './User.module';
// import { ApiResponse } from './User.module';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  authForm: FormGroup;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.valid) {
      const { username, password } = this.authForm.value;
      this.authService.login(username, password).subscribe(
        (user: User | null) => {
          if (user) {
            // Rediriger selon le rôle de l'utilisateur
            if (this.authService.isAdmin(user)) {
              this.router.navigate(['/admin']); // Redirige vers le tableau de bord admin
            } else {
              this.router.navigate(['/user']); // Redirige vers le tableau de bord utilisateur
            }
          } else {
            this.loginError = true; // Affiche un message d'erreur si la connexion échoue
          }
        },
        (error) => {
          console.error('Erreur lors de la connexion', error);
          this.loginError = true; // Affiche un message d'erreur si une erreur se produit
        }
      );
    }
  }
}
