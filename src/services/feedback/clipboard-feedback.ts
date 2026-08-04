/**
 * @file clipboard-feedback.ts
 * @description Fachada unificada que combina la copia al portapapeles con la notificación toast de retroalimentación.
 */

import { clipboardService } from './clipboard-service';
import { toastManager } from './toast-manager';

/**
 * Fachada para ejecutar la copia de texto al portapapeles y notificar el resultado al usuario mediante toasts.
 */
export class ClipboardFeedback {
  /**
   * Copia el texto indicado al portapapeles y muestra una notificación toast según el resultado obtenido.
   *
   * @param text - El texto que se copiará al portapapeles.
   * @param successToastMessage - Mensaje de confirmación toast si la copia es exitosa.
   * @param errorToastMessage - Mensaje opcional de error toast si la copia falla.
   * @returns Promesa que resuelve a `true` si la copia se completó correctamente, `false` en caso contrario.
   */
  public static async copyAndNotify(
    text: string,
    successToastMessage: string,
    errorToastMessage?: string
  ): Promise<boolean> {
    const success = await clipboardService.copy(text);

    if (success) {
      toastManager.show(successToastMessage, { type: 'success' });
    } else {
      const fallbackMsg = errorToastMessage || 'Error al copiar al portapapeles';
      toastManager.show(fallbackMsg, { type: 'error' });
    }

    return success;
  }
}

/**
 * Copia el texto proporcionado al portapapeles y despliega una notificación toast de retroalimentación en una sola llamada limpia.
 *
 * @param text - Texto que se copiará en el portapapeles.
 * @param successToastMessage - Mensaje a mostrar cuando la copia sea exitosa.
 * @param errorToastMessage - Mensaje opcional a mostrar si la copia falla.
 * @returns Promesa que resuelve indicando si la operación de copia tuvo éxito.
 */
export async function copyAndNotify(
  text: string,
  successToastMessage: string,
  errorToastMessage?: string
): Promise<boolean> {
  return ClipboardFeedback.copyAndNotify(text, successToastMessage, errorToastMessage);
}
