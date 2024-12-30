import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../connexion/User.module';
// import {  } from '../connexion/User.module';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() sideNavStatus: boolean = false; // État du side nav
  @Input() isAdmin: boolean = false; 

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Récupérez l'utilisateur actuel
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      this.isAdmin = this.authService.isAdmin(user);  // Mise à jour du rôle admin
    });
  }
}