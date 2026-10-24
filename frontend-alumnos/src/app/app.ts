import { Component } from '@angular/core';
import { AlumnoList } from './components/alumno-list/alumno-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AlumnoList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'frontend-alumnos';
}