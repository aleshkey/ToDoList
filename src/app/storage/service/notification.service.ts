import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {INotification} from "../model/inotification.model";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationsSubject = new BehaviorSubject<INotification[]>([]);
    notifications$ = this.notificationsSubject.asObservable();

    show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000): void {
        const current = this.notificationsSubject.getValue();
        const notification: INotification = {message, type};
        this.notificationsSubject.next([...current, notification]);
        setTimeout(() => this.remove(notification), duration);
    }

    remove(notification: INotification): void {
        const current = this.notificationsSubject.getValue();
        this.notificationsSubject.next(current.filter(n => n !== notification));
    }
}
