import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../ajouter-employee/employee.module';

@Component({
  selector: 'app-voir-details',
  templateUrl: './voir-details.component.html',
  styleUrls: ['./voir-details.component.css']
})
export class VoirDetailsComponent implements OnInit {
  selectedEmployee?: Employee;
  alerte: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const matr = Number(this.route.snapshot.paramMap.get('matr'));
    console.log('Matricule récupéré dans ngOnInit de VoirDetailsComponent :', matr);

    if (matr) {
      this.employeeService.getEmployeeByMatricule(matr).subscribe(
        (employee) => {
          this.selectedEmployee = employee;
          console.log('Employé récupéré :', this.selectedEmployee);

          // Vérifier si l'employé existe et si les champs test et domici_irre_salaire sont corrects
          if (this.selectedEmployee) {
            // Calculer l'alerte pour la fin de contrat
            if (this.selectedEmployee.fin_contr) {
              this.calculateAlert(this.selectedEmployee.fin_contr);
            } else {
              console.error('La date de fin de contrat est manquante ou incorrecte');
            }
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails de l\'employé', error);
        }
      );
    }
  }

  retour(): void {
    this.router.navigate(['/liste-employee']);
  }

  private calculateAlert(finContrat: Date): void {
    const today = new Date();
    const finContratDate = new Date(finContrat);
    console.log('Date de fin de contrat :', finContratDate);

    // Calculer la différence de jours entre la date de fin de contrat et aujourd'hui
    const diffTime = finContratDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Mettre à jour la valeur de alert
    this.alerte = diffDays <= 15 ? 1 : 0;
    console.log('Alerte calculée :', this.alerte);

    // Mettre à jour la propriété Alerte de l'employé
    if (this.selectedEmployee) {
      this.selectedEmployee.alerte = this.alerte;
    }
  }
}