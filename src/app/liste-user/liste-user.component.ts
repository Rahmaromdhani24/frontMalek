import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {

  users: any[] = []; // Liste des utilisateurs


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  
  

  // Récupérer la liste des utilisateurs
  getAllUsers(): void {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
      }
    });
  }

  // Rediriger vers le formulaire de modification
  editUser(id: string): void {
    this.router.navigate(['/modifier-utlisateur', id]);
  }


  // Supprimer un utilisateur
  deleteUser(userId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.authService.deleteUser(userId).subscribe({
        next: () => {
          alert('Utilisateur supprimé avec succès');
          this.getAllUsers(); // Actualiser la liste après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', err);
        }
      });
    }
  }
}