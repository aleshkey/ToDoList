import { Component, OnInit } from '@angular/core';
import {NotificationComponent} from "../notification/notification.component";

import {NotificationService} from "../../storage/service/notification.service";
import {INotification} from "../../storage/model/inotification.model";

@Component({
    selector: 'app-notifications-container',
    templateUrl: './notification-container.component.html',
    imports: [
    NotificationComponent
],
    styleUrls: ['notification-container.component.css']
})
export class NotificationsContainerComponent implements OnInit {
    notifications: INotification[] = [];

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {
        this.notificationService.notifications$.subscribe(
            notes => this.notifications = notes
        );
    }

    remove(note: INotification): void {
        this.notificationService.remove(note);
    }
}
