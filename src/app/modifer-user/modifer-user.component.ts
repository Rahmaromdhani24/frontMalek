import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifer-user',
  templateUrl: './modifer-user.component.html',
  styleUrls: ['./modifer-user.component.css']
})
export class ModiferUserComponent implements OnInit {

  editUserForm!: FormGroup;
  userId!: string; // ID de l'utilisateur à modifier

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.editUserForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });

    // Récupérer l'utilisateur par son ID
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.authService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.editUserForm.patchValue(user);
       
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données utilisateur:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      const updatedUser = this.editUserForm.value;

      // Appel du service pour mettre à jour l'utilisateur
      this.authService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          alert('Utilisateur modifié avec succès');
          this.router.navigate(['/liste-utlisateurs']);
        },
        error: (err) => {
          console.error('Erreur lors de la modification de l\'utilisateur:', err);
        }
      });
    }
  }
}