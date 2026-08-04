/**
 * @file i18n-service.ts
 * @description Facade Singleton para la gestión centralizada de internacionalización (i18n).
 */

import {
  translations,
  getPreferredLanguage,
  setPreferredLanguage,
  isTranslationKey,
  type Language,
  type TranslationKey,
  type TranslationsSchema
} from './translations';

/**
 * Firma de función para los oyentes de cambio de idioma.
 * 
 * @param lang - El nuevo idioma aplicado ('en' | 'es').
 */
export type LanguageChangeListener = (lang: Language) => void;

/**
 * Servicio Singleton `I18nService`.
 * Proporciona un punto único de acceso (Facade) para la consulta de traducciones fuertemente tipadas,
 * la conmutación de idiomas y la suscripción reactiva a cambios de estado de idioma en la interfaz.
 */
export class I18nService {
  private static instance: I18nService | null = null;
  private currentLang: Language;
  private listeners: Set<LanguageChangeListener> = new Set();

  /**
   * Constructor privado para prevenir instanciación externa arbitraria.
   * Inicializa el idioma según las preferencias guardadas o detectadas del entorno.
   */
  private constructor() {
    this.currentLang = getPreferredLanguage();
    if (typeof window !== 'undefined') {
      window.addEventListener('languageChanged', (event: Event) => {
        const customEvent = event as CustomEvent<{ lang: Language }>;
        if (customEvent.detail?.lang && customEvent.detail.lang !== this.currentLang) {
          this.currentLang = customEvent.detail.lang;
          this.notifyListeners();
        }
      });
    }
  }

  /**
   * Retorna la instancia única (Singleton) de `I18nService`.
   * 
   * @returns La instancia activa del servicio de internacionalización.
   */
  public static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  /**
   * Obtiene el idioma actualmente activo en la aplicación.
   * 
   * @returns El código del idioma activo ('en' | 'es').
   */
  public getLanguage(): Language {
    return this.currentLang;
  }

  /**
   * Cambia el idioma activo de la aplicación, persiste la preferencia del usuario,
   * actualiza el atributo de idioma en el DOM HTML y notifica a todos los suscriptores.
   * 
   * @param lang - El nuevo idioma a establecer ('en' | 'es').
   */
  public setLanguage(lang: Language): void {
    if (this.currentLang === lang) return;
    this.currentLang = lang;
    setPreferredLanguage(lang);
    this.notifyListeners();
  }

  /**
   * Recupera el texto traducido asociado a una clave fuertemente tipada (`TranslationKey`).
   * Soporta sustitución dinámica de parámetros de la forma `{parametro}`.
   * 
   * @param key - Clave de traducción existente en el esquema (`TranslationKey`).
   * @param params - Objeto opcional de parámetros clave-valor para reemplazo en el mensaje.
   * @returns El texto traducido e interpolado. Si la clave no existe en el idioma activo, recurre al inglés o a la clave.
   */
  public t(key: TranslationKey, params?: Record<string, string>): string {
    const dict = translations[this.currentLang] || translations.en;
    let text = dict[key] ?? translations.en[key] ?? key;

    if (params) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
      });
    }

    return text;
  }

  /**
   * Verifica si una cadena de texto arbitraria corresponde a una `TranslationKey` válida dentro del esquema.
   * Actúa como Type Guard para TypeScript.
   * 
   * @param key - La cadena a verificar.
   * @returns `true` si es una clave de traducción válida, `false` en caso contrario.
   */
  public isValidKey(key: string): key is TranslationKey {
    return isTranslationKey(key);
  }

  /**
   * Suscribe un listener de cambio de idioma.
   * 
   * @param listener - Callback a ejecutar cuando el idioma cambie.
   * @returns Función de des-suscripción para remover el listener.
   */
  public subscribe(listener: LanguageChangeListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notifica de forma segura a todos los suscriptores registrados sobre el cambio de idioma.
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.currentLang);
      } catch (err) {
        console.error('Error al ejecutar listener de i18n:', err);
      }
    });
  }
}

/**
 * Instancia singleton exportada por conveniencia para su uso directo en componentes y módulos.
 */
export const i18n = I18nService.getInstance();
