import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Chef, Classe, Employee, EtatCivil, Genre, ModePaiement, Service, TypeContrat } from '../ajouter-employee/employee.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modifier-employee',
  templateUrl: './modifier-employee.component.html',
  styleUrls: ['./modifier-employee.component.css']
})
export class ModifierEmployeeComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';

  employeForm: FormGroup;
  employe!: Employee;
  chefs = Object.values(Chef);
  classes = Object.values(Classe);
  services = Object.values(Service);
  genres = Object.values(Genre);
  etatsCivil = Object.values(EtatCivil);
  modesPaiement = Object.values(ModePaiement);
  typesContrat = Object.values(TypeContrat);


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeForm = this.fb.group({
      matr: [{ value: '', disabled: true }, Validators.required],
      nom_et_prenom_employee: ['', Validators.required],
      nom_et_prenom_employee_pere: ['', Validators.required],
      nom_de_chef: ['', Validators.required],
      classe: ['', Validators.required],
      serv: ['', Validators.required],
      date_nais: ['', Validators.required],
      Age: [{ value: '', disabled: true  }],
      sf: ['', Validators.required],
      etat: ['', Validators.required],
      NB_ENF: ['', Validators.required],
      date_recr: ['', Validators.required],
      type_de_contrat: ['', Validators.required],
      Fin_contr: ['', Validators.required],
      Alerte: [''],
      REMARQUE: [''],
      taille: ['', Validators.required],
      pointure: ['', Validators.required],
      n_tel: ['', Validators.required],
      mode_pay: ['', Validators.required],
      BANK: ['', Validators.required],
      RIB: ['', Validators.required],
      QUITTE_LE: [''],
      cin: ['', Validators.required],
      test: [''],
      domici_irre_salaire: ['']
    });
  }

  ngOnInit(): void {
    const matr = Number(this.route.snapshot.paramMap.get('matr'));
    this.employeeService.getEmployeeByMatricule(matr).subscribe((employe) => {
      this.employe = employe;
      this.employeForm.patchValue(employe);
    });
  }

  calculateAge() {
    const dateNais = new Date(this.employeForm.get('Date_nais')?.value);
    const today = new Date();
    let age = today.getFullYear() - dateNais.getFullYear();
    const monthDiff = today.getMonth() - dateNais.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateNais.getDate())) {
        age--;
    }

    this.employeForm.get('Age')?.setValue(age);
}
onSubmit(): void {
  if (this.employeForm.valid) {
    const updateEmployee: Employee = { ...this.employe, ...this.employeForm.value };
    this.employeeService.modifierEmployee(this.employe.matr, updateEmployee).subscribe({
      next: () => {
        this.successMessage = 'Les modifications ont été enregistrées avec succès !';
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.router.navigate(['/liste-employee']);
      },
      error: () => {
        this.errorMessage = 'Il y a eu une erreur lors de l\'enregistrement des modifications.';
        this.successMessage = ''; // Réinitialiser le message de succès
      }
    });
  }
}
retour(): void {
  this.router.navigate(['/liste-employee']);
}
}