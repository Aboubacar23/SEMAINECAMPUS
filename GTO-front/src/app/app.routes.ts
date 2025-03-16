import { Routes } from '@angular/router';
import {CoursesListComponent} from "./components/courses-list/courses-list.component";
import {ShowCourseComponent} from "./components/show-course/show-course.component";
import {ProfilComponent} from "./components/profil/profil.component";
import {FormCourseComponent} from "./components/form-course/form-course.component";
import {TuteurComponent} from "./components/tuteur/tuteur.component";
import {ShowTuteurComponent} from "./components/show-tuteur/show-tuteur.component";
import {EnrollmentComponent} from "./components/enrollment/enrollment.component";

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: CoursesListComponent},
    {path: 'show-course/:id', component: ShowCourseComponent},
    {path: 'profil', component: ProfilComponent},
    {path: 'add-course', component: FormCourseComponent},
    {path: 'list-tuteur', component: TuteurComponent},
    {path: 'enrollments', component: EnrollmentComponent},
];
