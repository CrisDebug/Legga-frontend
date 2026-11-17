
import {
  UsuarioConfiguracionVM,
  PerfilConfiguracionVM,
  PermisoConfiguracionVM
} from '../models/configuracion.model';

// ==================================================
// PERFILES DE LEGGA
// ==================================================

export const PERFILES_CONFIGURACION_MOCK: PerfilConfiguracionVM[] = [
  {
    codigo: 'JEFE_DEPARTAMENTO',
    nombre: 'Jefe de departamento',
    tipo: 'Consultivo',
    descripcion: 'Consulta legajos, documentos y trazabilidad. Puede reactivar legajos archivados.'
  },
  {
    codigo: 'SUPERVISOR_ADMINISTRATIVO',
    nombre: 'Supervisor administrativo',
    tipo: 'Administrativo',
    descripcion: 'Administra cuentas, permisos y categorías. Gestiona legajos y documentos según sus atribuciones. Puede reactivar legajos.'
  },
  {
    codigo: 'USUARIO_ADMINISTRATIVO',
    nombre: 'Usuario administrativo',
    tipo: 'Operativo',
    descripcion: 'Crea y gestiona legajos y documentos dentro de los permisos asignados. No puede reactivar legajos ni administrar cuentas y permisos.'
  }
];

// ==================================================
// USUARIOS DE DEMOSTRACIÓN
// ==================================================

const FECHA_DEMO = '2026-01-15T10:00:00.000Z';

export const USUARIOS_CONFIGURACION_MOCK: UsuarioConfiguracionVM[] = [
  {
    usuario: {
      id: 'demo-usuario-001',
      entra_tenant_id: 'demo-tenant',
      entra_object_id: 'demo-object-001',
      correo: 'jefe@legga.demo',
      nombre: 'María González',
      perfil_id: 'demo-perfil-001',
      activo: true,
      created_at: FECHA_DEMO,
      updated_at: FECHA_DEMO
    },
    perfil: {
      id: 'demo-perfil-001',
      codigo: 'JEFE_DEPARTAMENTO',
      nombre: 'Jefe de departamento',
      descripcion: 'Perfil consultivo',
      activo: true,
      created_at: FECHA_DEMO,
      updated_at: FECHA_DEMO
    }
  },
  {
    usuario: {
      id: 'demo-usuario-002',
      entra_tenant_id: 'demo-tenant',
      entra_object_id: 'demo-object-002',
      correo: 'supervisor@legga.demo',
      nombre: 'Carlos Rodríguez',
      perfil_id: 'demo-perfil-002',
      activo: true,
      created_at: FECHA_DEMO,
      updated_at: FECHA_DEMO
    },
    perfil: {
      id: 'demo-perfil-002',
      codigo: 'SUPERVISOR_ADMINISTRATIVO',
      nombre: 'Supervisor administrativo',
      descripcion: 'Perfil administrativo',
      activo: true,
      created_at: FECHA_DEMO,
      updated_at: FECHA_DEMO
    }
  },
  {
    usuario: {
      id: 'demo-usuario-003',
      entra_tenant_id: 'demo-tenant',
      entra_object_id: 'demo-object-003',
      correo: 'usuario@legga.demo',
      nombre: 'Ana Martínez',
      perfil_id: 'demo-perfil-003',
      activo: true,
      created_at: FECHA_DEMO,
      updated_at: FECHA_DEMO
    },
    perfil: {
      id: 'demo-perfil-003',
      codigo: 'USUARIO_ADMINISTRATIVO',
      nombre: 'Usuario administrativo',
      descripcion: 'Perfil operativo',
      activo: true,
      created_at: FECHA_DEMO,
      updated_at: FECHA_DEMO
    }
  },
  {
    usuario: {
      id: 'demo-usuario-004',
      entra_tenant_id: 'demo-tenant',
      entra_object_id: 'demo-object-004',
      correo: 'sinperfil@legga.demo',
      nombre: 'Pedro Silva',
      perfil_id: null,
      activo: false,
      created_at: FECHA_DEMO,
      updated_at: FECHA_DEMO
    },
    perfil: null
  }
];

// ==================================================
// MATRIZ RESUMIDA DE PERMISOS
// Basada en la matriz documental v1.5
// ==================================================

export const MATRIZ_PERMISOS_CONFIGURACION_MOCK: PermisoConfiguracionVM[] = [
  {
    funcionalidad: 'Crear legajo',
    jefeDepartamento: 'Según autorización',
    supervisorAdministrativo: 'Sí',
    usuarioAdministrativo: 'Según permisos'
  },
  {
    funcionalidad: 'Adjuntar documentos',
    jefeDepartamento: 'No por defecto',
    supervisorAdministrativo: 'Sí',
    usuarioAdministrativo: 'Según permisos'
  },
  {
    funcionalidad: 'Administrar categorías',
    jefeDepartamento: 'No',
    supervisorAdministrativo: 'Sí',
    usuarioAdministrativo: 'No'
  },
  {
    funcionalidad: 'Administrar cuentas',
    jefeDepartamento: 'No',
    supervisorAdministrativo: 'Sí',
    usuarioAdministrativo: 'No'
  },
  {
    funcionalidad: 'Consultar trazabilidad',
    jefeDepartamento: 'Principal',
    supervisorAdministrativo: 'Sí',
    usuarioAdministrativo: 'Según permisos'
  },
  {
    funcionalidad: 'Reactivar legajo',
    jefeDepartamento: 'Sí',
    supervisorAdministrativo: 'Sí',
    usuarioAdministrativo: 'No'
  }
];
