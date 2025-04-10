import {Component, output} from '@angular/core';
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

    sidenavToggle = output<boolean>();

    toggleSidenav(): void {
        this.isSidenavOpen = !this.isSidenavOpen;
        this.sidenavToggle.emit(this.isSidenavOpen);
    }
}
