import { Usuario, Perfil } from '../../../shared/models';

// ==================================================
// MODELOS DE VISTA PARA CONFIGURACIÓN
// ==================================================

export interface UsuarioConfiguracionVM {
  usuario: Usuario;
  perfil: Perfil | null;
}

export interface PerfilConfiguracionVM {
  codigo: string;
  nombre: string;
  tipo: string;
  descripcion: string;
}

export interface PermisoConfiguracionVM {
  funcionalidad: string;
  jefeDepartamento: string;
  supervisorAdministrativo: string;
  usuarioAdministrativo: string;
}