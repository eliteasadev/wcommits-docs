# Arquitectura del Proyecto wcommits-docs

Este documento describe los patrones de diseño, módulos de dominio, capas de abstracción y guías de mantenimiento para **wcommits-docs**.

---

## 🏛️ Visión General de la Arquitectura

El proyecto sigue los principios de **Deep Modules** (Módulos Profundos), **Locality** (Localidad de Estado y Lógica) y **Type-Safety** (Seguridad Estricta de Tipos en TypeScript).

```mermaid
graph TD
    subgraph View Layer (Astro / Client Scripts)
        UI_Builder[InteractiveBuilder.astro]
        UI_Clip[ClipboardSupport.astro]
        UI_Components[Hero / QuickStart / Workflow]
    end

    subgraph Domain Layer (Pure TypeScript Core)
        CommitEngine[src/domain/commit-engine]
        I18nService[src/i18n/i18n-service]
    end

    subgraph Service Layer (Infrastructure & Utilities)
        FeedbackService[src/services/feedback]
        ToastManager[ToastManager + ARIA]
        ClipboardService[ClipboardService + Fallback]
    end

    UI_Builder -->|Commit Message Generation| CommitEngine
    UI_Builder -->|Copy & Toast| FeedbackService
    UI_Clip -->|Localized Content| I18nService
    UI_Components -->|Copy & Toast| FeedbackService
    UI_Components -->|Translation Key Lookup| I18nService
```

---

## 📦 Módulos Principales

### 1. `CommitEngine` (`src/domain/commit-engine/`)
Módulo de dominio puro totalmente libre de dependencias del DOM o de Astro.

- **`types.ts`**: Define el tipo de unión `CommitType` (los 11 tipos estándar de Conventional Commits), arreglos de validación `COMMIT_TYPES`, e interfaces `CommitOptions` y `FormattedCommitResult`.
- **`CommitEngine.ts`**: Fachada principal de dominio. Encapsula:
  - Sanitización y validación de reglas de Conventional Commits.
  - Generación de sintaxis formateada (`feat(scope)!: desc`).
  - Formateo de comandos CLI (`npx wcommits -t feat -s auth ...`).
  - Formateo de comandos Git directos (`git commit -m "..."`).
- **Uso:**
```typescript
import { CommitEngine } from '../domain/commit-engine';

const engine = new CommitEngine({
  type: 'feat',
  scope: 'auth',
  isBreaking: true,
  description: 'add JWT token validation',
  body: 'Extended details...'
});

const result = engine.build();

console.log(result.fullMessage); // feat(auth)!: add JWT token validation\n\nExtended details...
console.log(result.cliCommand);  // npx wcommits -t feat -s auth -b -m "..."
```

---

### 2. `I18nService` (`src/i18n/`)
Servicio de internacionalización tipado estóicamente y desacoplado.

- **`translations.ts`**: Diccionario centralizado de traducción. Exporta el tipo `TranslationKey` derivado estáticamente del esquema en inglés, garantizando autodetección e autocompletado en IDEs.
- **`i18n-service.ts`**: Clase singleton `I18nService` (instancia `i18n`) con:
  - `t(key, params)`: Traducción con interpolación de variables (`{0}`, `{name}`).
  - `setLanguage(lang)` / `getLanguage()`: Manejo y persistencia de idioma.
  - `subscribe(listener)`: Patrón observador Pub/Sub reactivo para actualizar UI.
- **`i18n-client.ts`**: Adaptador del navegador que sincroniza elementos del DOM que utilicen atributos `data-i18n`, `data-i18n-placeholder` o `data-i18n-html`.

---

### 3. `FeedbackService` (`src/services/feedback/`)
Administración unificada de notificaciones visuales (Toasts) y operaciones de portapapeles.

- **`toast-manager.ts`**: Fachada `toastManager` para renderizar toasts accesibles (`role="status"`, `aria-live="polite"`), cola de eliminación con tiempos de espera configurables y animaciones CSS.
- **`clipboard-service.ts`**: Copia segura al portapapeles utilizando `navigator.clipboard.writeText` con fallback transparente a `document.execCommand('copy')` en entornos limitados o HTTPS restrictivos.
- **`clipboard-feedback.ts`**: Función de alto nivel `copyAndNotify(text, toastKeyOrMessage)` que ejecuta la copia y muestra el feedback traducido en una sola invocación.

---

## 🛠️ Buenas Prácticas de Mantenimiento

1. **Añadir nuevos textos traducidos:**
   Agrega la nueva clave en `translations.en` dentro de `src/i18n/translations.ts`. TypeScript exigirá automáticamente añadir la versión en español en `translations.es`.

2. **Extender el motor de commits:**
   Cualquier regla de negocio nueva (ejemplo: validación de longitud máxima de caracteres en el header) debe incluirse en `CommitEngine.ts`. No escribas lógica de cadenas dentro de componentes `.astro`.

3. **Pruebas Unitarias:**
   Los módulos en `src/domain/` y `src/services/` pueden ser testeados de manera unitaria aislada en Node.js o Vitest sin requerir navegadores reales ni utilidades DOM complejas.
