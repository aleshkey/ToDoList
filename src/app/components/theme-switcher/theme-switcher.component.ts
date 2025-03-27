import { Component, Renderer2, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-theme-switcher',
    templateUrl: './theme-switcher.component.html',
    styleUrls: ['./theme-switcher.component.css'],
    imports: [NgIf]
})
export class ThemeSwitcherComponent implements OnInit {
    theme: 'light' | 'dark' = 'light';
    isDropdownOpen = false;

    constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (savedTheme) {
            this.theme = savedTheme;
        } else {
            this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
    }

    ngOnInit(): void {
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

    applyTheme(): void {
        console.log(`Applying theme: ${this.theme}`);
        this.renderer.setAttribute(document.documentElement, 'data-theme', this.theme);
        this.cdr.detectChanges();
        console.log('Data-theme attribute set:', document.documentElement.getAttribute('data-theme'));
    }
}
