
import { CompletitudLegajoDTO } from '../models/completitud-api.model';
import { LEGAJOS_MOCK } from '../../legajos/data/legajos.mock';

/**
 * Datos demostrativos para desarrollar F-09.
 *
 * Los requisitos son ficticios y sirven para probar la interfaz.
 * No representan todavía la configuración definitiva del negocio.
 *
 * Se reutilizan los identificadores de LEGAJOS_MOCK.
 */

const REQUISITOS_DEMOSTRATIVOS = [
  {
    codigo: 'REQ-001',
    nombre: 'Documento de identificación',
    obligatorio: true
  },
  {
    codigo: 'REQ-002',
    nombre: 'Formulario de antecedentes',
    obligatorio: true
  },
  {
    codigo: 'REQ-003',
    nombre: 'Documento de respaldo',
    obligatorio: true
  },
  {
    codigo: 'REQ-004',
    nombre: 'Documentación complementaria',
    obligatorio: false
  }
];

/**
 * Genera un resultado demostrativo para cada legajo.
 *
 * La distribución de requisitos cumplidos es ficticia.
 */
export const COMPLETITUD_MOCK: CompletitudLegajoDTO[] =
  LEGAJOS_MOCK.map((legajo, indice) => {

    const requisitos = REQUISITOS_DEMOSTRATIVOS.map(
      (requisito, posicion) => {

        const cumplido =
          (indice + posicion) % 4 !== 0;

        return {
          requisitoId: `${legajo.categoriaId}-${requisito.codigo}`,
          codigo: requisito.codigo,
          nombre: requisito.nombre,
          obligatorio: requisito.obligatorio,
          cumplido,
          cantidadDocumentosValidos: cumplido ? 1 : 0,
          documentos: cumplido
            ? [
                {
                  documentoId: `doc-${legajo.id}-${posicion + 1}`,
                  nombreVisible: `${requisito.nombre}.pdf`
                }
              ]
            : []
        };
      }
    );

    const requisitosObligatorios = requisitos.filter(
      requisito => requisito.obligatorio
    );

    const requisitosCumplidos = requisitosObligatorios.filter(
      requisito => requisito.cumplido
    ).length;

    const requisitosPendientes =
      requisitosObligatorios.length - requisitosCumplidos;

    const porcentajeCompletitud =
      requisitosObligatorios.length === 0
        ? 100
        : Math.round(
            (requisitosCumplidos / requisitosObligatorios.length) * 100
          );

    return {
      legajoId: legajo.id,
      resumen: {
        totalRequisitos: requisitosObligatorios.length,
        requisitosCumplidos,
        requisitosPendientes,
        porcentajeCompletitud,
        completo: requisitosPendientes === 0
      },
      requisitos,
      calculadoEn: new Date().toISOString()
    };
  });
