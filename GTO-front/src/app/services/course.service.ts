import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Course} from "../models/course";
import {Category} from "../models/category";

export const apiUrl = `${environment.apiUrl}`
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http : HttpClient) { }

  public findAll() : Observable<Course[]>{
    return this.http.get<Course[]>(`${apiUrl}/courses`);
  }

  public findById(id: string): Observable<Course> {
    return this.http.get<Course>(`${apiUrl}/courses/` + id);
  }

  //affiche toutes les catégories
  public findAllCategorie() : Observable<Category[]>{
    return this.http.get<Category[]>(`${apiUrl}/categories`);
  }

  public new(course: Course): Observable<Course> {
    return this.http.post<Course>(`${apiUrl}/courses`, course);
  }
}
