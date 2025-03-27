import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-sidenav',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
    isSidenavOpen: boolean = false;

    @Output() sidenavToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    toggleSidenav(): void {
        console.info("TestComponent - Sidenav state changed:", this.isSidenavOpen);
        this.isSidenavOpen = !this.isSidenavOpen;
        this.sidenavToggle.emit(this.isSidenavOpen);
    }
}
