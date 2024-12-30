export interface Employee {
  matr: number;
  nom_et_prenom_employee:string;
  nom_et_prenom_employee_pere:string;
  n_tel: string;
  cin: string;
  nb_enf:number;
  taille: number;
  pointure: number;
  date_nais: Date;
  sf: Genre;
  etat: EtatCivil;
  classe: Classe;
  nom_de_chef:string;
  serv:Service;
  type_de_contrat: TypeContrat;
  mode_pay: ModePaiement;
  date_recr: Date;
  anc:number;
  test:boolean;
  domici_irre_salaire:boolean;
  fin_contr:Date;
  alerte:number;
  remarque:string;
  bank:string;
  rib:string;
  Age: number;
  
  quitte_le:Date;
  }

export enum Genre {
  femme = 'femme',
  homme = 'homme'
}
export enum Test {
  vrai = 'vrai',
  faux = 'faux'
}
export enum d_i_s {
  oui = 'oui',
  non = 'non'
}
export enum Classe {
  Un = '1',
  Deux = '2',
  Trois = '3',
  Quatre = '4',
  Cinq = '5',
  D = 'D',
  I = 'I'
}
export enum Chef {
  Sami = 'Sami',
  Faouzi = 'Faouzi',
  Majdi = 'Majdi',
  Faten = 'Faten',
  Houda = 'Houda',
  Imed = 'Imed',
  Kamel = 'Kamel',
  Samia = 'Samia',
  Salha = 'Salha',
  Hajer = 'Hajer',
  Mahla = 'MAHLA ACHOUR',
  Aicha = 'Aicha',
}

export enum EtatCivil {
  Celibataire = 'célibataire',
  Marie = 'marié',
  Divorce = 'divorce'
}

export enum ModePaiement {
  Especes = 'espèces',
  Cheque = 'chèque'
}

export enum TypeContrat {
  Apprentissage = 'APR',
  ContratActuel = 'CACT',
  ND = 'ND',
  SVP = 'SVP',
  Stagiaire = 'STAG',
  Titulaire = 'TI'
}

export enum Service {
  Debitage = 'db',
  Cintrage = 'Cin',
  Soudure = 'Sou',
  Rincage = 'Rin',
  Poncage = 'Pon',
  Peinture = 'Pin',
  Cablage = 'K',
  Print = 'Pr'
}
