# 📚 Markdown Learn

Una aplicación web interactiva diseñada para aprender la sintaxis básica de **Markdown** (tanto CommonMark como GitHub Flavored Markdown - GFM) de una manera sencilla, guiada y práctica.

> **Web:** Pendiente de publicación (Próximamente en producción).

---

## ¿Por qué se hizo?

El propósito principal de **Markdown Learn** es ofrecer una plataforma interactiva y amigable que permita a cualquier persona **aprender y practicar la sintaxis básica de Markdown**. A través de pequeños ejercicios prácticos y progresivos, el usuario escribe código Markdown y ve el resultado renderizado en tiempo real, facilitando la retención de los conceptos básicos de forma sencilla y directa.

---

## Características Principales

- 📖 **Aprendizaje Guiado:** Ejercicios divididos por categorías (Encabezados, Listas, Enlaces, Tablas, etc.).
- ✍️ **Editor con Feedback en Tiempo Real:** Validación automática del código escrito mediante patrones y expresiones regulares.
- 🗂️ **Soporte CommonMark y GFM:** Desde la sintaxis clásica de Markdown hasta añadidos avanzados de GitHub Flavored Markdown (listas de tareas, tablas, tachado).
- 🔍 **Guía de Referencia Integrada:** Panel lateral rápido que se puede abrir en cualquier momento para buscar sintaxis, con soporte de pestañas (CommonMark/GFM) y filtrado de búsqueda.

---

## Tecnologías Utilizadas

- **Core:** [React 19](https://react.dev/) & [Next.js 16 (App Router)](https://nextjs.org/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Procesamiento de Markdown:** `react-markdown`, `remark-gfm`, `rehype-raw`, `remark-breaks`

---

## Estructura del Proyecto

A continuación se detalla la estructura principal del código fuente en el directorio `src/`:

- **`src/app/`**: Configuración de entrada e inicialización de Next.js (layout raíz, estilos globales y envoltura de proveedores).
- **`src/components/`**: Componentes reutilizables de la interfaz de usuario:
  - `layout/`: Componentes estructurales principales, como la barra lateral (`Sidebar.tsx`) y la barra inferior de navegación y verificación (`BottomBar.tsx`).
  - `reference/`: Componentes de interfaz para el panel flotante de la Guía Rápida de Markdown (`ReferencePanel.tsx`).
- **`src/context/`**: Proveedores de estado global:
  - `ProgressContext.tsx`: Controla los ejercicios completados.
  - `ReferenceContext.tsx`: Gestiona la visibilidad del panel de ayuda, la pestaña seleccionada y los filtros de búsqueda activa.
- **`src/data/`**: Estructuras de datos estáticas:
  - `exercises.ts`: Configuración detallada de cada módulo, instrucciones de ejercicios, pistas y patrones de validación.
  - `reference-content.ts`: Contenidos estructurados que alimentan de forma dinámica la Guía de Referencia.
- **`src/hooks/`**: Custom hooks de React para simplificar el acceso a los datos de la aplicación (`useProgress.ts`, `useReference.ts`).

---

## Configuración y Ejecución Local

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias necesarias:
   ```bash
   pnpm install
   # o bien
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   pnpm dev
   # o bien
   npm run dev
   ```
4. Accede desde tu navegador a [http://localhost:3000](http://localhost:3000).
