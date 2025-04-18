import {
    Component,
    OnInit,
    Renderer2,
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'app-theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class ThemeSwitcherComponent implements OnInit {
    theme: 'light' | 'dark' = 'light';
    isDropdownOpen = false;

    constructor(
        private renderer: Renderer2
    ) {}

    ngOnInit(): void {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (saved) {
            this.theme = saved;
        } else {
            this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        }
        this.applyTheme();
    }

    toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    setTheme(theme: 'light' | 'dark'): void {
        this.theme = theme;
        localStorage.setItem('theme', theme);
        this.applyTheme();
        this.isDropdownOpen = false;
    }

    private applyTheme(): void {
        this.renderer.setAttribute(
            document.documentElement,
            'data-theme',
            this.theme
        );
    }
}
