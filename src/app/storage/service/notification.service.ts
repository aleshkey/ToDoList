import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Notification} from "../model/notification.model";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationsSubject = new BehaviorSubject<Notification[]>([]);
    notifications$ = this.notificationsSubject.asObservable();

    show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) {
        const current = this.notificationsSubject.getValue();
        const notification: Notification = {message, type};
        this.notificationsSubject.next([...current, notification]);
        setTimeout(() => this.remove(notification), duration);
    }

    remove(notification: Notification) {
        const current = this.notificationsSubject.getValue();
        console.log(this.notifications$);
        this.notificationsSubject.next(current.filter(n => n !== notification));
    }
}
