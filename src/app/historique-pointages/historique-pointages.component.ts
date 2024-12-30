import { Component, OnInit } from '@angular/core';
import { Pointage } from '../pointage/pointage.module';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PointageService } from '../services/pointage.service';

@Component({
  selector: 'app-historique-pointages',
  templateUrl: './historique-pointages.component.html',
  styleUrls: ['./historique-pointages.component.css']
})
export class HistoriquePointagesComponent implements OnInit {
  pointages: any[] = []; // Liste complète des pointages
  filteredPointages: any[] = []; // Pointages filtrés par date
  selectedDate!: string; // Date sélectionnée
  selectedPointage: any; // Pointage actuellement sélectionné
  isEditModalOpen: boolean = false; // Si le modal est ouvert

  constructor() {}

  ngOnInit(): void {
    this.fetchPointages(); // Charger les pointages
  }

  // Simule la récupération des données depuis une API
  fetchPointages(): void {
    this.pointages = [
      {
        matr: '001',
        nomPrenom: 'Ahmed Ben Ali',
        service: 'Débitage',
        date: '2024-12-20',
        etat: 'Présent'
      },
      {
        matr: '002',
        nomPrenom: 'Fatima Lamine',
        service: 'Soudure',
        date: '2024-12-20',
        etat: 'Absent Non Justifié'
      },
      {
        matr: '003',
        nomPrenom: 'Yassine Hamdi',
        service: 'Peinture',
        date: '2024-12-21',
        etat: 'Autorisation'
      }
    ];
    this.filteredPointages = [...this.pointages]; // Initialiser avec toutes les données
  }

  // Filtrer les pointages par date
  filterPointage(): void {
    if (this.selectedDate) {
      this.filteredPointages = this.pointages.filter(
        (pointage) => pointage.date === this.selectedDate
      );
    } else {
      this.filteredPointages = [...this.pointages]; // Aucune date sélectionnée, afficher tout
    }
  }

  // Ouvrir le modal pour modifier un pointage
  modifyPointage(pointage: any): void {
    this.selectedPointage = { ...pointage }; // Dupliquer le pointage pour modification
    this.isEditModalOpen = true; // Ouvrir le modal
  }

  // Fermer le modal
  closeModal(): void {
    this.isEditModalOpen = false;
  }

  // Soumettre la modification du pointage
  submitModification(): void {
    const index = this.pointages.findIndex(p => p.matr === this.selectedPointage.matr && p.date === this.selectedPointage.date);
    if (index !== -1) {
      this.pointages[index] = this.selectedPointage; // Mettre à jour le pointage
      this.filteredPointages = [...this.pointages]; // Actualiser la liste filtrée
    }
    this.closeModal(); // Fermer le modal après la modification
  }
}