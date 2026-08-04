/**
 * @file translations.ts
 * @description Catálogo centralizado de traducciones y esquemas de tipo para la internacionalización (i18n) de wcommits-docs.
 */

/**
 * Diccionario centralizado de traducciones organizadas por código de idioma.
 */
export const translations = {
  en: {
    // Header
    nav_quickstart: "Quick Start",
    nav_builder: "Live Generator",
    nav_types: "Commit Types",
    nav_reference: "CLI Reference",
    nav_workflow: "Git Workflow",
    search_placeholder: "Search docs...",
    
    // Hero
    hero_badge: "Zero-Dependency CLI Tool",
    hero_title_1: "Conventional Commits.",
    hero_title_2: "Zero Friction.",
    hero_desc: "Generate perfectly formatted, specification-compliant git commit messages. Features automatic clipboard integration, strict type validation, and instant team standards.",
    hero_btn_builder: "Try Live Generator",
    pill_zero_deps: "100% Zero Dependencies",
    pill_auto_clipboard: "Auto Clipboard Sync",
    pill_spec_types: "11 Standard Spec Types",
    term_title: "zsh — wcommits interactive demo",
    term_clip_active: "Clipboard Active",
    term_quick_demo: "Quick Demo:",
    preset_feature: "Feature",
    preset_fix: "Bug Fix",
    preset_breaking: "Breaking",
    term_generated_copied: "Message generated & copied to clipboard:",
    term_run: "Run:",
    term_copy_output: "Copy Commit Output",

    // Quick Start
    qs_eyebrow: "Installation & Usage",
    qs_title: "Get Started in Seconds",
    qs_subtitle: "Zero global setup required. Run on demand with npx or install globally for maximum convenience.",
    tab_npx_badge: "Recommended",
    tab_npx_title: "npx (No Install)",
    tab_global_title: "npm global",
    tab_pnpm_title: "pnpm dlx",
    qs_npx_desc: "Run directly without installing any global packages. Ideal for one-off commits or CI/CD environments.",
    qs_npx_note: "Automatically downloads and executes the latest version of wcommits.",
    qs_global_desc: "Install globally to use wcommits directly from anywhere in your shell.",
    qs_global_then: "Then use it directly anytime:",
    qs_pnpm_desc: "For pnpm users who prefer fast package execution without global pollution.",
    feat_clipboard_title: "Native Clipboard Copy",
    feat_clipboard_desc: "Automatically copies output to clipboard using macOS (pbcopy), Windows (clip), or Linux (xclip/xsel).",
    feat_validation_title: "Strict Spec Validation",
    feat_validation_desc: "Prevents typos and invalid types before they enter your commit log. Instant errors for missing mandatory flags.",
    feat_deps_title: "Zero Runtime Dependencies",
    feat_deps_desc: "Lightweight pure Node.js CLI with zero external package bloat. Blazing fast startup speed and tiny footprint.",

    // Interactive Builder
    builder_eyebrow: "Interactive Studio",
    builder_title: "Live Commit Message Generator",
    builder_subtitle: "Compose, validate, and preview Conventional Commit messages in real-time. Copy the resulting CLI flags or direct git command with one click.",
    builder_controls_title: "Commit Parameters",
    builder_reset: "Reset",
    lbl_type: "Commit Type",
    lbl_select_intent: "Select intent",
    lbl_scope: "Scope",
    lbl_scope_opt: "(optional)",
    lbl_breaking: "Breaking Change",
    lbl_mark_breaking: "Mark Breaking (!)",
    lbl_desc: "Short Description",
    lbl_desc_tip: "Imperative mood, no period",
    lbl_body: "Extended Body",
    out_spec_title: "Formatted Commit Message",
    out_cli_title: "Generated wcommits CLI Command",
    out_git_title: "Direct Git Commit Command",
    btn_copy_formatted: "Copy Formatted Message",
    btn_copy_cli: "Copy CLI Command",
    btn_copy_git: "Copy Git Command",

    // Commit Types
    types_eyebrow: "Commit Types Specification",
    types_title: "The 11 Allowed Commit Types",
    types_subtitle: "wcommits enforces the Conventional Commits v1.0.0 specification with strict runtime type checking.",
    filter_all: "All Types (11)",
    filter_code: "Code & Features",
    filter_tooling: "Tooling & Infra",
    filter_maintenance: "Maintenance",
    example_output_lbl: "Example Output:",
    btn_copy_cmd: "Copy Command",

    // CLI Reference
    ref_eyebrow: "CLI Reference",
    ref_title: "Flags & Options",
    ref_subtitle: "Complete reference for all command-line options supported by wcommits.",
    ref_search_placeholder: "Search flags (e.g. --scope, breaking, -m)...",
    th_flag: "Flag",
    th_short: "Short",
    th_status: "Status",
    th_type: "Type",
    th_desc: "Description",
    th_example: "Example",
    pill_req: "Required",
    pill_opt: "Optional",

    // Workflow
    wf_eyebrow: "Git Integration",
    wf_title: "Seamless Git Workflow Integration",
    wf_subtitle: "How to incorporate wcommits into your daily developer routine and automate commit formatting.",
    wf_step1_title: "Understand What Changed",
    wf_step1_desc: "Inspect your staged changes using git diff --staged (or stage files with git add .) to verify what files and functions were modified.",
    wf_step2_title: "Compose & Validate Message",
    wf_step2_desc: "Run wcommits with your chosen type and description. The CLI validates the type and automatically copies the result to your clipboard.",
    wf_step3_title: "Commit with Verified Format",
    wf_step3_desc: "Paste the copied message into your git commit command or use your shell's clipboard paste shortcut (Cmd+V / Ctrl+V).",
    adv_shell_title: "Shell Helper Function (.zshrc / .bashrc)",
    adv_shell_desc: "Add this helper function to your shell config to generate and commit in a single step:",
    adv_alias_title: "Git Alias Shortcut",
    adv_alias_desc: "Configure a global git alias for instant commit validation:",
    adv_alias_then: "Now you can use git wc directly:",

    // Clipboard & FAQ
    clip_eyebrow: "Cross-Platform & FAQ",
    clip_title: "Clipboard Engine & Troubleshooting",
    clip_subtitle: "Zero dependencies doesn't mean zero compatibility. Automatic system clipboard integration on every OS.",
    faq_section_title: "Frequently Asked Questions & Errors",

    // Clipboard Platforms
    clip_mac_status: "Built-in",
    clip_mac_desc: "Uses native macOS pbcopy utility. Works out of the box with zero configuration.",
    clip_win_status: "Built-in",
    clip_win_desc: "Uses native Windows clip command in Command Prompt and PowerShell.",
    clip_lin_status: "Auto-detect",
    clip_lin_desc: "Detects xclip or xsel. If missing, gracefully falls back to terminal output.",

    // FAQs
    faq_1_q: 'Error: "Falta el tipo"',
    faq_1_a: 'You omitted the required <code>-t</code> or <code>--type</code> flag. Specify one of the 11 allowed types (e.g. <code>npx wcommits -t feat -m "add feature"</code>).',
    faq_2_q: 'Error: "Tipo inválido"',
    faq_2_a: 'The type specified is not recognized. Ensure you are using one of: feat, fix, docs, style, refactor, perf, test, build, ci, chore, or revert.',
    faq_3_q: 'Error: "Falta la descripción"',
    faq_3_a: 'You omitted the required <code>-m</code> or <code>--message</code> flag. Add your commit description.',
    faq_4_q: 'Clipboard non-functional on Linux headless / SSH?',
    faq_4_a: 'Clipboard integration is non-blocking. The generated message always prints to stdout so your workflow never breaks. On desktop Linux, install xclip via <code>sudo apt install xclip</code> or <code>sudo pacman -S xclip</code>.',

    // Search Modal
    modal_placeholder: "Type a command, flag, or topic...",

    // Footer
    footer_sub: "Zero-dependency Conventional Commits CLI generator for high-velocity developer teams.",
    footer_doc_title: "Documentation",
    footer_res_title: "Resources",
    back_to_top: "Back to top",

    // Toasts
    toast_copied_cmd: "Copied CLI command to clipboard!",
    toast_copied_commit: "Copied commit string to clipboard!",
    toast_copied: "Copied to clipboard!",
    toast_reset: "Reset form fields",
    toast_copied_fmt: "Copied formatted commit message!",
    toast_copied_git: "Copied git commit command!",
    toast_copied_example: "Copied example command!",
    toast_copied_snippet: "Copied code snippet!"
  },
  es: {
    // Header
    nav_quickstart: "Inicio Rápido",
    nav_builder: "Generador en Vivo",
    nav_types: "Tipos de Commit",
    nav_reference: "Referencia CLI",
    nav_workflow: "Flujo Git",
    search_placeholder: "Buscar en la docu...",

    // Hero
    hero_badge: "CLI Sin Dependencias",
    hero_title_1: "Conventional Commits.",
    hero_title_2: "Cero Fricción.",
    hero_desc: "Genera mensajes de commit en git perfectamente formateados y conformes a la especificación. Incluye integración automática con el portapapeles y validación estricta.",
    hero_btn_builder: "Probar Generador en Vivo",
    pill_zero_deps: "100% Cero Dependencias",
    pill_auto_clipboard: "Sync de Portapapeles Auto",
    pill_spec_types: "11 Tipos Estándar",
    term_title: "zsh — demo interactiva wcommits",
    term_clip_active: "Portapapeles Activo",
    term_quick_demo: "Demo Rápida:",
    preset_feature: "Característica",
    preset_fix: "Corrección",
    preset_breaking: "Cambio Disruptivo",
    term_generated_copied: "Mensaje generado y copiado al portapapeles:",
    term_run: "Ejecutar:",
    term_copy_output: "Copiar Resultado",

    // Quick Start
    qs_eyebrow: "Instalación y Uso",
    qs_title: "Comienza en Segundos",
    qs_subtitle: "Sin configuración global previa. Ejecuta bajo demanda con npx o instala globalmente para mayor conveniencia.",
    tab_npx_badge: "Recomendado",
    tab_npx_title: "npx (Sin Instalar)",
    tab_global_title: "npm global",
    tab_pnpm_title: "pnpm dlx",
    qs_npx_desc: "Ejecuta directamente sin instalar paquetes globales. Ideal para commits puntuales o entornos de CI/CD.",
    qs_npx_note: "Descarga y ejecuta automáticamente la versión más reciente de wcommits.",
    qs_global_desc: "Instala globalmente para usar wcommits directamente en tu terminal.",
    qs_global_then: "Luego úsalo directamente en cualquier momento:",
    qs_pnpm_desc: "Para usuarios de pnpm que prefieren ejecución rápida sin alterar el entorno global.",
    feat_clipboard_title: "Copia Nativa al Portapapeles",
    feat_clipboard_desc: "Copia automáticamente al portapapeles en macOS (pbcopy), Windows (clip) o Linux (xclip/xsel).",
    feat_validation_title: "Validación Estricta de Spec",
    feat_validation_desc: "Evita errores tipográficos y tipos inválidos antes de que entren al historial. Errores al instante si faltan banderas obligatorias.",
    feat_deps_title: "Cero Dependencias de Runtime",
    feat_deps_desc: "CLI de Node.js puro con cero peso de paquetes externos. Velocidad de inicio ultrarrápida y huella diminuta.",

    // Interactive Builder
    builder_eyebrow: "Estudio Interactivo",
    builder_title: "Generador de Commits en Vivo",
    builder_subtitle: "Compón, valida y previsualiza mensajes de Conventional Commits en tiempo real. Copia el comando CLI o el comando git directo en un clic.",
    builder_controls_title: "Parámetros del Commit",
    builder_reset: "Restablecer",
    lbl_type: "Tipo de Commit",
    lbl_select_intent: "Selecciona intención",
    lbl_scope: "Alcance (Scope)",
    lbl_scope_opt: "(opcional)",
    lbl_breaking: "Cambio Disruptivo",
    lbl_mark_breaking: "Marcar Breaking (!)",
    lbl_desc: "Descripción Corta",
    lbl_desc_tip: "Modo imperativo, sin punto",
    lbl_body: "Cuerpo Extendido",
    out_spec_title: "Mensaje de Commit Formateado",
    out_cli_title: "Comando CLI Generado para wcommits",
    out_git_title: "Comando Git Commit Directo",
    btn_copy_formatted: "Copiar Mensaje Formateado",
    btn_copy_cli: "Copiar Comando CLI",
    btn_copy_git: "Copiar Comando Git",

    // Commit Types
    types_eyebrow: "Especificación de Tipos",
    types_title: "Los 11 Tipos de Commit Permitidos",
    types_subtitle: "wcommits aplica la especificación Conventional Commits v1.0.0 con validación estricta de tipos.",
    filter_all: "Todos los Tipos (11)",
    filter_code: "Código y Features",
    filter_tooling: "Herramientas e Infra",
    filter_maintenance: "Mantenimiento",
    example_output_lbl: "Ejemplo de Salida:",
    btn_copy_cmd: "Copiar Comando",

    // CLI Reference
    ref_eyebrow: "Referencia CLI",
    ref_title: "Banderas y Opciones",
    ref_subtitle: "Referencia completa de todas las opciones de línea de comandos soportadas por wcommits.",
    ref_search_placeholder: "Buscar banderas (ej. --scope, breaking, -m)...",
    th_flag: "Bandera",
    th_short: "Corta",
    th_status: "Estado",
    th_type: "Tipo",
    th_desc: "Descripción",
    th_example: "Ejemplo",
    pill_req: "Requerido",
    pill_opt: "Opcional",

    // Workflow
    wf_eyebrow: "Integración Git",
    wf_title: "Integración Fluida con el Flujo de Git",
    wf_subtitle: "Cómo incorporar wcommits en tu rutina diaria de desarrollo y automatizar el formato de tus commits.",
    wf_step1_title: "Revisa qué cambió",
    wf_step1_desc: "Inspecciona los cambios preparados con git diff --staged (o prepara archivos con git add .) para verificar qué modificaste.",
    wf_step2_title: "Compón y Valida el Mensaje",
    wf_step2_desc: "Ejecuta wcommits con el tipo y descripción. El CLI valida la estructura y copia automáticamente el resultado al portapapeles.",
    wf_step3_title: "Haz Commit con Formato Verificado",
    wf_step3_desc: "Pega el mensaje copiado en tu comando git commit o usa el atajo de pegado de tu terminal (Cmd+V / Ctrl+V).",
    adv_shell_title: "Función de Ayuda para Shell (.zshrc / .bashrc)",
    adv_shell_desc: "Agrega esta función a tu configuración de shell para generar y hacer commit en un solo paso:",
    adv_alias_title: "Atajo de Alias de Git",
    adv_alias_desc: "Configura un alias global de git para validación instantánea:",
    adv_alias_then: "Ahora puedes usar git wc directamente:",

    // Clipboard & FAQ
    clip_eyebrow: "Multiplataforma y FAQ",
    clip_title: "Motor de Portapapeles y Solución de Problemas",
    clip_subtitle: "Cero dependencias no significa cero compatibilidad. Integración automática con el portapapeles en todos los SO.",
    faq_section_title: "Preguntas Frecuentes y Errores",

    // Clipboard Platforms
    clip_mac_status: "Integrado",
    clip_mac_desc: "Usa la utilidad nativa pbcopy de macOS. Funciona sin configuración previa.",
    clip_win_status: "Integrado",
    clip_win_desc: "Usa el comando nativo clip de Windows en Command Prompt y PowerShell.",
    clip_lin_status: "Auto-detectado",
    clip_lin_desc: "Detecta xclip o xsel. Si no están presentes, muestra la salida limpiamente en la consola.",

    // FAQs
    faq_1_q: 'Error: "Falta el tipo"',
    faq_1_a: 'Omitiste la bandera requerida <code>-t</code> o <code>--type</code>. Especifica uno de los 11 tipos permitidos (ej. <code>npx wcommits -t feat -m "agregar función"</code>).',
    faq_2_q: 'Error: "Tipo inválido"',
    faq_2_a: 'El tipo especificado no es reconocido. Asegúrate de usar uno de: feat, fix, docs, style, refactor, perf, test, build, ci, chore o revert.',
    faq_3_q: 'Error: "Falta la descripción"',
    faq_3_a: 'Omitiste la bandera requerida <code>-m</code> o <code>--message</code>. Agrega la descripción de tu commit.',
    faq_4_q: '¿Portapapeles no disponible en Linux headless / SSH?',
    faq_4_a: 'La integración del portapapeles es no-bloqueante. El mensaje generado siempre se imprime en pantalla (stdout) para no interrumpir tu flujo. En Linux de escritorio, instala xclip con <code>sudo apt install xclip</code>.',

    // Search Modal
    modal_placeholder: "Escribe un comando, bandera o tema...",

    // Footer
    footer_sub: "Generador CLI de Conventional Commits sin dependencias para equipos de alto rendimiento.",
    footer_doc_title: "Documentación",
    footer_res_title: "Recursos",
    back_to_top: "Volver arriba",

    // Toasts
    toast_copied_cmd: "¡Comando CLI copiado al portapapeles!",
    toast_copied_commit: "¡Mensaje de commit copiado al portapapeles!",
    toast_copied: "¡Copiado al portapapeles!",
    toast_reset: "Campos restablecidos",
    toast_copied_fmt: "¡Mensaje formateado copiado!",
    toast_copied_git: "¡Comando git commit copiado!",
    toast_copied_example: "¡Comando de ejemplo copiado!",
    toast_copied_snippet: "¡Fragmento de código copiado!"
  }
};

