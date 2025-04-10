import {Component, input, output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    imports: [
        NgClass
    ],
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
    message = input<string>('');
    type = input<'success' | 'error' | 'info' | 'warning'>('info');
    dismissed = output<void>();

    close(): void {
        this.dismissed.emit();
    }
}
