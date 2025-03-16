import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../models/user";
import {Course} from "../models/course";

export const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.loggedIn.asObservable();
  constructor(private httpClient: HttpClient) {}

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return localStorage.getItem('user');
  }


  login(credentials: { email: string; password: string }): Observable<any> {
    return this.httpClient.post<any>(`${apiUrl}/users/login`, credentials).pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token); // Stocker le token
            this.loggedIn.next(true); // Mettre à jour l'état SEULEMENT après le succès
          }
        })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false); // Mettre à jour l'état
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {  // Vérifie si localStorage existe
      return localStorage.getItem('token') !== null;
    }
    return false;
  }

  public create(user : User) : Observable<User>{
    return this.httpClient.post<User>(`${apiUrl}/users/create`, user)
  }

  public findById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${apiUrl}/users/` + id);
  }

  public findAll() : Observable<User[]>{
    return this.httpClient.get<User[]>(`${apiUrl}/users`);
  }
}
