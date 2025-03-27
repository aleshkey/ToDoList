import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-notification',
    template: `
        <div class="notification" [ngClass]="type">
            <span class="message">{{ message }}</span>
            <button class="close-btn" (click)="close()">×</button>
        </div>
    `,
    imports: [
        NgClass
    ],
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
    @Input() message: string = '';
    @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
    @Output() dismissed = new EventEmitter<void>();

    close() {
        this.dismissed.emit();
    }
}
