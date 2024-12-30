import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Chef, Classe, Employee, EtatCivil, ModePaiement, Service, TypeContrat } from './employee.module';

@Component({
  selector: 'app-ajouter-employee',
  templateUrl: './ajouter-employee.component.html',
  styleUrls: ['./ajouter-employee.component.css']
})
export class AjouterEmployeeComponent implements OnInit {
  @ViewChild('printSection') printSection!: ElementRef;
  test: string = ''; 
  employeeForm!: FormGroup;
  classes = Classe;
  etatsCivils = EtatCivil;
  modesPaiement = ModePaiement;
  typesContrat = TypeContrat;
  chefs = Chef;
  services = this.getEnumValues(Service);

  constructor(private router: Router, private fb: FormBuilder, private service: EmployeeService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      cin: ['', [Validators.required, Validators.pattern('^\\d{8}$'), Validators.minLength(8), Validators.maxLength(8)]],
      n_tel: ['', [Validators.required, Validators.pattern('^\\d{1,8}$'), Validators.minLength(1), Validators.maxLength(8)]],
      nom_et_prenom_employee: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s\'-]+$')]],
      nom_et_prenom_employee_pere: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s\'-]+$')]],
      date_nais: ['', Validators.required],
      pointure: [null, [Validators.min(1), Validators.max(50)]],
      taille: [null, [Validators.min(30), Validators.max(200)]],
      rib: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,23}$'), Validators.minLength(1), Validators.maxLength(23)]],
      mode_pay: ['', Validators.required],
      bank: [''],
      sf: ['', Validators.required],
      etat: ['', Validators.required],
      nb_enf: [null],
      test: [null, Validators.required],
      domici_irre_salaire: [null, Validators.required],
    });
  }

  ajouterEmployee(f: NgForm): void {
    if (f.valid) {
      const employe: Employee = f.value;
      this.service.ajoutEmployee(employe).subscribe(() => {
        console.log('Employé ajouté avec succès');
        this.router.navigate(['/liste-employee']);
      }, error => {
        console.error('Erreur lors de l\'ajout de l\'employé :', error);
      });
    } else {
      console.error('Formulaire invalide');
    }
  }

  private isOnlyLetters(input: string): boolean {
    const pattern = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    return pattern.test(input);
  }

  private getEnumValues(enumObj: any): Array<{ key: string, value: string }> {
    return Object.keys(enumObj).map(key => ({ key, value: enumObj[key] }));
  }
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