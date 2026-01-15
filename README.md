# Tlapa Multiservicios - Sistema de Gestión Territorial y de Pagos

## 1. Introducción

**Tlapa Multiservicios** es una aplicación web integral diseñada para la administración y gestión de servicios municipales en Tlapa de Comonfort. El sistema centraliza la información de contribuyentes, inmuebles y pagos de servicios como agua, predial y catastro, proporcionando herramientas eficientes para el personal administrativo y técnico.

La aplicación está construida con un enfoque moderno, utilizando tecnologías de vanguardia para ofrecer una experiencia de usuario fluida, segura y escalable.

## 2. Características Principales

- **Dashboard Analítico:** Visualización de KPIs (Indicadores Clave de Rendimiento) como recaudación mensual/anual, total de contribuyentes, estado de los servicios (al corriente, atrasado, en mora) y distribución de servicios por tipo.
- **Gestión de Contribuyentes:**
    - Registro manual de nuevos contribuyentes a través de un formulario intuitivo.
    - Importación masiva de contribuyentes desde archivos de Excel (`.xlsx`), validando la estructura del archivo.
- **Gestión de Inmuebles y Servicios:**
    - Visualización de inmuebles geolocalizados en un mapa interactivo de Google Maps.
    - Marcadores de colores en el mapa que indican el estado de pago de los servicios asociados a cada inmueble (verde, naranja, rojo).
    - Fichas de información detallada por inmueble al seleccionarlos en el mapa.
- **Vista de Técnico:** Un mapa especializado para que el personal de campo pueda verificar y actualizar la ubicación de los inmuebles.
- **Generador de Reportes:** Módulo para filtrar y exportar datos del sistema a formatos como PDF o Excel.
- **Integración con IA (Genkit):** La arquitectura está preparada con Genkit para futuras implementaciones de IA, como la corrección de direcciones o el análisis predictivo de morosidad.

## 3. Arquitectura y Stack Tecnológico

El proyecto sigue una arquitectura moderna basada en componentes, aprovechando el renderizado del lado del servidor (SSR) y del cliente (CSR) según sea necesario.

- **Framework Principal:** [**Next.js**](https://nextjs.org/) (usando el App Router).
- **Lenguaje:** [**TypeScript**](https://www.typescriptlang.org/).
- **Estilos:** [**Tailwind CSS**](https://tailwindcss.com/) para un diseño basado en utilidades.
- **Componentes de UI:** [**ShadCN/UI**](https://ui.shadcn.com/) para un conjunto de componentes accesibles y personalizables.
- **Mapas:** [**React Google Maps**](https://visgl.github.io/react-google-maps/) para la integración de mapas interactivos.
- **Formularios:** [**React Hook Form**](https://react-hook-form.com/) y [**Zod**](https://zod.dev/) para la gestión y validación de formularios.
- **Visualización de Datos:** [**Recharts**](https://recharts.org/) para los gráficos del dashboard.
- **Inteligencia Artificial:** [**Genkit (Firebase)**](https://firebase.google.com/docs/genkit) para la orquestación de flujos de IA.
- **Despliegue:** [**Render**](https://render.com/).

## 4. Estructura del Proyecto

La estructura de carpetas está organizada para mantener la claridad y la escalabilidad.

```
/
├── src/
│   ├── app/                    # Rutas y páginas de la aplicación (Next.js App Router)
│   │   ├── (app)/              # Rutas protegidas que usan el layout principal (AppShell)
│   │   │   ├── dashboard/
│   │   │   ├── contributors/
│   │   │   ├── technician/
│   │   │   └── reports/
│   │   ├── (auth)/             # Rutas de autenticación
│   │   │   └── login/
│   │   ├── layout.tsx          # Layout raíz de la aplicación
│   │   └── page.tsx            # Página de inicio (redirecciona al dashboard)
│   │
│   ├── components/             # Componentes de React reutilizables
│   │   ├── dashboard/          # Componentes específicos del dashboard
│   │   ├── contributors/       # Componentes para la gestión de contribuyentes
│   │   ├── layout/             # Componentes de la estructura principal (ej. AppShell, Sidebar)
│   │   ├── map/                # Componentes relacionados con Google Maps
│   │   └── ui/                 # Componentes base de ShadCN (Button, Card, etc.)
│   │
│   ├── lib/                    # Lógica de negocio, tipos y utilidades
│   │   ├── data.ts             # Datos de prueba (mocks)
│   │   ├── helpers.ts          # Funciones de ayuda (ej. calcular estado de pago)
│   │   ├── types.ts            # Definiciones de tipos y interfaces de TypeScript
│   │   └── utils.ts            # Utilidades generales (ej. `cn` para clases de Tailwind)
│   │
│   └── ai/                     # Módulos y flujos de Inteligencia Artificial
│       ├── flows/              # Flujos de Genkit para interactuar con modelos de IA
│       └── genkit.ts           # Configuración e inicialización de Genkit
│
├── public/                     # Archivos estáticos
├── .env.local                  # Variables de entorno locales (NO subir a Git)
├── next.config.ts              # Configuración de Next.js
├── tailwind.config.ts          # Configuración de Tailwind CSS
├── components.json             # Configuración de ShadCN/UI
└── render.yaml                 # Configuración de despliegue para Render
```

## 5. Variables de Entorno

Para ejecutar el proyecto localmente, es necesario crear un archivo `.env.local` en la raíz del proyecto con la siguiente variable:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="TU_API_KEY_AQUI"
```

Reemplaza `"TU_API_key_aqui"` con tu clave de API de Google Maps Platform.

## 6. Ejecución en Local

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:9002`.

## 7. Despliegue

El proyecto está configurado para desplegarse en **Render** usando el archivo `render.yaml`. Simplemente conecta el repositorio de GitHub a un nuevo "Web Service" en Render. Render detectará el archivo `render.yaml` y configurará automáticamente el entorno, los comandos de construcción y el comando de inicio.

**Importante:** No olvides añadir la variable de entorno `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` en la configuración del servicio en el dashboard de Render.
