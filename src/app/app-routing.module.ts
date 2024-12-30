import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { AjouterEmployeeComponent } from './ajouter-employee/ajouter-employee.component';
import { PointageComponent } from './pointage/pointage.component';
import { ModifierEmployeeComponent } from './modifier-employee/modifier-employee.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { RecapComponent } from './recap/recap.component';
import { FicheSuiviteComponent } from './fiche-suivite/fiche-suivite.component';
import { VoirDetailsComponent } from './voir-details/voir-details.component';
import { HistoriquePointagesComponent } from './historique-pointages/historique-pointages.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarUserComponent } from './sidebar-user/sidebar-user.component';
import { AjouterUserComponent } from './ajouter-user/ajouter-user.component';
import { ListeUserComponent } from './liste-user/liste-user.component';
import { ModiferUserComponent } from './modifer-user/modifer-user.component';
import { AutresComponent } from './autres/autres.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:"connexion",component:ConnexionComponent},
  {path:"admin",component:SidebarComponent},
  {path:"user",component:SidebarUserComponent},
  {path:"Profile",component:ProfileComponent},




  { path:"liste-employee",component:EmployeeComponent},
  {path:"ajouter-employee",component:AjouterEmployeeComponent},
  {path:"modifier-employee/:matr",component:ModifierEmployeeComponent},


  {path:"historique-pointage",component:HistoriquePointagesComponent},
  {path:"Pointage",component:PointageComponent},
  {path:"autres/:Nom_Et_Prenom_Employee/:matr",component:AutresComponent},

 
   {path:"ajouter-utlisateur",component:AjouterUserComponent},
  { path:"liste-utlisateurs",component:ListeUserComponent},
  { path:"modifier-utlisateur/:id",component:ModiferUserComponent},
  
  {path:"recap",component:RecapComponent},
  {path:"Fiche_Suivite/:matr",component:FicheSuiviteComponent},
  {path:"details-employee/:matr",component:VoirDetailsComponent},
  { path:"",redirectTo:"/connexion",pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
