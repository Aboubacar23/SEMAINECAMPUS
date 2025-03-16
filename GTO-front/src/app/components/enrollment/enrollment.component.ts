import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-enrollment',
  imports: [
    NgForOf,
    RouterLink,
    DatePipe
  ],
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.scss'
})
export class EnrollmentComponent implements OnInit{
user: any;
enrollments: any[] = [];

  constructor(private HttpCLient: HttpClient,private route : ActivatedRoute,private userService: UserService) {
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.getEnrollmentsUser();
  }

  getEnrollmentsUser()
  {
    console.log('User ID:', this.user.id); // Vérifiez si l'ID est correct
    if (this.user.id) {
      this.userService.findById(this.user.id).subscribe(
          (response: any) => {
            this.enrollments = response.user.enrollments;
            console.log(this.enrollments);
          },
          (error) => {
            console.error('Erreur lors de la récupération du enrollments :', error);
          }
      );
    }
  }
}
