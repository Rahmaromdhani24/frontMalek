import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './connexion/User.module';
import { filter } from 'rxjs/operators'; 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pointage Blachere';
  showHeaderAndSidebar: boolean = true;
  sideNavStatus: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Filtre pour n'exécuter qu'après la fin de chaque navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showHeaderAndSidebar = this.router.url !== '/connexion';
        this.checkUserRole(); // Vérifie le rôle après chaque navigation
      });

    // Initialisation du rôle de l'utilisateur lors du démarrage
    this.checkUserRole();
  }

  checkUserRole(): void {
    this.authService.getCurrentUser().subscribe((user: User | null) => {
      this.isAdmin = this.authService.isAdmin(user);
    });
  }
}