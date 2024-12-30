import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../connexion/User.module';


@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {
  @Input() sideNavStatus: boolean = false; // État du side nav
  @Input() isAdmin: boolean = false; // Rôle de l'utilisateur  constructor() { }


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Récupérez l'utilisateur actuel
   
      this.authService.getCurrentUser().subscribe((user: User | null) => {

      this.isAdmin = this.authService.isAdmin(user);
    });
  }
}