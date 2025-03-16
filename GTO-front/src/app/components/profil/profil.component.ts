import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CourseService} from "../../services/course.service";
import {UserService} from "../../services/user.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-profil',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit{
  user: any;
  userShow: any;
  courses: any = [];
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getCouresUser();
  }
  constructor(private HttpCLient: HttpClient,private route : ActivatedRoute,private userService: UserService) {
  }
  getCouresUser()
  {
    console.log('User ID:', this.user.id); // Vérifiez si l'ID est correct
    if (this.user.id) {
      this.userService.findById(this.user.id).subscribe(
          (response: any) => {
            this.courses = response.user.courses;
          },
          (error) => {
            console.error('Erreur lors de la récupération du cours :', error);
          }
      );
    }
  }

}
