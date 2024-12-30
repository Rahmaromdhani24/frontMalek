import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../connexion/User.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'http://localhost:8281/api/auth/login';  
private apiUsers = 'http://localhost:8281/api/users';  

private currentUser: User | null = null; // Stocke l'utilisateur actuel

constructor(private http: HttpClient) {
  // Essayer de récupérer l'utilisateur du localStorage au démarrage
  const storedUser = localStorage.getItem('currentUser');
  this.currentUser = storedUser ? JSON.parse(storedUser) : null;
}

// Méthode de connexion
login(username: string, password: string): Observable<User | null> {
  const loginRequest = { username, password }; // Créez l'objet avec le username et le password

  return this.http.post<any>(`${this.apiUrl}`, loginRequest).pipe( // Envoie la requête POST avec le corps JSON
    map(response => {
      if (response.status === 'success') { // Si la réponse a le statut 'success'
        // Créez un objet 'User' complet avec toutes les propriétés requises
        const currentUser: User = {
          username: response.username,
          role: response.role,
          token: response.token,  // Assurez-vous que la réponse contient un token
          id: response.id,        // Assurez-vous que la réponse contient un id
          password: password,     // Si vous avez besoin du mot de passe, ajoutez-le (bien qu'il ne soit généralement pas nécessaire de le stocker)
        };

        // Stocker l'utilisateur dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Stocker l'utilisateur dans le localStorage
        return currentUser;
      } else {
        return null; // Si le statut est autre que 'success', retourne null
      }
    }),
    catchError((error) => {
      console.error('Erreur de connexion', error);
      return of(null); // En cas d'erreur, retourne null
    })
  );
}

//ajouter utlisateur 
addUser(userData: { username: string; password: string; role: string }): Observable<any> {
  const params = new HttpParams().set('roleName', userData.role); // Ajout du rôle en tant que paramètre de requête

  return this.http.post('http://localhost:8281/api/users/add', userData, { params }).pipe(
    catchError(err => {
      console.error('Erreur dans le service addUser:', err);
      throw err; // Propager l'erreur pour qu'elle soit gérée dans le composant
    })
  );
}


 // Récupérer un utilisateur par son ID
 getUserById(userId: string): Observable<any> {
  return this.http.get(`${this.apiUsers}/${userId}`);
}

// Mettre à jour un utilisateur
apiUpdate ="http://localhost:8281/api/users/update"
updateUser(userId: string, updatedUser: { username: string; password: string; role: string }): Observable<any> {
  return this.http.put(`${this.apiUpdate}/${userId}`, updatedUser);
}
// Récupérer tous les utilisateurs
getUsers(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUsers+"/all");
}

// Supprimer un utilisateur
apiDelete ="http://localhost:8281/api/users/delete"
deleteUser(userId: string): Observable<void> {
  return this.http.delete<void>(`${this.apiDelete}/${userId}`);
}
 

getCurrentUser(): Observable<User | null> {
  // Retourne l'utilisateur actuel, vérifie s'il est stocké
  return of(this.currentUser);
}

// Vérifiez si l'utilisateur est un administrateur
isAdmin(user: User | null): boolean {
  return user ? user.role === 'admin' : false;
}

// Vérifiez si l'utilisateur est un utilisateur normal
isUser(user: User | null): boolean {
  return user ? user.role === 'user' : false;
}

logout(): void {
  this.currentUser = null; // Réinitialise l'utilisateur courant
  localStorage.removeItem('currentUser'); // Supprime l'utilisateur du localStorage
}
resetPassword(username: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/reset-password`, { username });
}
}