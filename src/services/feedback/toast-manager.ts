/**
 * @file toast-manager.ts
 * @description Administrador unificado de notificaciones toast con accesibilidad (ARIA live region),
 * cola de notificaciones, auto-dismiss configurable y animaciones puras en CSS/JS.
 */

/**
 * Tipos de notificación toast soportados para estilizado y semántica visual.
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Opciones de configuración para una notificación toast.
 */
export interface ToastOptions {
  /**
   * Duración en milisegundos antes de ocultar automáticamente el toast.
   * Si se establece en 0 o un valor negativo, el toast no se oculta automáticamente.
   * @default 3000
   */
  duration?: number;

  /**
   * Tipo de toast para aplicar variantes de diseño e íconos accesibles.
   * @default 'success'
   */
  type?: ToastType;

  /**
   * Marcado SVG o texto HTML opcional para personalizar el ícono del toast.
   */
  icon?: string;
}

/**
 * Estructura interna de un toast activo en el administrador.
 */
export interface ToastItem {
  /** Identificador único del toast */
  id: string;
  /** Elemento DOM renderizado */
  element: HTMLElement;
  /** ID del temporizador para auto-dismiss */
  timerId?: number;
}

/**
 * Clase singleton que gestiona el ciclo de vida, la cola y la accesibilidad de las notificaciones toast.
 */
export class ToastManager {
  private static instance: ToastManager | null = null;
  private containerId = 'toast-container';
  private container: HTMLElement | null = null;
  private activeToasts: Map<string, ToastItem> = new Map();
  private toastCounter = 0;

  /**
   * Obtiene la instancia singleton de ToastManager.
   *
   * @returns La instancia única de ToastManager.
   */
  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  /**
   * Obtiene o crea el contenedor de toasts en el DOM con atributos ARIA accesibles (role="status", aria-live="polite").
   *
   * @returns El elemento HTML del contenedor de toasts.
   */
  public getContainer(): HTMLElement {
    if (typeof document === 'undefined') {
      throw new Error('ToastManager solo puede ejecutarse en el entorno del navegador.');
    }

    let container = document.getElementById(this.containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = this.containerId;
      // Atributos de Accesibilidad (ARIA Live Region)
      container.setAttribute('role', 'status');
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      document.body.appendChild(container);
    } else {
      // Asegurar que el contenedor existente tenga los atributos ARIA
      if (!container.getAttribute('role')) {
        container.setAttribute('role', 'status');
      }
      if (!container.getAttribute('aria-live')) {
        container.setAttribute('aria-live', 'polite');
      }
      if (!container.getAttribute('aria-atomic')) {
        container.setAttribute('aria-atomic', 'true');
      }
    }
    this.container = container;
    return container;
  }

  /**
   * Muestra un nuevo toast de notificación con el mensaje y las opciones indicadas.
   *
   * @param message - Mensaje de texto a mostrar en el toast.
   * @param options - Opciones de configuración opcionales (duración, tipo, ícono).
   * @returns Identificador único del toast generado.
   */
  public show(message: string, options: ToastOptions = {}): string {
    if (typeof document === 'undefined') return '';

    const { duration = 3000, type = 'success', icon } = options;
    const container = this.getContainer();
    const id = `toast-${++this.toastCounter}-${Date.now()}`;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.dataset.toastId = id;

    // Aplicar estilos dinámicos de tipo según la variante
    this.applyTypeStyles(toast, type);

    const iconMarkup = icon || this.getDefaultIcon(type);
    toast.innerHTML = `
      <div class="toast-icon" style="display: flex; align-items: center; flex-shrink: 0;">${iconMarkup}</div>
      <span class="toast-message">${this.escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    const item: ToastItem = {
      id,
      element: toast,
    };

    if (duration > 0) {
      item.timerId = window.setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    this.activeToasts.set(id, item);
    return id;
  }

  /**
   * Descarta y elimina una notificación toast por su ID aplicando una animación fluida de salida.
   *
   * @param id - Identificador del toast a descartar.
   */
  public dismiss(id: string): void {
    const item = this.activeToasts.get(id);
    if (!item) return;

    if (item.timerId) {
      clearTimeout(item.timerId);
    }

    const toast = item.element;
    // Animación de salida pura mediante transiciones CSS
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
      this.activeToasts.delete(id);
    }, 300);
  }

  /**
   * Limpia todos los toasts activos en la pantalla inmediatamente.
   */
  public clearAll(): void {
    this.activeToasts.forEach((_, id) => {
      this.dismiss(id);
    });
  }

  /**
   * Genera el SVG correspondiente al ícono predeterminado según el tipo de toast.
   *
   * @param type - Tipo de notificación.
   * @returns Cadena SVG con el marcado del ícono.
   */
  private getDefaultIcon(type: ToastType): string {
    switch (type) {
      case 'error':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fb7185" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
      case 'warning':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
      case 'info':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
      case 'success':
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    }
  }

  /**
   * Aplica estilos específicos de borde y sombra resplandeciente según el tipo de toast.
   *
   * @param element - Elemento HTML del toast.
   * @param type - Tipo de notificación.
   */
  private applyTypeStyles(element: HTMLElement, type: ToastType): void {
    switch (type) {
      case 'error':
        element.style.borderColor = 'var(--accent-rose, #fb7185)';
        element.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(251, 113, 133, 0.25)';
        break;
      case 'warning':
        element.style.borderColor = 'var(--accent-amber, #fbbf24)';
        element.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(251, 191, 36, 0.25)';
        break;
      case 'info':
        element.style.borderColor = 'var(--accent-blue, #38bdf8)';
        element.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.25)';
        break;
      case 'success':
      default:
        element.style.borderColor = 'var(--accent-cyan, #00f2fe)';
        element.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 242, 254, 0.25)';
        break;
    }
  }

  /**
   * Sanitiza texto evitando inyecciones de HTML.
   *
   * @param str - Cadena de texto a sanitizar.
   * @returns Cadena escapada accesible y segura.
   */
  private escapeHtml(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

/** Instancia singleton predeterminada exportada del ToastManager */
export const toastManager = ToastManager.getInstance();
