// error-handler.ts (можно вынести в отдельный файл или внутри NotificationService)
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MESSAGES } from './constants/message_constants';

export function getErrorNotification(error: HttpErrorResponse): { message: string, type: 'error' | 'warning' | 'info' | 'success' } {
    if (ERROR_MESSAGES[error.status]) {
        return ERROR_MESSAGES[error.status];
    }
    return { message: 'Произошла ошибка: ' + error.message, type: 'error' };
}
