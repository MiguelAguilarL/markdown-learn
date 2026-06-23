export interface ReferenceItem {
  name: string;
  syntax: string;
  preview: string;
  description: string;
}

export interface ReferenceSection {
  title: string;
  items: ReferenceItem[];
}

export interface ReferenceData {
  commonmark: ReferenceSection[];
  gfm: ReferenceSection[];
}

export const referenceData: ReferenceData = {
  // ─────────────────────────────────────────────
  // COMMONMARK
  // ─────────────────────────────────────────────
  commonmark: [
    // ── 1. ENCABEZADOS ──────────────────────────
    {
      title: 'Encabezados',
      items: [
        {
          name: 'H1 — Título principal',
          syntax: '# Título del documento',
          preview: '<h1>Título del documento</h1>',
          description:
            'Escribe `#` seguido de un espacio y el texto. Solo debe haber un H1 por documento: es el título principal.',
        },
        {
          name: 'H2, H3, H4, H5 — Subtítulo de sección',
          syntax: '## H2\n### H3\n#### H4\n##### H5',
          preview: '<h2>H2</h2><h3>H3</h3><h4>H4</h4><h5>H5</h5>',
          description:
            'Dos almohadillas `##` crean un subtítulo de sección. Úsalo para dividir el documento en partes.',
        },
      ],
    },

    // ── 2. PÁRRAFOS Y SALTOS ────────────────────
    {
      title: 'Párrafos y Saltos',
      items: [
        {
          name: 'Párrafo simple',
          syntax: 'Escribe tu texto aquí.',
          preview: '<p>Escribe tu texto aquí.</p>',
          description:
            'Escribe texto plano y se convierte en un párrafo. No necesitas ningún símbolo especial.',
        },
        {
          name: 'Dos párrafos separados',
          syntax: 'Primer párrafo.\n\nSegundo párrafo.',
          preview: '<p>Primer párrafo.</p><p>Segundo párrafo.</p>',
          description:
            'Deja una línea completamente vacía entre dos bloques de texto para crear dos párrafos independientes.',
        },
        {
          name: 'Salto de línea forzado con `\\`',
          syntax: 'Primera línea\\\nSegunda línea',
          preview: '<p>Primera línea<br>Segunda línea</p>',
          description:
            'Termina la línea con `\\` para forzar un salto dentro del mismo párrafo, sin crear uno nuevo.',
        },
        {
          name: 'Salto de línea forzado con dos espacios',
          syntax: 'Primera línea  \nSegunda línea',
          preview: '<p>Primera línea<br>Segunda línea</p>',
          description:
            'Dos espacios al final de la línea también fuerzan un salto. La barra invertida `\\` es más visible y recomendable.',
        },
      ],
    },

    // ── 3. REGLAS HORIZONTALES ──────────────────
    {
      title: 'Reglas Horizontales',
      items: [
        {
          name: 'Separador con guiones `---`',
          syntax: '---',
          preview: '<hr>',
          description:
            'Escribe tres guiones en una línea vacía para crear una línea divisoria. Es la forma más común y recomendada.',
        },
        {
          name: 'Separador con asteriscos `***`',
          syntax: '***',
          preview: '<hr>',
          description:
            'Tres asteriscos también producen una regla horizontal. Produce el mismo resultado visual que `---`.',
        },
        {
          name: 'Separador con guiones bajos `___`',
          syntax: '___',
          preview: '<hr>',
          description:
            'Tres guiones bajos son la tercera variante. Las tres formas son equivalentes en CommonMark.',
        },
      ],
    },

    // ── 4. NEGRITA Y CURSIVA ────────────────────
    {
      title: 'Negrita y Cursiva',
      items: [
        {
          name: 'Cursiva',
          syntax: '*texto en cursiva*',
          preview: '<em>texto en cursiva</em>',
          description:
            'Rodea el texto con un asterisco `*` por cada lado. Produce énfasis ligero (texto inclinado).',
        },
        {
          name: 'Negrita',
          syntax: '**texto en negrita**',
          preview: '<strong>texto en negrita</strong>',
          description:
            'Rodea el texto con dos asteriscos `**` por cada lado. Produce énfasis fuerte (texto en negrita).',
        },
        {
          name: 'Negrita + Cursiva',
          syntax: '***negrita y cursiva***',
          preview: '<strong><em>negrita y cursiva</em></strong>',
          description:
            'Tres asteriscos `***` por cada lado aplican negrita y cursiva simultáneamente. Es el énfasis más fuerte disponible.',
        },
      ],
    },

    // ── 5. LISTAS ───────────────────────────────
    {
      title: 'Listas',
      items: [
        {
          name: 'Lista no ordenada',
          syntax: '- Elemento 1\n- Elemento 2\n- Elemento 3',
          preview:
            '<ul><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 3</li></ul>',
          description:
            'Usa `- ` (guion + espacio) antes de cada elemento. También puedes usar `*` o `+`. Cada ítem va en su propia línea.',
        },
        {
          name: 'Lista ordenada',
          syntax: '1. Primer paso\n2. Segundo paso\n3. Tercer paso',
          preview:
            '<ol><li>Primer paso</li><li>Segundo paso</li><li>Tercer paso</li></ol>',
          description:
            'Usa número, punto y espacio (`1. `) para cada elemento. Los números no necesitan ser correlativos, el renderizador los ordena.',
        },
        {
          name: 'Listas anidadas',
          syntax: '* Lista principal\n  * Lista anidada\n    1. Sub-ítem',
          preview:
            '<ul><li>Lista principal<ul><li>Lista anidada<ol><li>Sub-ítem</li></ol></li></ul></li></ul>',
          description:
            'Para anidar listas, aumenta el nivel de indentación con espacios (generalmente 2 o 4) antes del nuevo elemento.',
        },
      ],
    },

    // ── 6. ENLACES ──────────────────────────────
    {
      title: 'Enlaces',
      items: [
        {
          name: 'Enlace básico',
          syntax: '[Texto del enlace](https://ejemplo.com)',
          preview: '<a href="https://ejemplo.com">Texto del enlace</a>',
          description:
            'El texto visible va entre corchetes `[]` y la URL de destino entre paréntesis `()`. Al hacer clic el usuario va a la URL.',
        },
        {
          name: 'Enlace con texto descriptivo',
          syntax: '[Visita la página oficial](https://ejemplo.com)',
          preview: '<a href="https://ejemplo.com">Visita la página oficial</a>',
          description:
            'El texto entre corchetes puede ser tan largo como necesites, incluyendo espacios. Usa textos descriptivos en lugar de URLs crudas.',
        },
        {
          name: 'Encabezado + enlace (combinado)',
          syntax: '## Recursos útiles\n[Nombre del recurso](https://ejemplo.com)',
          preview:
            '<h2>Recursos útiles</h2><a href="https://ejemplo.com">Nombre del recurso</a>',
          description:
            'En documentos técnicos los enlaces se agrupan bajo un encabezado de sección. Este patrón es muy habitual en READMEs.',
        },
      ],
    },

    // ── 7. IMÁGENES ─────────────────────────────
    {
      title: 'Imágenes',
      items: [
        {
          name: 'Imagen básica',
          syntax: '![Texto alternativo](https://via.placeholder.com/120)',
          preview: '<img src="https://via.placeholder.com/120" alt="Texto alternativo">',
          description:
            'Igual que un enlace pero con `!` al principio. El texto entre `[]` es el texto alternativo (alt) que aparece si la imagen no carga.',
        },
        {
          name: 'Imagen con título emergente',
          syntax: '![Texto alternativo](https://via.placeholder.com/120 "Título de la imagen")',
          preview:
            '<img src="https://via.placeholder.com/120" alt="Texto alternativo" title="Título de la imagen">',
          description:
            'Añade un título entre comillas dobles después de la URL. Aparece como tooltip al pasar el cursor sobre la imagen.',
        },
        {
          name: 'Encabezado + imagen (combinado)',
          syntax: '## Sección visual\n![Descripción](https://via.placeholder.com/200)',
          preview:
            '<h2>Sección visual</h2><img src="https://via.placeholder.com/200" alt="Descripción">',
          description:
            'En blogs y READMEs es muy común colocar una imagen destacada justo debajo del título de la sección.',
        },
      ],
    },

    // ── 8. CITAS (BLOCKQUOTES) ──────────────────
    {
      title: 'Citas (Blockquotes)',
      items: [
        {
          name: 'Cita simple',
          syntax: '> Texto de la cita.',
          preview: '<blockquote><p>Texto de la cita.</p></blockquote>',
          description:
            'Escribe `> ` (mayor-que + espacio) al inicio de la línea. El texto se muestra con sangría y borde lateral.',
        },
        {
          name: 'Cita de varias líneas',
          syntax: '> Primera línea.\n> Segunda línea.',
          preview:
            '<blockquote><p>Primera línea.<br>Segunda línea.</p></blockquote>',
          description:
            'Cada línea de la cita debe comenzar con `> `. Todas forman un único bloque de cita continuo.',
        }
      ],
    },

    // ── 9. CÓDIGO ───────────────────────────────
    {
      title: 'Código',
      items: [
        {
          name: 'Código en línea (inline)',
          syntax: '`nombre_funcion()`',
          preview: '<code>nombre_funcion()</code>',
          description:
            'Rodea el fragmento con backticks `` ` ``. Ideal para nombres de funciones, variables o comandos dentro de un párrafo.',
        },
        {
          name: 'Bloque de código sin lenguaje',
          syntax: '```\ncontenido del bloque\n```',
          preview: '<pre><code>contenido del bloque</code></pre>',
          description:
            'Abre y cierra con tres backticks en líneas separadas. El contenido se muestra en monoespacio sin resaltado de sintaxis.',
        }
      ],
    },

    // ── 10. ESCAPADO ─────────────────────────────
    {
      title: 'Escapado de Caracteres',
      items: [
        {
          name: 'Escapar asterisco `\\*`',
          syntax: '\\*texto sin cursiva\\*',
          preview: '*texto sin cursiva*',
          description:
            'Antepón `\\` al asterisco para mostrarlo literal en lugar de iniciar formato de cursiva.',
        },
        {
          name: 'Escapar almohadilla `\\#`',
          syntax: '\\# Esto no es un encabezado',
          preview: '# Esto no es un encabezado',
          description:
            'Antepón `\\` a la almohadilla para que no se interprete como inicio de encabezado.',
        },
        {
          name: 'Escapar corchetes `\\[` `\\]`',
          syntax: '\\[texto entre corchetes\\]',
          preview: '[texto entre corchetes]',
          description:
            'Escapa ambos corchetes para mostrarlos como texto literal sin que Markdown los interprete como inicio de enlace.',
        },
      ],
    },

    // ── 11. HTML EN MARKDOWN ─────────────────────
    {
      title: 'HTML en Markdown',
      items: [
        {
          name: 'Negrita con `<strong>`',
          syntax: '<strong>Texto en negrita</strong>',
          preview: '<strong>Texto en negrita</strong>',
          description:
            'CommonMark permite HTML inline directamente. `<strong>` es el equivalente HTML de la negrita `**texto**`.',
        },
        {
          name: 'Cursiva con `<em>`',
          syntax: '<em>Texto en cursiva</em>',
          preview: '<em>Texto en cursiva</em>',
          description:
            '`<em>` es el equivalente HTML de la cursiva `*texto*`. Ambas producen el mismo resultado visual.',
        },
        {
          name: 'Subrayado con `<u>` (solo HTML)',
          syntax: '<u>Texto subrayado</u>',
          preview: '<u>Texto subrayado</u>',
          description:
            'El subrayado no existe en Markdown nativo. La etiqueta HTML `<u>` es la única manera de conseguirlo.',
        },
      ],
    },
  ],

  // ─────────────────────────────────────────────
  // GFM
  // ─────────────────────────────────────────────
  gfm: [
    // ── 12. TABLAS ───────────────────────────────
    {
      title: 'Tablas',
      items: [
        {
          name: 'Tabla de una columna',
          syntax: '| Encabezado |\n|---|\n| Dato |',
          preview:
            '<table><thead><tr><th>Encabezado</th></tr></thead><tbody><tr><td>Dato</td></tr></tbody></table>',
          description:
            'Una tabla necesita tres partes: fila de cabecera `| Col |`, fila separadora `|---|` y filas de datos `| dato |`.',
        },
        {
          name: 'Tabla de dos columnas',
          syntax: '| Col A | Col B |\n|---|---|\n| Dato 1 | Dato 2 |',
          preview:
            '<table><thead><tr><th>Col A</th><th>Col B</th></tr></thead><tbody><tr><td>Dato 1</td><td>Dato 2</td></tr></tbody></table>',
          description:
            'Añade más celdas separadas por `|` para agregar columnas. La fila separadora debe tener una celda `---` por cada columna.',
        },
        {
          name: 'Columna centrada con `:---:`',
          syntax: '| Izquierda | Centro |\n|---|:---:|\n| texto | texto |',
          preview:
            '<table><thead><tr><th>Izquierda</th><th style="text-align:center">Centro</th></tr></thead><tbody><tr><td>texto</td><td style="text-align:center">texto</td></tr></tbody></table>',
          description:
            'Controla la alineación con `:` en el separador: `:---` izquierda, `:---:` centro, `---:` derecha.',
        }
      ],
    },

    // ── 13. LISTAS DE TAREAS ─────────────────────
    {
      title: 'Listas de Tareas',
      items: [
        {
          name: 'Tarea pendiente',
          syntax: '- [ ] Tarea por hacer',
          preview:
            '<ul><li><input type="checkbox" disabled> Tarea por hacer</li></ul>',
          description:
            'Usa `- [ ] ` (guion, espacio, corchetes con espacio dentro, espacio). El espacio dentro de `[ ]` es obligatorio.',
        },
        {
          name: 'Tarea completada',
          syntax: '- [x] Tarea completada',
          preview:
            '<ul><li><input type="checkbox" checked disabled> Tarea completada</li></ul>',
          description:
            'Usa `- [x] ` con una `x` minúscula para marcar la tarea como completada. La casilla aparece marcada.',
        }
      ],
    },

    // ── 14. TACHADO ──────────────────────────────
    {
      title: 'Tachado',
      items: [
        {
          name: 'Tachar una palabra',
          syntax: '~~palabra~~',
          preview: '<del>palabra</del>',
          description:
            'Rodea el texto con dobles virgulillas `~~` por cada lado. Muestra el texto con una línea horizontal que lo atraviesa.',
        },
        {
          name: 'Tachar una frase',
          syntax: '~~frase completa tachada~~',
          preview: '<del>frase completa tachada</del>',
          description:
            'Las virgulillas engloban todo el texto incluyendo espacios. Úsalo para indicar contenido obsoleto o eliminado.',
        },
        {
          name: 'Tachado + negrita',
          syntax: '~~**texto tachado y negrita**~~',
          preview: '<del><strong>texto tachado y negrita</strong></del>',
          description:
            'La sintaxis GFM y CommonMark se puede combinar. Las virgulillas van por fuera y los asteriscos de negrita por dentro.',
        },
      ],
    },
  ],
};
