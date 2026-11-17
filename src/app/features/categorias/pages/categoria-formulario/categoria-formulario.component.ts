
// Importa Component e inject para definir el componente e inyectar dependencias.
import { Component, inject } from '@angular/core';

// Importa Router para navegar después de guardar y RouterLink para cancelar.
import { Router, RouterLink } from '@angular/router';

// Servicio que permite comunicarse con el BFF para administrar categorías.
import { CategoriasApiService } from '../../services/categorias-api.service';

// Contrato público utilizado para crear una categoría.
import { CreateCategoriaRequest } from '../../../../core/models/categoria-api.model';

@Component({
  selector: 'app-categoria-formulario',
  standalone: true,

  // Dependencias de navegación utilizadas por la plantilla.
  imports: [RouterLink],

  // Plantilla y estilos propios del formulario.
  templateUrl: './categoria-formulario.component.html',
  styleUrl: './categoria-formulario.component.css'
})
export class CategoriaFormularioComponent {

  // Servicio para realizar operaciones sobre categorías.
  private readonly categoriasApi = inject(CategoriasApiService);

  // Servicio para controlar la navegación.
  private readonly router = inject(Router);

  // Nombre ingresado por el usuario.
  nombre = '';

  // Descripción opcional ingresada por el usuario.
  descripcion = '';

  // Indica si se está guardando la categoría.
  guardando = false;

  // Mensaje de error para mostrar en pantalla.
  error: string | null = null;

  // Método encargado de validar y crear la categoría.
  guardar(): void {

    // Normaliza el nombre eliminando espacios innecesarios.
    const nombreNormalizado = this.nombre.trim();

    // Evita enviar información sin nombre o duplicar solicitudes.
    if (!nombreNormalizado || this.guardando) {
      return;
    }

    // Construye la solicitud según el contrato público del BFF.
    const request: CreateCategoriaRequest = {
      nombre: nombreNormalizado,
      descripcion: this.descripcion.trim() || null
    };

    // Activa el estado de guardado y limpia errores anteriores.
    this.guardando = true;
    this.error = null;

    // Ejecuta la creación mediante el servicio de categorías.
    this.categoriasApi.crear(request).subscribe({

      // Si la categoría se crea correctamente:
      next: () => {

        // Finaliza el estado de guardado.
        this.guardando = false;

        // Regresa al listado de categorías.
        void this.router.navigate(['/categorias']);
      },

      // Si ocurre un error durante la creación:
      error: () => {

        // Finaliza el estado de guardado.
        this.guardando = false;

        // Informa al usuario que no se pudo crear la categoría.
        this.error = 'No fue posible crear la categoría.';
      }
    });
  }
}

