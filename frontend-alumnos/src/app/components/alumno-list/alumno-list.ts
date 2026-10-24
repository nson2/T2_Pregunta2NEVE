import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alumno } from '../../models/alumno';
import { AlumnoService } from '../../services/alumno';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-list.html',
  styleUrl: './alumno-list.scss'
})
export class AlumnoList implements OnInit {
  private alumnoService = inject(AlumnoService);

  alumnos = signal<Alumno[]>([]);
  cargando = signal<boolean>(false);
  errorMensaje = signal<string>('');

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.cargando.set(true);
    this.errorMensaje.set('');
    this.alumnoService.listar().subscribe({
      next: (data: Alumno[]) => {
        this.alumnos.set(data);
        this.cargando.set(false);
      },
      error: (err: any) => {
        this.errorMensaje.set(`No se pudo conectar con la API REST (Código HTTP: ${err.status || 0})`);
        this.cargando.set(false);
      }
    });
  }

  eliminarAlumno(id?: number): void {
    if (!id) return;

    if (confirm('¿Está seguro de que desea eliminar a este alumno?')) {
      this.alumnoService.eliminar(id).subscribe({
        next: () => {
          this.cargarAlumnos();
        },
        error: (err: any) => {
          this.errorMensaje.set(`Error al eliminar alumno (Código HTTP: ${err.status})`);
        }
      });
    }
  }
}