import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {NgClass, NgIf} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-headers',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    RouterLink
  ],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss'
})
export class HeadersComponent {
  userForm!: FormGroup;
  user!: User;
  submitted = false;
  loginForm!: FormGroup;
  isLoading = false;
  isLoggedIn = false;

  isLoginFaild = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,private toast : ToastrService, private router : Router, private userService : UserService,) {
    this.loginForm = this.formBuilder.group({
      email : ['', Validators.required,],
      password : ['', Validators.required]
    });
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      last_name: [""],
      first_name: [""],
      role:  [""],
      password: ["", Validators.required],
    });
  }
  ngOnInit() {
    this.initForm();
    //S'abonner aux changements d'état de connexion
    this.userService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid)
    {
      this.userService.create(this.userForm.value).subscribe(
          (res) => {
            this.submitted = false;
            this.initForm();
            this.toast.success("Compte créer avec succès!");
            this.router.navigateByUrl('/home')
          },
          (error) => {
            console.log(error);
          }
      )
    }
  }


  login() {
    this.submitted = true;
    console.log('Je suis là');
    if (this.loginForm.valid)
    {
      this.isLoading = true;
      this.userService.login(this.loginForm.value).subscribe(
          (res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));

            this.toast.success("Connexion réussie avec succès!");

            this.router.navigateByUrl('/profil');
            this.isLoading = false;
          },
          (error) => {
            this.isLoginFaild  = true;
            this.isLoading = false;
            this.errorMessage = "Email utilisateur ou mot de passe incorrect";
          }
      )
    }
  }

  logout() {
    this.userService.logout();
    this.toast.error("Tu vas nous manquer !");
    this.router.navigateByUrl('/home');
  }

}

