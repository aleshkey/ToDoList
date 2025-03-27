import { Component, OnInit } from '@angular/core';
import {NotificationComponent} from "../notification/notification.component";
import {NgForOf} from "@angular/common";
import {NotificationService} from "../../storage/service/notification.service";
import {Notification} from "../../storage/model/notification.model";

@Component({
    selector: 'app-notifications-container',
    template: `
        <div class="notifications-container">
            <app-notification
                *ngFor="let note of notifications"
                [message]="note.message"
                [type]="note.type"
                (dismissed)="remove(note)">
            </app-notification>
        </div>
    `,
    imports: [
        NotificationComponent,
        NgForOf
    ],
    styleUrls: ['notification-container.component.css']
})
export class NotificationsContainerComponent implements OnInit {
    notifications: Notification[] = [];

    constructor(private notificationService: NotificationService) {}

    ngOnInit() {
        this.notificationService.notifications$.subscribe(
            notes => this.notifications = notes
        );
    }

    remove(note: Notification) {
        this.notificationService.remove(note);
    }
}
