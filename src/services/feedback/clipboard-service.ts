/**
 * @file clipboard-service.ts
 * @description Servicio unificado para la copia de texto al portapapeles con fallback robusto
 * utilizando execCommand y elementos textarea temporales cuando navigator.clipboard no está disponible.
 */

/**
 * Servicio encargado de gestionar operaciones con el portapapeles del navegador.
 */
export class ClipboardService {
  private static instance: ClipboardService | null = null;

  /**
   * Obtiene la instancia singleton de ClipboardService.
   *
   * @returns La instancia única de ClipboardService.
   */
  public static getInstance(): ClipboardService {
    if (!ClipboardService.instance) {
      ClipboardService.instance = new ClipboardService();
    }
    return ClipboardService.instance;
  }

  /**
   * Copia el texto especificado al portapapeles del usuario.
   * Utiliza preferentemente la API moderna de Clipboard (`navigator.clipboard.writeText`)
   * y recurre a un fallback robusto con `document.execCommand('copy')` si la API nativa no está disponible o falla.
   *
   * @param text - Texto a copiar en el portapapeles.
   * @returns Promesa que resuelve a `true` si la copia fue exitosa, o `false` en caso de falla.
   */
  public async copy(text: string): Promise<boolean> {
    if (typeof window === 'undefined') {
      return false;
    }

    // Intentar API moderna de Clipboard primero
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('[ClipboardService] navigator.clipboard.writeText falló, ejecutando fallback:', err);
      }
    }

    // Fallback mediante execCommand con textarea temporal
    return this.fallbackCopy(text);
  }

  /**
   * Fallback robusto para copiar texto al portapapeles utilizando un elemento <textarea> temporal fuera de pantalla.
   *
   * @param text - Texto a copiar.
   * @returns `true` si `document.execCommand('copy')` se ejecutó con éxito; `false` en caso contrario.
   */
  private fallbackCopy(text: string): boolean {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;

      // Estilos para posicionar fuera del viewport sin afectar el layout ni el scroll
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';
      textarea.style.pointerEvents = 'none';
      textarea.setAttribute('readonly', '');

      document.body.appendChild(textarea);

      // Selección y foco
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);

      return successful;
    } catch (err) {
      console.error('[ClipboardService] Fallback de copia al portapapeles falló:', err);
      return false;
    }
  }
}

/** Instancia singleton predeterminada de ClipboardService */
export const clipboardService = ClipboardService.getInstance();

/**
 * Función utilitaria para copiar texto al portapapeles directamente.
 *
 * @param text - Texto a copiar al portapapeles.
 * @returns Promesa que resuelve a `true` si se copió con éxito, `false` de lo contrario.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  return clipboardService.copy(text);
}
