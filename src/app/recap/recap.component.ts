import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {
  @ViewChild('printSection') printSection!: ElementRef;

  selectedState?: string; // Sélection de l'état (absence/autorisation)
  selectedYear?: number;  // Sélection de l'année
  years: number[] = [];   // Liste des années disponibles
  months: string[] = [    // Mois de l'année
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  filteredServices: any[] = []; // Contient les services filtrés

  constructor() {
    this.populateYears();
  }

  ngOnInit(): void {}

  populateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 5; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  onSubmit(): void {
    if (this.selectedState && this.selectedYear) {
      this.filteredServices = this.getFilteredServices(this.selectedState, this.selectedYear);
    }
  }

  getFilteredServices(state: string, year: number): any[] {
    // Simulez des données. Remplacez cette logique par un appel API réel.
    const allServices = [
      { name: 'Débitage', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'Cintrage', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'Soudure', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'Peinture', monthlyData: this.mockMonthlyData(state, year) },
      { name: 'Câblage', monthlyData: this.mockMonthlyData(state, year) },
    ];
    return allServices;
  }

  mockMonthlyData(state: string, year: number): any {
    // Génère des données factices par mois
    return this.months.reduce((acc: any, month: string) => {
      acc[month] = state === 'absence' ? Math.floor(Math.random() * 10) : Math.floor(Math.random() * 5);
      return acc;
    }, {});
  }

  getMonthlyData(service: any, month: string): number | string {
    return service.monthlyData[month] || '-';
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