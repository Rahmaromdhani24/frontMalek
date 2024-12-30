import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import {MatIconModule} from '@angular/material/icon';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from './header/header.component';
import { PointageComponent } from './pointage/pointage.component';
import { AjouterEmployeeComponent } from './ajouter-employee/ajouter-employee.component';
import { ModifierEmployeeComponent } from './modifier-employee/modifier-employee.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ConnexionComponent } from './connexion/connexion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecapComponent } from './recap/recap.component';
import { FicheSuiviteComponent } from './fiche-suivite/fiche-suivite.component';
import { VoirDetailsComponent } from './voir-details/voir-details.component';
import { ModifierPointageComponent } from './modifier-pointage/modifier-pointage.component';
import { HistoriquePointagesComponent } from './historique-pointages/historique-pointages.component';
import { EmployeeService } from './services/employee.service';
import { SidebarUserComponent } from './sidebar-user/sidebar-user.component';
import { AutresComponent } from './autres/autres.component';
import { AjouterUserComponent } from './ajouter-user/ajouter-user.component';
import { ModiferUserComponent } from './modifer-user/modifer-user.component';
import { ListeUserComponent } from './liste-user/liste-user.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    HeaderComponent,
    AjouterEmployeeComponent,
    ModifierEmployeeComponent,
    ConnexionComponent,
    SidebarComponent,
    RecapComponent,
    FicheSuiviteComponent,
    VoirDetailsComponent,
    PointageComponent,
    ModifierPointageComponent,
    HistoriquePointagesComponent,
    SidebarUserComponent,
  
    AutresComponent,
    AjouterUserComponent,
    ModiferUserComponent,
    ListeUserComponent,
    ProfileComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    FontAwesomeModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]

})
export class AppModule { }