/**
 * Idiomas soportados por la aplicación.
 */
export type Language = 'en' | 'es';

/**
 * Esquema estricto que define la estructura completa de traducciones.
 * Derivado dinámicamente del idioma base (inglés).
 */
export type TranslationsSchema = typeof translations.en;

/**
 * Tipo de Unión fuertemente tipado que representa cualquier clave de traducción válida.
 */
export type TranslationKey = keyof TranslationsSchema;

/**
 * Type Guard que verifica en tiempo de ejecución si una cadena dada es una `TranslationKey` válida.
 *
 * @param key - Cadena de texto a validar.
 * @returns Retorna `true` si la cadena pertenece al esquema de `TranslationKey`, de lo contrario `false`.
 */
export function isTranslationKey(key: string): key is TranslationKey {
  return key in translations.en;
}

/**
 * Obtiene el idioma preferido del usuario basándose en los parámetros URL,
 * almacenamiento local (`localStorage`) o la configuración del navegador.
 *
 * @returns El idioma detectado ('en' | 'es'). Por defecto es 'es'.
 */
export function getPreferredLanguage(): Language {
  if (typeof window === 'undefined') return 'es';
  
  // 1. Check URL param ?lang=es or ?lang=en
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang')?.toLowerCase();
  if (langParam === 'es' || langParam === 'en') return langParam;

  // 2. Check localStorage
  const saved = localStorage.getItem('wcommits_lang');
  if (saved === 'es' || saved === 'en') return saved;

  // 3. Infer from browser navigator.language
  const browserLang = (navigator.language || (navigator as { userLanguage?: string }).userLanguage || '').toLowerCase();
  if (browserLang.startsWith('es')) return 'es';

  return 'en';
}

/**
 * Guarda el idioma preferido en `localStorage`, actualiza el atributo `lang` del elemento HTML
 * y dispara un evento personalizado `languageChanged` para notificar a la interfaz.
 *
 * @param lang - Idioma a establecer ('en' | 'es').
 */
export function setPreferredLanguage(lang: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wcommits_lang', lang);
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }
}
