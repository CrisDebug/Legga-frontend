# LEGGA – Frontend

Aplicación web del proyecto **LEGGA**, orientada a la gestión digital de legajos y documentos.

## Tecnologías

- Angular 19
- TypeScript
- Tailwind CSS

## Arquitectura

El frontend funciona como interfaz de usuario y se comunica con los servicios backend a través de un **Backend for Frontend (BFF)**.

La lógica de negocio, las validaciones y el acceso a datos son responsabilidad del backend.

## Ejecución local

Instalar dependencias:

```bash
npm install
```

Iniciar servidor de desarrollo:

```bash
ng serve
```

Abrir `http://localhost:4200/`.

## Compilación

```bash
ng build
```

Los archivos generados se almacenan en `dist/`.

## Estado del proyecto

Frontend en desarrollo. La integración con el BFF y los servicios backend se realizará progresivamente.