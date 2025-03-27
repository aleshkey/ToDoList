import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SidenavComponent} from "../sidenav/sidenav.component";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    imports: [
        RouterLink,
        RouterLinkActive,
        SidenavComponent
    ]
})
export class HeaderComponent {
    @Output() sidenavStateChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    onSidenavToggle(isOpen: boolean): void {
        console.log("HeaderComponent - Sidenav state changed:", isOpen);
        this.sidenavStateChange.emit(isOpen);
    }
}
