import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CourseService} from "../../services/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {EnrollmentService} from "../../services/enrollment.service";

@Component({
  selector: 'app-show-course',
  imports: [],
  templateUrl: './show-course.component.html',
  styleUrl: './show-course.component.scss'
})
export class ShowCourseComponent implements OnInit{
  course: any;
  user: any;
  enrollment: any;
  courseForm!: FormGroup;

  constructor(private HttpCLient: HttpClient, private courseService: CourseService,
              private route : ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private enrollmentService : EnrollmentService) {
  }
  ngOnInit() {
    this.getCourseById();
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  initForm() {

  }
  getCourseById() {
    const courseId = this.route.snapshot.paramMap.get('id');
    console.log('Course ID:', courseId); // Vérifiez si l'ID est correct
    if (courseId) {
      this.courseService.findById(courseId).subscribe(
          (response: any) => {
            this.course = response.data;
            console.log('Course Object:', this.course);
            console.log('Course Title:', this.course?.title);
          },
          (error) => {
            console.error('Erreur lors de la récupération du cours :', error);
          }
      );
    }
  }

  getReservation(id: number)
  {
    const user_id = this.user.id;
    const course_id = id;
    const enrollmentData = { user_id, course_id };

    if (this.enrollment == undefined)
    {
      this.enrollmentService.new(enrollmentData).subscribe((res) => {
        this.toastr.success("Bravo vous êtes inscrits à la formation !");
        this.router.navigateByUrl('/home');
      },(error) => {
        this.toastr.error("Echec d'ajout de course");
        console.log(error);
      })
    }
  }
}
