import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PointageService } from '../services/pointage.service';

@Component({
  selector: 'app-autres',
  templateUrl: './autres.component.html',
  styleUrls: ['./autres.component.css']
})
export class AutresComponent implements OnInit {
  matr: number = 0;
  Nom_Et_Prenom_Employee: string = '';   // Pour stocker le nom
  autresForm: FormGroup;  // Le formulaire pour les autres informations

  // Les options pour le sélecteur d'état
  etatOptions = [
    { label: 'Absent Non Justifié', value: 'absNj' },
    { label: 'Absent Long Terme', value: 'absLt' },
    { label: 'Absent Court Terme', value: 'absCt' },
    { label: 'Absent AUT', value: 'absAut' },
    { label: 'Absent PAY', value: 'absPay' },
    { label: 'Retard', value: 'ret' },
    { label: 'Retard Autorisé', value: 'retEtAut' },
    { label: 'Congé', value: 'cgAnn' },
    { label: 'Mise à Pied', value: 'maPied' },
    { label: 'Jour Férié', value: 'jf' }
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private pointageService: PointageService  // Injection du service
  ) {
    // Créer le formulaire réactif
    this.autresForm = this.fb.group({
      dateDebut: [''],  // Date début de la période
      dateFin: [''],    // Date fin de la période
      etat: ['']        // État (Absent/Autorisé)
    });
  }

  ngOnInit(): void {
    // Récupérer les paramètres depuis l'URL
    this.route.params.subscribe(params => {
      this.matr = +params['matr'];  // Convertir en nombre (utilisation de l'opérateur +)
      this.Nom_Et_Prenom_Employee = params['Nom_Et_Prenom_Employee'];    // Récupérer le nom
    });
  }

  // Méthode pour enregistrer les informations supplémentaires
  onSubmit(): void {
    if (this.autresForm.valid) {
      const { dateDebut, dateFin, etat } = this.autresForm.value;
  
      // Appeler le service pour enregistrer les informations supplémentaires
      this.pointageService.updatePointageDetails(this.matr, dateDebut, dateFin, etat).subscribe({
        next: () => {
          alert('Informations supplémentaires enregistrées avec succès');
          this.router.navigate(['/Pointage']); // Rediriger vers la page des pointages
        },
        error: (err: any) => {
          console.error('Erreur lors de l\'enregistrement des informations:', err);
          if (err.message === 'Pointage non trouvé') {
            alert('Erreur : Pointage non trouvé pour ce matricule.');
          } else {
            alert('Erreur lors de l\'enregistrement. Veuillez réessayer.');
          }
        }
      });
    } else {
      alert('Veuillez corriger les erreurs dans le formulaire.');
    }
  }
  
}