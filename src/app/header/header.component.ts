import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout(); // Appel de la méthode de déconnexion
    this.router.navigate(['/connexion']); // Redirige vers la page de connexion
  }
  Profile() {
    this.router.navigate(['/Profile']); // Adaptez cela selon le chemin de votre route
  }

  ngOnInit(): void {
  }

  toggleSideNav(): void {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus); 
  }
}
