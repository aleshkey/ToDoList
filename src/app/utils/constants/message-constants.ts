// error-messages.config.ts
export const ERROR_MESSAGES: { [key: number]: { message: string, type: 'error' | 'warning' | 'info' | 'success' } } = {
    404: { message: 'Ресурс не найден', type: 'error' },
    500: { message: 'Внутренняя ошибка сервера', type: 'error' },
    401: { message: 'Нет доступа, необходимо авторизоваться', type: 'info' },
};
