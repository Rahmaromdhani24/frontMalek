import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, map, mergeMap, Observable, throwError } from 'rxjs';
import { Pointage } from '../pointage/pointage.module';
import { EtatPointageMonthly } from '../pointage/EtatPointageMonthly .module';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private bdPointage = 'http://localhost:8281/api/pointages';

  constructor(private http: HttpClient) {}

  // Récupérer tous les pointages
  getPointages(): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(this.bdPointage);
  }

 

  // Récupérer l'état mensuel des pointages pour un employé donné
  getPointagesMensuels(matr: number, year: number): Observable<EtatPointageMonthly[]> {
    return this.getPointages().pipe(
      map(pointages => {
        const pointagesMap = new Map<string, EtatPointageMonthly>();

        pointages.forEach(pointage => {
          const pointageDate = new Date(pointage.date);
          const pointageYear = pointageDate.getFullYear();
          const pointageMonth = pointageDate.getMonth() + 1;

          if (pointageYear === year && pointage.matr === matr) {
            const monthName = new Date(year, pointageMonth - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
            const key = `${pointage.matr}-${monthName}`;

            if (!pointagesMap.has(key)) {
              pointagesMap.set(key, {
                matricule: pointage.matr,
                nomPrenom: pointage.nomPrenom,
                mois: monthName,
                nbPresent: 0,
                nbAbsentNonJustifie: 0,
                nbAbsentCourtTerme: 0,
                nbAbsentLongTerme: 0,
                nbAbsentAut: 0,
                nbAbsentPay: 0,
                nbAutorisation: 0,
                nbRetard: 0,
                nbRetardAutorise: 0,
                nbConge: 0,
                nbMiseAPied: 0,
                nbJourFerie: 0,
                service: pointage.service
              });
            }

            const etat = pointagesMap.get(key);
            if (etat) {
              etat.nbPresent += pointage.present || 0;
              etat.nbAbsentNonJustifie += pointage.absentNonJustifie || 0;
              etat.nbAbsentCourtTerme += pointage.absentCourtTerme || 0;
              etat.nbAbsentLongTerme += pointage.absentLongTerme || 0;
              etat.nbAbsentAut += pointage.absentAut || 0;
              etat.nbAbsentPay += pointage.absentPay || 0;
              etat.nbAutorisation += pointage.autorisation || 0;
              etat.nbRetard += pointage.retard || 0;
              etat.nbRetardAutorise += pointage.retardAutorise || 0;
              etat.nbConge += pointage.conge || 0;
              etat.nbMiseAPied += pointage.miseAPied || 0;
              etat.nbJourFerie += pointage.jourFerie || 0;
            }
          }
        });

        return Array.from(pointagesMap.values());
      })
    );
  }

  // Ajouter un pointage
  ajouterPointagesPourTous(employees: any[], date: string): Observable<any> {
    const url = `${this.bdPointage}/enregistrerPointage?date=${date}`;
    return this.http.post(url, employees);
  }

  // Mettre à jour un pointage
  updatePointage(id: number, pointage: Partial<Pointage>): Observable<Pointage> {
    const modificationTimestamp = new Date().toISOString();
    const updatedPointage = { ...pointage, modificationTimestamp };
    return this.http.patch<Pointage>(`${this.bdPointage}/${id}`, updatedPointage);
  }
  getPointageByMatr(matr: number): Observable<any> {
    return this.http.get(`${this.bdPointage}?matr=${matr}`);
  }
  //pour ajouter les donnes de autres dans le pointage 
  // PointageService

  updatePointageDetails(matr: number, dateDebut: string, dateFin: string, etat: string): Observable<any> {
    // Vérifiez si un pointage existe pour ce matricule
    return this.getPointageByMatr(matr).pipe(
      catchError((err) => {
        if (err.status === 404) {
          // Si le pointage n'est pas trouvé, en créer un nouveau
          const newPointage = {
            matr,
            dateDebut,
            dateFin,
            etat
          };
          return this.http.post(this.bdPointage, newPointage); // Créer un nouveau pointage
        }
        return throwError(err);
      })
    );
  }
  // getPointagesParDate(date: string): Observable<any[]> {
  //   const formattedDate = date.split('T')[0]; // Formater la date sélectionnée (yyyy-MM-dd)
  //   const filteredPointages = this.pointages.filter(pointage => pointage.date === formattedDate);
  //   return of(filteredPointages); // Retourner un observable
  // }
 

}