import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PointageService } from '../services/pointage.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../ajouter-employee/employee.module';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const heuresValidator = (control: AbstractControl) => {
  const value = control.value;
  if (value < 0) return { negative: true }; // Ne pas accepter de valeur négative
  if (value > 16) return { exceedsLimit: true }; // Ne pas dépasser 16 heures
  return null;
};

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {
  @ViewChild('printSection') printSection!: ElementRef;
  pointageForm: FormGroup;
  employees: any[] = [];
  currentDate = new Date();
  searchNom: string = '';
  searchMatricule: string = '';
  showEtat: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private pointageService: PointageService,
    private router: Router
  ) {
    this.pointageForm = this.fb.group({
      pointages: this.fb.array([])  // FormArray pour gérer plusieurs pointages
    });
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe(employees => {
      this.employees = employees;
      this.initForm();
    });
  }

  initForm(): void {
    const pointageArray = this.pointageForm.get('pointages') as FormArray;
    this.employees.forEach(employee => {
      const group = this.fb.group({
        matr: [employee.matr],
        Nom_Et_Prenom_Employee: [employee.Nom_Et_Prenom_Employee],
        N_TEL: [employee.N_TEL],
        Service: [employee.Service],
        present: [0, [Validators.required, heuresValidator]],      
        absentNonJustifie: [0, Validators.required],
        Absence: [0, Validators.required],
        absentCourtTerme: [0, Validators.required],
        absentLongTerme: [0, Validators.required],
        absentAut: [0, Validators.required],
        absentPay: [0, Validators.required],
        autorisation: [0, [Validators.required, heuresValidator]],
        retard: [0, [Validators.required, heuresValidator]],
        retardAutorise: [0, [Validators.required, heuresValidator]],
        conge: [0, Validators.required],
        miseAPied: [0, Validators.required],
        jourFerie: [0, Validators.required],
        remarque: [''],
        date: [new Date().toISOString(), Validators.required],
        creationId: [new Date().getTime().toString()],
        modificationTimestamp: [null],
        modificationId: [null],
        nbhtravaille: [0]  // Calcul des heures travaillées à partir des valeurs des autres champs
      });

      pointageArray.push(group);
    });
  }

  get pointages(): FormArray {
    return this.pointageForm.get('pointages') as FormArray;
  }

  onSubmit(): void {
    if (this.pointageForm.valid) {
      const pointages = this.pointageForm.value.pointages.map((pointage: any) => ({
        ...pointage,
        nbhtravaille: pointage.present - pointage.autorisation
      }));
  
      // Appel de la méthode du service avec les deux arguments : pointages et currentDate
      this.pointageService.ajouterPointagesPourTous(pointages, this.currentDate.toISOString()).subscribe({
        next: () => {
          alert('Pointages enregistrés avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de l\'enregistrement des pointages:', err);
        }
      });
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire.');
    }
  }
  

  // Méthode pour importer un fichier
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = reader.result as string;
        // Traitez le contenu du fichier ici
        console.log(fileContent);
      };

      reader.readAsText(file); // Ou utilisez readAsBinaryString si nécessaire
    }
  }

  filteredPointages(): any[] {
    return this.pointages.controls.filter(pointage => {
      const nom = pointage.get('Nom_Et_Prenom_Employee')?.value.toLowerCase();
      const matricule = pointage.get('matr')?.value.toString();
      return (
        (!this.searchNom || nom.includes(this.searchNom.toLowerCase())) &&
        (!this.searchMatricule || matricule.includes(this.searchMatricule))
      );
    });
  }

  // Méthode pour naviguer vers un autre détail d'un employé
  autres(Nom_Et_Prenom_Employee: string, matr: number): void {
    this.router.navigate(['/autres', Nom_Et_Prenom_Employee, matr]);
  }

  // Impression de la section
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