import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const user = this.authService.getUserById(); // Obtenez les données utilisateur
    // this.profileForm = this.fb.group({
    //   username: [user.username, [Validators.required]],
    //   password: ['', [Validators.minLength(6)]],
    //   confirmPassword: [''],
    // });
  }

  onSubmit(): void {
  //   if (this.profileForm.invalid) return;

  //   const { username, password, confirmPassword } = this.profileForm.value;

  //   if (password !== confirmPassword) {
  //     alert('Les mots de passe ne correspondent pas.');
  //     return;
  //   }

  //   this.authService.updatePassword(username, password).subscribe({
  //     next: () => {
  //       alert('Mot de passe mis à jour avec succès.');
  //       this.router.navigate(['/dashboard']); // Redirigez si nécessaire
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       alert('Une erreur est survenue lors de la mise à jour.');
  //     },
  //   });
  // }
}
}