import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../ajouter-employee/employee.module';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { EtatPointageMonthly } from '../pointage/EtatPointageMonthly .module';
import { PointageService } from '../services/pointage.service';

@Component({
  selector: 'app-fiche-suivite',
  templateUrl: './fiche-suivite.component.html',
  styleUrls: ['./fiche-suivite.component.css']
})
export class FicheSuiviteComponent implements OnInit {
  @ViewChild('printSection') printSection!: ElementRef;
  selectedEmployee?: Employee;
  alert: number = 0;
  etatPointagesMonthly: EtatPointageMonthly[] = [];
  filteredEtatPointagesMonthly: EtatPointageMonthly[] = [];
  selectedYear: number = new Date().getFullYear();
  years: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private pointageService: PointageService
  ) {}
  ngOnInit(): void {
    const matrStr = this.route.snapshot.paramMap.get('matr');
    const matr = matrStr ? Number(matrStr) : NaN;
  
    if (!isNaN(matr)) {
      // Récupération des détails de l'employé
      this.employeeService.getEmployeeByMatricule(matr).subscribe(
        (employee) => {
          this.selectedEmployee = employee;
          if (this.selectedEmployee && this.selectedEmployee.fin_contr) {
            this.calculateAlert(this.selectedEmployee.fin_contr); // Calcul de l'alerte de fin de contrat
          }
          this.loadPointages(matr); // Chargement des états de pointage
        },
        (error) => {
          console.error("Erreur lors de la récupération des détails de l'employé", error);
        }
      );
  
      const currentYear = new Date().getFullYear();
      this.years = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];
    }
  }
  

  loadPointages(matr: number): void {
    this.pointageService.getPointagesMensuels(matr, this.selectedYear).subscribe(
      (etatPointagesMonthly) => {
        this.etatPointagesMonthly = etatPointagesMonthly;
        this.filteredEtatPointagesMonthly = this.etatPointagesMonthly; // Filtrage si nécessaire
      },
      (error) => {
        console.error('Erreur lors de la récupération des états de pointage mensuels', error);
      }
    );
  }
  

  onYearChange(): void {
    if (this.selectedEmployee?.matr) {
      this.loadPointages(this.selectedEmployee.matr);
    }
  }

  calculateAlert(finContrat: Date): void {
    const finContratDate = new Date(finContrat);
    const currentDate = new Date();
    const diffDays = Math.floor((finContratDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    this.alert = diffDays <= 30 ? 1 : 0;
  }

  retour(): void {
    this.router.navigate(['/liste-employee']);
  }
  //impression
  printPage(): void {
    setTimeout(() => {
      if (this.printSection) {
        const printContent = this.printSection.nativeElement.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
      } else {
        console.error('La section à imprimer est introuvable.');
      }
    }, 0);
  }
}