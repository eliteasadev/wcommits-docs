/**
 * @file i18n-client.ts
 * @description Módulo ejecutable del cliente para la aplicación automática de traducciones en el DOM HTML.
 */

import { i18n } from './i18n-service';
import type { Language } from './translations';

/**
 * Aplica de forma síncrona y segura (sin cast `any`) las traducciones a todos los elementos del DOM
 * marcados con los atributos `data-i18n`, `data-i18n-placeholder` o `data-i18n-html`.
 * 
 * @param lang - Idioma opcional a aplicar. Si no se especifica, utiliza el idioma activo de `I18nService`.
 */
export function applyTranslations(lang?: Language): void {
  if (lang) {
    i18n.setLanguage(lang);
  }

  const currentLang = i18n.getLanguage();

  // Actualizar contenido textual en elementos con data-i18n
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (key && i18n.isValidKey(key)) {
      const translation = i18n.t(key);
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        if (element.placeholder) {
          element.placeholder = translation;
        }
      } else {
        element.textContent = translation;
      }
    }
  });

  // Actualizar placeholders en elementos form con data-i18n-placeholder
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (key && i18n.isValidKey(key)) {
      element.placeholder = i18n.t(key);
    }
  });

  // Actualizar contenido con formato HTML interno con data-i18n-html
  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach(element => {
    const key = element.getAttribute('data-i18n-html');
    if (key && i18n.isValidKey(key)) {
      element.innerHTML = i18n.t(key);
    }
  });

  // Sincronizar el atributo `lang` del elemento <html> principal
  document.documentElement.lang = currentLang;

  // Actualizar la etiqueta del código de idioma en la interfaz si está presente
  const langCodeSpan = document.getElementById('current-lang-code');
  if (langCodeSpan) {
    langCodeSpan.textContent = currentLang.toUpperCase();
  }
}

// Inicialización de escuchadores de eventos en el entorno del navegador
if (typeof window !== 'undefined') {
  // Aplicar traducciones tras la carga inicial del DOM
  window.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
  });

  // Suscribirse de forma reactiva al servicio i18n para re-renderizar cambios de idioma
  i18n.subscribe(() => {
    applyTranslations();
  });
}
