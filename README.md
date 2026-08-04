# 🚀 wcommits-docs

> **Sitio web de documentación interactiva y generador de mensajes de commit para `wcommits`.**

**wcommits-docs** es la plataforma web moderna, interactiva y multilingüe diseñada para enseñar, construir y estandarizar mensajes de commit basados en la especificación [Conventional Commits](https://www.conventionalcommits.org/). 

Construida con **Astro 7**, **TypeScript** estricto y un diseño enfocado en la mejor experiencia de usuario y desarrollador.

---

## ✨ Características Principales

- 🛠️ **Generador Interactivo de Commits**: Construye mensajes en tiempo real seleccionando el tipo (`feat`, `fix`, `docs`, etc.), ámbito (*scope*), descripción, cuerpo y nota de breaking changes. Obtén directamente el mensaje formateado, el comando CLI de `wcommits` o la instrucción `git commit`.
- 📖 **Guía de Tipos de Commit**: Documentación clara e interactiva de los 11 tipos estándar de Conventional Commits con ejemplos prácticos.
- 🌐 **Internacionalización Reactiva (i18n)**: Cambia fluidamente entre Español y Inglés sin necesidad de recargar la página gracias a un servicio Pub/Sub desacoplado.
- 📋 **Copia al Portapapeles & Feedback Toast**: Copia comandos o mensajes con un clic, con fallback transparente para entornos restrictivos y notificaciones accesibles (`aria-live`).
- 🔍 **Búsqueda Rápida Integrada**: Modal interactivo de búsqueda para acceder rápidamente a tipos de commit, comandos CLI o secciones de la documentación.
- 🎨 **Diseño Moderno y Accesible**: Interfaz responsive construida con CSS nativo modular, animaciones fluidas y estándares ARIA de accesibilidad.

---

## 🛠️ Tecnologías Utilizadas

- **Framework Web**: [Astro 7](https://astro.build/)
- **Lenguaje**: TypeScript (Strict Type Safety)
- **Gestor de Paquetes**: `pnpm`
- **Entorno Runtime**: Node.js `>= 22.12.0`
- **Estilos**: CSS Vanilla con variables de diseño nativas y animaciones adaptativas

---

## 📁 Estructura del Proyecto

```text
wcommits-docs/
├── docs/
│   └── ARCHITECTURE.md       # Documentación de arquitectura y diseño de código
├── public/                   # Recuentos estáticos y favicons
├── src/
│   ├── components/           # Componentes UI en Astro (Hero, InteractiveBuilder, CommitTypes, etc.)
│   ├── domain/               # Lógica de negocio pura (CommitEngine, tipos)
│   ├── i18n/                 # Servicio singleton Pub/Sub de traducción y diccionarios (es/en)
│   ├── layouts/              # Layout principal de la aplicación (Layout.astro)
│   ├── pages/                # Páginas y rutas de Astro (index.astro)
│   ├── services/             # Servicios de infraestructura (Feedback, ToastManager, Clipboard)
│   └── styles/               # Sistema de diseño CSS global y tokens de estilo
├── AGENTS.md                 # Guía para agentes de IA e instrucciones de desarrollo
├── astro.config.mjs          # Configuración principal de Astro
└── package.json              # Dependencias y scripts del proyecto
```

---

## 🚀 Inicio Rápido

### Requisitos Previos

Asegúrate de tener instalado Node.js (versión 22.12.0 o superior) y `pnpm`:

```bash
node -v # >= 22.12.0
pnpm -v
```

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/wcommits-docs.git
   cd wcommits-docs
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   ```

---

## 💻 Scripts Disponibles

En la raíz del proyecto, puedes ejecutar los siguientes comandos:

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo local en `http://localhost:4321` |
| `pnpm build` | Compila el sitio para producción en la carpeta `./dist/` |
| `pnpm preview` | Permite previsualizar localmente el build de producción |
| `pnpm astro ...` | Ejecuta comandos de la CLI de Astro (ej. `pnpm astro add`) |

> 💡 **Nota para agentes / desarrollo en segundo plano:**
> Puedes iniciar el servidor de desarrollo en segundo plano ejecutando `astro dev --background`.

---

## 🏛️ Arquitectura del Código

El proyecto sigue una arquitectura desacoplada basada en módulos profundos:

1. **Capa de Dominio (`src/domain/`)**: Lógica pura TypeScript (ej. `CommitEngine`) totalmente desacoplada del DOM y del framework.
2. **Capa de Servicios (`src/services/` e `src/i18n/`)**: Manejo de notificaciones, copias a portapapeles e internacionalización basada en eventos Pub/Sub.
3. **Capa de Vista (`src/components/` y `src/pages/`)**: Componentes Astro e interactividad ligera del cliente.

Para conocer más detalles sobre los patrones de diseño y guías de mantenimiento, consulta [ARCHITECTURE.md](file:///home/evilseed/Dev/wcommits-docs/docs/ARCHITECTURE.md).

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulte el archivo LICENSE para obtener más información.
