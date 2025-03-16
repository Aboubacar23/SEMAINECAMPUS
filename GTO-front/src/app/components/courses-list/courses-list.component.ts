import {Component, OnInit} from '@angular/core';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import {SliderBarComponent} from "../../shared/slider-bar/slider-bar.component";
import {Course} from "../../models/course";
import {Router, RouterLink} from "@angular/router";
import {CourseService} from "../../services/course.service";
import {CommonModule} from "@angular/common";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-courses-list',
    imports: [
        CarouselModule,
        SliderBarComponent,
        CommonModule,
        RouterLink
    ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent implements OnInit {
    courses: any[] = [];
    user: any;
    ngOnInit() {
        this.getAllCourses();
    }

    constructor(private router: Router, private courseService: CourseService, private toastr: ToastrService) {
    }

    getAllCourses() {
        this.courseService.findAll().subscribe({
            next: (response: any) => {
                // Vérifie si `response` est un tableau mal formaté (ex: ["success", [cours]])
                if (Array.isArray(response) && response.length === 2 && Array.isArray(response[1])) {
                    this.courses = response[1]; //Récupère seulement les cours
                } else if (response && typeof response === 'object' && 'courses' in response) {
                        this.courses = response.courses;
                } else {
                    this.courses = [];
                }
            },
            error: (err) => {
                console.error('Erreur lors de la récupération des cours', err);
            }
        });
    }

}