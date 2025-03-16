import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CourseService} from "../../services/course.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {Course} from "../../models/course";

@Component({
  selector: 'app-form-course',
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-course.component.html',
  styleUrl: './form-course.component.scss'
})
export class FormCourseComponent implements OnInit{
  user: any;
  categories: any[] =  [];
  courseForm!: FormGroup;
  course!: Course;
  submitted = false;
  selectedCategory: number | null = null;

  initForm() {
    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      duration: ['', Validators.required],
      category_id: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.initForm();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getAllCategories();
  }

  constructor(private router: Router, private courseService: CourseService, private toastr: ToastrService, private formBuilder: FormBuilder) {
  }

  getAllCategories() {
    this.courseService.findAllCategorie().subscribe({
      next: (response: any) => {
        this.categories = response.data;
        //console.log(this.categories);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des cours', err);
      }
    });
  }

  onSubmit(){
    this.submitted = true;
    if (this.courseForm.valid)
    {
      const courseData = {
        ...this.courseForm.value,
        user_id: this.user.id
      };

      if (this.course == undefined)
      {
        this.courseService.new(courseData).subscribe((res) => {
          this.toastr.success("La formation créé avec succès !");
          this.submitted = false;
          this.router.navigateByUrl('/profil');
        },(error) => {
          this.toastr.error("Echec d'ajout de course");
          console.log(error);
        })
      }
    }
  }
}
