import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Course} from "../models/course";
import {Observable} from "rxjs";
import {Enrollment} from "../models/enrollment";
export const apiUrl = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http : HttpClient) { }

  public new(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${apiUrl}/enrollments`, enrollment);
  }
}
