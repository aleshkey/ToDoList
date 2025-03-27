import { Component } from '@angular/core';
import {SearchComponent} from "../../components/search/search.component";
import {CardComponent} from "../../components/card/card.component";
import {HttpClientModule} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {ThemeSwitcherComponent} from "../../components/theme-switcher/theme-switcher.component";

@Component({
  selector: 'app-settings',
    imports: [
        SearchComponent,
        CardComponent,
        NgIf,
        ThemeSwitcherComponent
    ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
    selectedUsername: string | null = null;

    onSearch(username: string) {
        this.selectedUsername = username;
    }
}
