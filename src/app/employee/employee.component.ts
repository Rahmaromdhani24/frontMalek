import { Component,ElementRef,OnInit, ViewChild, } from '@angular/core';
import { Employee } from '../ajouter-employee/employee.module';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('printSection') printSection!: ElementRef;
  employeesF: Employee[] = [];
  searchNom: string = '';
  searchMatricule: string = '';

  constructor(private router: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (employees) => this.employeesF = employees,
      (error) => console.error('Erreur lors de la récupération des employés', error)
    );
  }

  updateEmployee(matr: number): void {
    this.router.navigate(['/modifier-employee', matr]);
  }

  supprimer(matr: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.employeeService.supprimerEmployee(matr).subscribe(
        () => {
          this.getAllEmployees(); // Recharge la liste après la suppression
          alert('Employé supprimé avec succès.');
        },
        (error) => console.error('Erreur lors de la suppression de l\'employé', error)
      );
    }
  }

  voirDetails(matr: number): void {
    this.router.navigate(['/details-employee', matr]);
  }

  ficheSuivite(matr: number): void {
    this.router.navigate(['/Fiche_Suivite', matr]);
  }

  rechercherParNom(): void {
    if (this.searchNom.trim() === '') {
      this.getAllEmployees(); // Récupère tous les employés si le champ de recherche est vide
    } else {
      this.employeeService.rechercherParNom(this.searchNom).subscribe(
        (employees) => this.employeesF = employees,
        (error) => console.error('Erreur lors de la recherche par nom', error)
      );
    }
  }

  rechercherParMatricule(): void {
    if (this.searchMatricule.trim() === '') {
      this.getAllEmployees(); // Récupère tous les employés si le champ de recherche est vide
    } else {
      this.employeeService.rechercheparmatr(this.searchMatricule).subscribe(
        (employees) => this.employeesF = employees,
        (error) => console.error('Erreur lors de la recherche par matricule', error)
      );
    }
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