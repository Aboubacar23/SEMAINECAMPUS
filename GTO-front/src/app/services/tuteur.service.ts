import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Course} from "../models/course";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
export const apiUrl = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class TuteurService {

  constructor(private http : HttpClient) { }
}
