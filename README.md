# LEGGA – Frontend

Aplicación web del proyecto **LEGGA**, orientada a la gestión digital de legajos y documentos. Su objetivo es proporcionar una interfaz centralizada para administrar información, consultar documentos, realizar seguimiento de actividades y gestionar las funcionalidades del sistema.

## 1. Tecnologías

- **Angular 19:** framework para el desarrollo de la aplicación web.
- **TypeScript:** lenguaje principal de programación.
- **Tailwind CSS:** herramienta de estilos declarada en el proyecto.
- **Node.js y npm:** entorno de ejecución y administración de dependencias.

## 2. Arquitectura del frontend

El frontend funciona como capa de presentación de LEGGA. Su responsabilidad es mostrar la información, permitir la interacción del usuario y comunicarse con los servicios backend.

La arquitectura contempla el patrón **Backend for Frontend (BFF)** como punto de comunicación entre Angular y los servicios backend.

```text
┌──────────────────────────────────┐
│          USUARIO LEGGA            │
└────────────────┬─────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│         FRONTEND ANGULAR          │
│                                  │
│  Componentes · Páginas · Rutas   │
│  Modelos · Servicios · Fachadas   │
└────────────────┬─────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│       BACKEND FOR FRONTEND        │
│               BFF                │
└────────────────┬─────────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│       SERVICIOS BACKEND           │
│                                  │
│  Legajos · Documentos · Auditoría │
└──────────────────────────────────┘
```

**Principios de arquitectura:**

- Angular no accede directamente a las bases de datos.
- La lógica de negocio y las validaciones corresponden al backend.
- El acceso a datos es responsabilidad de los servicios backend.
- El frontend centraliza la presentación y las interacciones del usuario.
- La comunicación con backend se realizará mediante los servicios y contratos definidos para la integración.

## 3. Módulos funcionales

El frontend cuenta con los siguientes módulos organizados por responsabilidad:

| Módulo | Responsabilidad |
|---|---|
| Core | Modelos compartidos y cliente de comunicación API. |
| Layout | Estructura visual y navegación principal. |
| Legajos | Gestión y consulta de legajos. |
| Categorías | Administración de categorías documentales. |
| Documentos | Biblioteca documental y visualización de documentos. |
| Completitud | Consulta del estado de completitud documental. |
| Trazabilidad | Seguimiento y consulta de actividades. |
| Notificaciones | Visualización y gestión de notificaciones. |
| Configuración | Administración de parámetros de configuración. |
| Administración | Panel principal del sistema. |

### 3.1. Core

Contiene elementos compartidos por diferentes módulos:

- Modelos de dominio.
- Interfaces y estructuras de datos.
- Cliente API para centralizar la comunicación HTTP.

### 3.2. Layout y navegación

Contiene la estructura principal de la aplicación:

- Distribución general de la interfaz.
- Menú lateral.
- Navegación entre funcionalidades.
- Contenedor de las páginas principales.

### 3.3. Gestión de legajos

Permite trabajar con la información de los legajos, incluyendo sus vistas de consulta y formularios asociados.

### 3.4. Administración de categorías

Contiene las pantallas y estructuras necesarias para administrar las categorías utilizadas en la organización documental.

### 3.5. Biblioteca documental

Contiene la interfaz destinada a la consulta y organización de documentos.

### 3.6. Completitud documental

Permite visualizar información relacionada con el estado de completitud de los documentos asociados a los legajos.

### 3.7. Trazabilidad

Contiene la interfaz para consultar información de seguimiento y actividad del sistema.

### 3.8. Notificaciones

Contiene la interfaz de consulta y gestión de notificaciones.

### 3.9. Configuración

Agrupa las pantallas y modelos relacionados con la configuración del sistema.

### 3.10. Administración

Contiene el panel principal y los elementos asociados a la visualización de información administrativa.

## 4. Organización del código

El proyecto utiliza una organización por funcionalidades (*feature-based architecture*).

```text
src/
└── app/
    ├── core/
    │   ├── http/
    │   └── models/
    │
    ├── features/
    │   ├── administracion/
    │   ├── categorias/
    │   ├── completitud/
    │   ├── configuracion/
    │   ├── documentos/
    │   ├── legajos/
    │   ├── notificaciones/
    │   └── trazabilidad/
    │
    ├── layout/
    │   └── main-layout/
    │
    ├── app.config.ts
    └── app.routes.ts
```

Cada funcionalidad puede organizar sus propios elementos según sus necesidades:

- `data/`: datos de prueba o mocks.
- `models/`: interfaces y modelos.
- `facade/`: coordinación y acceso a datos de la funcionalidad.
- `services/`: servicios de comunicación y lógica de acceso.
- `pages/`: páginas y componentes visuales.

La estructura específica puede variar entre módulos.

## 5. Estado actual de implementación

El frontend cuenta con los módulos y estructuras principales descritos anteriormente.

**Importante:** la existencia de una pantalla, servicio, fachada o modelo no significa necesariamente que su funcionalidad esté conectada al backend.

Durante el desarrollo se han utilizado datos simulados (*mocks*) para construir y probar las interfaces.

| Elemento | Estado |
|---|---|
| Estructura principal Angular | Implementada |
| Navegación principal | Implementada |
| Módulos funcionales principales | Implementados a nivel frontend |
| Modelos compartidos | Incorporados |
| Cliente API | Incorporado |
| Datos simulados (mocks) | Utilizados en distintos módulos |
| Integración completa con BFF | Pendiente de completar |
| Integración con microservicios | Pendiente de completar |
| Autenticación IDaaS | Pendiente de integración |

El estado de cada integración deberá actualizarse a medida que se conecten los servicios reales.

## 6. Comunicación con backend

La arquitectura contempla que el frontend se comunique con el BFF, evitando el acceso directo desde Angular a:

- Bases de datos PostgreSQL.
- Almacenamiento de documentos.
- Microservicios internos.

El BFF será responsable de coordinar las solicitudes hacia los servicios backend correspondientes.

## 7. Instalación y ejecución local

### Requisitos

- Node.js.
- npm.
- Angular CLI compatible con Angular 19.

### Instalar dependencias

```bash
npm install
```

### Iniciar servidor de desarrollo

```bash
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200/
```

## 8. Compilación

Para generar la versión de producción:

```bash
ng build
```

Los archivos generados se almacenan en:

```text
dist/legga-web/
```

La compilación validada durante el último respaldo finalizó correctamente. Se mantienen advertencias de presupuesto de tamaño del bundle inicial y de estilos de configuración, que podrán optimizarse posteriormente.

## 9. Control de versiones

El desarrollo se organiza mediante commits independientes por funcionalidad, utilizando convenciones de mensajes como:

```text
feat(core): agregar modelos compartidos y cliente API
feat(layout): actualizar diseño y navegación principal
feat(legajos): implementar gestión de legajos
feat(categorias): implementar administración de categorías
feat(documentos): implementar biblioteca documental
feat(completitud): implementar módulo de completitud
feat(trazabilidad): implementar módulo de trazabilidad
feat(notificaciones): implementar módulo de notificaciones
feat(configuracion): implementar configuración del sistema
feat(administracion): implementar panel principal
chore(build): ajustar presupuesto de estilos Angular
```

## 10. Repositorio

**Proyecto:** LEGGA – Frontend

**Repositorio GitHub:**

https://github.com/CrisDebug/Legga-frontend

**Rama principal:** `main`

---

**LEGGA – Sistema de gestión digital de legajos y documentos.**

Frontend en desarrollo, con arquitectura preparada para avanzar hacia la integración con los servicios backend.