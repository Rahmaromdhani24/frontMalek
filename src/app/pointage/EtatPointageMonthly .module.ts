export interface EtatPointageMonthly {
  matricule: number;
  nomPrenom: string;
  mois: string;
  nbPresent: number;
  nbAbsentNonJustifie: number;
  nbAbsentCourtTerme: number;
  nbAbsentLongTerme: number;
  nbAbsentAut: number;
  nbAbsentPay: number;
  nbAutorisation: number;
  nbRetard: number;
  nbRetardAutorise: number;
  nbConge: number;
  nbMiseAPied: number;
  nbJourFerie: number;
  service: string;
}
