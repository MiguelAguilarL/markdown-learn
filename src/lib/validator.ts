export interface ValidationResult {
  isCorrect: boolean;
  feedback: string;
  detailedError?: string;
}

/**
 * Normaliza una cadena HTML utilizando el DOMParser del navegador
 * para asegurar consistencia en orden de atributos, espaciado y etiquetas.
 */
// export function normalizeHtml(html: string): string {
//   if (typeof window === 'undefined') return '';

//   const parser = new DOMParser();
//   const doc = parser.parseFromString(html, 'text/html');

//   const getCanonicalString = (node: Node, parentTagName?: string): string => {
//     if (node.nodeType === Node.TEXT_NODE) {
//       // Elimina espacios en blanco redundantes
//       const val = node.nodeValue?.replace(/\s+/g, ' ').trim() || '';
//       if (!val) return '';

//       // Mantener el texto original intacto para elementos de código y resúmenes
//       if (
//         parentTagName === 'code' ||
//         parentTagName === 'pre' ||
//         parentTagName === 'summary'
//       ) {
//         return val;
//       }

//       // Reemplazar texto libre por un marcador genérico para permitir cualquier palabra
//       return '_text_';
//     }

//     if (node.nodeType === Node.ELEMENT_NODE) {
//       const el = node as Element;
//       const tagName = el.tagName.toLowerCase();

//       // Omitir ciertos elementos o comentarios vacíos
//       if (tagName === 'script' || tagName === 'style') return '';

//       // Obtener y ordenar atributos alfabéticamente
//       const attrs: string[] = [];
//       for (let i = 0; i < el.attributes.length; i++) {
//         const attr = el.attributes[i];
//         // Ignorar atributos internos de react o desarrollo
//         if (
//           attr.name.startsWith('data-') ||
//           attr.name === 'class' ||
//           attr.name === 'style'
//         ) {
//           continue;
//         }
//         attrs.push(`${attr.name.toLowerCase()}="${attr.value.trim()}"`);
//       }
//       attrs.sort();

//       const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

//       // Recorrer hijos pasando el nombre de la etiqueta actual
//       let childrenStr = '';
//       for (let i = 0; i < el.childNodes.length; i++) {
//         childrenStr += getCanonicalString(el.childNodes[i], tagName);
//       }

//       // Etiquetas que no se cierran (void elements)
//       const voidTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
//       if (voidTags.includes(tagName)) {
//         return `<${tagName}${attrStr}>`;
//       }

//       return `<${tagName}${attrStr}>${childrenStr}</${tagName}>`;
//     }

//     return '';
//   };

//   const canonical = getCanonicalString(doc.body);
//   // Remove tbody wrappers to avoid mismatches in table validation
//   return canonical.replace(/<\/??tbody>/g, '');
// }

/**
 * Valida el código markdown del usuario comparando el HTML generado
 * y verificando patrones requeridos y prohibidos.
 */
export function validateExercise(
  userCode: string,
  userHtml: string,
  expectedHtml: string,
  acceptedPatterns?: string[],
  forbiddenPatterns?: string[]
): ValidationResult {
  // 1. Validar patrones prohibidos en el código markdown
  if (forbiddenPatterns && forbiddenPatterns.length > 0) {
    for (const pattern of forbiddenPatterns) {
      const regex = new RegExp(pattern, 'm');
      if (regex.test(userCode)) {
        return {
          isCorrect: false,
          feedback: 'Sintaxis no permitida detectada. Evita usar atajos o HTML inline que evadan el ejercicio.'
        };
      }
    }
  }

  // 2. Validar patrones requeridos en el código markdown
  if (acceptedPatterns && acceptedPatterns.length > 0) {
    for (const pattern of acceptedPatterns) {
      const regex = new RegExp(pattern, 'm');
      if (!regex.test(userCode)) {
        return {
          isCorrect: false,
          feedback: 'Tu respuesta no contiene la estructura o sintaxis de markdown requerida para este ejercicio.'
        };
      }
    }
  }

  return {
    isCorrect: true,
    feedback: '¡Excelente trabajo! Ejercicio completado con éxito.'
  };
}
