
import { Component, OnInit, inject } from '@angular/core';

import {
  DocumentoBibliotecaVM,
  DocumentosDataFacade
} from '../../facade/documentos-data.facade';

import { DocumentoEstado } from '../../../../core/models/documento-api.model';
import { CategoriaApiDTO } from '../../../../core/models/categoria-api.model';

/**
 * Componente principal de la biblioteca documental LEGGA.
 *
 * Responsabilidades:
 * - Consultar documentos.
 * - Buscar por nombre o legajo.
 * - Filtrar por categorÃ­a y estado.
 * - Gestionar paginaciÃ³n.
 * - Preparar acciones de visualizaciÃ³n y descarga.
 */
@Component({
  selector: 'app-documentos-lista',
  standalone: true,
  imports: [],
  templateUrl: './documentos-lista.component.html',
  styleUrl: './documentos-lista.component.css'
})
export class DocumentosListaComponent implements OnInit {

  private readonly documentosFacade = inject(DocumentosDataFacade);

  // Documentos mostrados en la pÃ¡gina actual.
  documentos: DocumentoBibliotecaVM[] = [];

  // CategorÃ­as disponibles para filtrar.
  categorias: CategoriaApiDTO[] = [];

  // BÃºsqueda y filtros.
  busqueda = '';
  categoriaSeleccionada = '';
  estadoSeleccionado: DocumentoEstado | '' = '';

  // Estados de pantalla.
  cargando = false;
  error: string | null = null;

  // PaginaciÃ³n.
  paginaActual = 0;
  tamanioPagina = 9;
  totalPaginas = 0;
  totalRegistros = 0;

  ngOnInit(): void {
    this.categorias = this.documentosFacade.obtenerCategorias();
    this.cargarDocumentos();
  }

  /**
   * Consulta documentos aplicando los filtros seleccionados.
   */
  cargarDocumentos(): void {
    this.cargando = true;
    this.error = null;

    this.documentosFacade.listar({
      busqueda: this.busqueda,
      categoriaId: this.categoriaSeleccionada,
      estado: this.estadoSeleccionado,
      page: this.paginaActual,
      size: this.tamanioPagina
    }).subscribe({
      next: respuesta => {
        this.documentos = respuesta.content;
        this.totalPaginas = respuesta.totalPages;
        this.totalRegistros = respuesta.totalElements;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No fue posible cargar los documentos.';
        this.documentos = [];
        this.cargando = false;
      }
    });
  }

  /**
   * Actualiza la bÃºsqueda de documentos.
   */
  alBuscar(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.busqueda = input.value;
    this.paginaActual = 0;

    this.cargarDocumentos();
  }

  /**
   * Actualiza el filtro de categorÃ­a.
   */
  alCambiarCategoria(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.categoriaSeleccionada = select.value;
    this.paginaActual = 0;

    this.cargarDocumentos();
  }

  /**
   * Actualiza el filtro de estado.
   */
  alCambiarEstado(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.estadoSeleccionado = select.value as DocumentoEstado | '';
    this.paginaActual = 0;

    this.cargarDocumentos();
  }

  /**
   * Avanza a la pÃ¡gina siguiente.
   */
  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
      this.cargarDocumentos();
    }
  }

  /**
   * Regresa a la pÃ¡gina anterior.
   */
  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.cargarDocumentos();
    }
  }

  /**
   * Determina el icono segÃºn el tipo MIME.
   */
  obtenerTipoDocumento(tipoMime: string): string {
    if (tipoMime === 'application/pdf') {
      return 'PDF';
    }

    if (tipoMime.startsWith('image/')) {
      return 'IMG';
    }

    if (tipoMime.includes('word')) {
      return 'DOC';
    }

    if (tipoMime.includes('spreadsheet') || tipoMime.includes('excel')) {
      return 'XLS';
    }

    return 'FILE';
  }

  /**
   * Formatea el tamaÃ±o del archivo para mostrarlo en pantalla.
   */
  formatearTamano(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  /**
   * Formatea la fecha de carga.
   */
  formatearFecha(fecha: string): string {
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(fecha));
  }

  /**
   * Determina si el documento estÃ¡ asociado.
   */
  estaAsociado(documento: DocumentoBibliotecaVM): boolean {
    return documento.estado === 'ASOCIADO';
  }

  /**
   * Acciones pendientes de conexiÃ³n con los archivos reales
   * y los endpoints pÃºblicos del BFF.
   */
  visualizarDocumento(documento: DocumentoBibliotecaVM): void {
    // Se conectarÃ¡ a la visualizaciÃ³n real en el siguiente paso.
    console.info('Visualizar documento:', documento.id);
  }

  descargarDocumento(documento: DocumentoBibliotecaVM): void {
    // Se conectarÃ¡ al endpoint de descarga del BFF.
    console.info('Descargar documento:', documento.id);
  }
}

