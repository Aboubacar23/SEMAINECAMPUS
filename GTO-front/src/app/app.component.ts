import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeadersComponent} from "./shared/headers/headers.component";
import {FootersComponent} from "./shared/footers/footers.component";
import {CoursesListComponent} from "./components/courses-list/courses-list.component";
import {SliderBarComponent} from "./shared/slider-bar/slider-bar.component";

@Component({
  selector: 'app-root',
    imports: [HeadersComponent, FootersComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
