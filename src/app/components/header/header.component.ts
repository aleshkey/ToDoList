import {Component, output} from '@angular/core';
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
    sidenavStateChange = output<boolean>();

    onSidenavToggle(isOpen: boolean): void {
        this.sidenavStateChange.emit(isOpen);
    }
}
