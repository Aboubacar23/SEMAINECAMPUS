import {Component, OnInit} from '@angular/core';
import {SliderBarComponent} from "../../shared/slider-bar/slider-bar.component";
import {Router, RouterLink} from "@angular/router";
import {CourseService} from "../../services/course.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../services/user.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-tuteur',
  imports: [
    SliderBarComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './tuteur.component.html',
  styleUrl: './tuteur.component.scss'
})
export class TuteurComponent implements OnInit{
users: any = [];

  ngOnInit() {
    this.getAllUsers();
  }

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) {
  }
  getAllUsers() {
    this.userService.findAll().subscribe({
      next: (response: any) => {
        this.users = response.data.filter((user: { role: string; }) => user.role === 'teacher');
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des cours', err);
      }
    });
  }

}
