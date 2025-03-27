import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsContainerComponent } from './components/notification-container/notification-container.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, RouterOutlet, HeaderComponent, NotificationsContainerComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ToDoList';
    sidenavOpen: boolean = false;

    constructor(private cdr: ChangeDetectorRef) {}

    onSidenavStateChange(isOpen: boolean) {
        this.sidenavOpen = isOpen;
        this.cdr.detectChanges();
    }
}
