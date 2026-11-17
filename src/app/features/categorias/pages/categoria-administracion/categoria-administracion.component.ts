
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { CATEGORIAS_MOCK } from '../../data/categorias.mock';

// ==================================================
// MODELOS LOCALES PARA LA VISTA
// ==================================================

interface CategoriaVista {
  id: string;
  nombre: string;
  descripcion: string;
}

interface CampoDinamico {
  id: number;
  etiqueta: string;
  tipo: string;
  obligatorio: boolean;
}

// ==================================================
// CONFIGURACIÓN DEL COMPONENTE
// ==================================================
@Component({
  selector: 'app-categoria-administracion',
  standalone: true,
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './categoria-administracion.component.html',
  styleUrl: './categoria-administracion.component.css'
})
export class CategoriaAdministracionComponent implements OnInit {

  // ==================================================
  // SERVICIOS Y RUTA
  // ==================================================
  private readonly route = inject(ActivatedRoute);

  // ==================================================
  // ESTADO GENERAL DE LA PANTALLA
  // ==================================================

  categoriaId = '';

  pestanaActiva: 'general' | 'formulario' = 'general';

  categoria: CategoriaVista = {
    id: '',
    nombre: 'Categoría',
    descripcion: ''
  };

  // ==================================================
  // CAMPOS DINÁMICOS
  // ==================================================
  campos: CampoDinamico[] = [];

  // ==================================================
  // ESTADO DEL EDITOR DE CAMPOS
  // ==================================================
  mostrarEditorCampo = false;

  nuevoCampoEtiqueta = '';
  nuevoCampoTipo = 'TEXTO';
  nuevoCampoObligatorio = false;

  campoEnEdicionId: number | null = null;

  // ==================================================
  // TIPOS DE DATOS DISPONIBLES
  // ==================================================
  readonly tiposCampo = [
    { valor: 'TEXTO', etiqueta: 'Texto' },
    { valor: 'NUMERO', etiqueta: 'Número' },
    { valor: 'FECHA', etiqueta: 'Fecha' },
    { valor: 'BOOLEANO', etiqueta: 'Sí / No' },
    { valor: 'LISTA', etiqueta: 'Lista de opciones' }
  ];

  // ==================================================
  // INICIALIZACIÓN
  // ==================================================
  ngOnInit(): void {

    this.pestanaActiva = 'general';

    this.categoriaId =
      this.route.snapshot.paramMap.get('id') ?? '';

    this.cargarCategoria();
  }

  // ==================================================
  // CARGAR CATEGORÍA DESDE EL CATÁLOGO COMPARTIDO
  // ==================================================
  private cargarCategoria(): void {

    const encontrada = CATEGORIAS_MOCK.find(
      categoria => categoria.id === this.categoriaId
    );

    if (encontrada) {
      this.categoria = {
        id: encontrada.id,
        nombre: encontrada.nombre,
        descripcion: encontrada.descripcion ?? ''
      };
    }

    this.campos = [];
  }

  // ==================================================
  // CAMBIO DE PESTAÑA
  // ==================================================
  cambiarPestana(
    pestana: 'general' | 'formulario'
  ): void {
    this.pestanaActiva = pestana;
  }

  // ==================================================
  // ABRIR EDITOR DE CAMPOS
  // ==================================================
  abrirEditorCampo(): void {
    this.limpiarEditor();
    this.mostrarEditorCampo = true;
  }

  // ==================================================
  // CANCELAR EDICIÓN
  // ==================================================
  cancelarEditorCampo(): void {
    this.mostrarEditorCampo = false;
    this.limpiarEditor();
  }

  // ==================================================
  // LIMPIAR DATOS DEL EDITOR
  // ==================================================
  private limpiarEditor(): void {
    this.nuevoCampoEtiqueta = '';
    this.nuevoCampoTipo = 'TEXTO';
    this.nuevoCampoObligatorio = false;
    this.campoEnEdicionId = null;
  }

  // ==================================================
  // GUARDAR CAMPO
  // ==================================================
  guardarCampo(): void {

    const etiqueta = this.nuevoCampoEtiqueta.trim();

    if (!etiqueta) {
      return;
    }

    if (this.campoEnEdicionId !== null) {

      this.campos = this.campos.map(campo =>
        campo.id === this.campoEnEdicionId
          ? {
              ...campo,
              etiqueta,
              tipo: this.nuevoCampoTipo,
              obligatorio: this.nuevoCampoObligatorio
            }
          : campo
      );

    } else {

      const nuevoCampo: CampoDinamico = {
        id: Date.now(),
        etiqueta,
        tipo: this.nuevoCampoTipo,
        obligatorio: this.nuevoCampoObligatorio
      };

      this.campos = [...this.campos, nuevoCampo];
    }

    this.mostrarEditorCampo = false;
    this.limpiarEditor();
  }

  // ==================================================
  // EDITAR CAMPO EXISTENTE
  // ==================================================
  editarCampo(campo: CampoDinamico): void {

    this.campoEnEdicionId = campo.id;
    this.nuevoCampoEtiqueta = campo.etiqueta;
    this.nuevoCampoTipo = campo.tipo;
    this.nuevoCampoObligatorio = campo.obligatorio;

    this.mostrarEditorCampo = true;
  }

  // ==================================================
  // ELIMINAR CAMPO
  // ==================================================
  eliminarCampo(id: number): void {
    this.campos = this.campos.filter(
      campo => campo.id !== id
    );
  }

  // ==================================================
  // OBTENER NOMBRE VISIBLE DEL TIPO DE DATO
  // ==================================================
  obtenerEtiquetaTipo(tipo: string): string {
    return this.tiposCampo.find(
      elemento => elemento.valor === tipo
    )?.etiqueta ?? tipo;
  }
}
