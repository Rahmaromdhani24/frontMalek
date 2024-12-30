export interface User {
  token: any;
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';  // Rôle de l'utilisateur
  }