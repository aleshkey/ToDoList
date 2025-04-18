import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { Renderer2 } from '@angular/core';

describe('ThemeSwitcherComponent', () => {
    let component: ThemeSwitcherComponent;
    let fixture: ComponentFixture<ThemeSwitcherComponent>;
    let renderer2Spy: jasmine.SpyObj<Renderer2>;

    beforeEach(() => {
        renderer2Spy = jasmine.createSpyObj('Renderer2', ['setAttribute']);

        TestBed.configureTestingModule({
            imports: [ThemeSwitcherComponent],
            providers: [
                { provide: Renderer2, useValue: renderer2Spy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ThemeSwitcherComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize theme from localStorage if present', () => {
        localStorage.setItem('theme', 'dark');
        component.ngOnInit();
        expect(component.theme).toBe('dark');
    });

    it('should use prefers-color-scheme if theme not in localStorage', () => {
        spyOn(window, 'matchMedia').and.returnValue({
            matches: true,
            media: '(prefers-color-scheme: dark)',
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => true
        } as MediaQueryList);

        component.ngOnInit();
        expect(component.theme).toBe('dark');
    });

    it('should toggle dropdown visibility', () => {
        expect(component.isDropdownOpen).toBeFalse();
        component.toggleDropdown();
        expect(component.isDropdownOpen).toBeTrue();
        component.toggleDropdown();
        expect(component.isDropdownOpen).toBeFalse();
    });

    it('should set and apply the selected theme', () => {
        component.setTheme('dark');
        expect(component.theme).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
        expect(component.isDropdownOpen).toBeFalse();
    });
});
