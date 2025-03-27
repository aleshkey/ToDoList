import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeSwitcherComponent } from './theme-switcher.component';
import { Renderer2, ChangeDetectorRef } from '@angular/core';

describe('ThemeSwitcherComponent', () => {
    let component: ThemeSwitcherComponent;
    let fixture: ComponentFixture<ThemeSwitcherComponent>;
    let rendererSpy: jasmine.SpyObj<Renderer2>;
    let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;

    const originalMatchMedia = window.matchMedia;

    beforeEach(async () => {
        rendererSpy = jasmine.createSpyObj('Renderer2', ['setAttribute']);
        cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

        window.matchMedia = jasmine.createSpy('matchMedia').and.callFake((query: string) => {
            return { matches: false } as MediaQueryList;
        });

        localStorage.removeItem('theme');

        await TestBed.configureTestingModule({
            imports: [ThemeSwitcherComponent],
            providers: [
                { provide: Renderer2, useValue: rendererSpy },
                { provide: ChangeDetectorRef, useValue: cdrSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ThemeSwitcherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should use saved theme from localStorage if exists', () => {
        localStorage.setItem('theme', 'dark');

        fixture = TestBed.createComponent(ThemeSwitcherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.theme).toBe('dark');
    });

    it('should default to theme based on window.matchMedia if no saved theme', () => {
        // Настраиваем matchMedia так, чтобы возвращалось matches: true (предпочтение темной темы)
        (window.matchMedia as jasmine.Spy).and.returnValue({ matches: true } as MediaQueryList);

        fixture = TestBed.createComponent(ThemeSwitcherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.theme).toBe('dark');
    });

    it('toggleDropdown should toggle isDropdownOpen', () => {
        const initial = component.isDropdownOpen;
        component.toggleDropdown();
        expect(component.isDropdownOpen).toBe(!initial);

        component.toggleDropdown();
        expect(component.isDropdownOpen).toBe(initial);
    });

    it('setTheme should update theme, save to localStorage, apply theme and close dropdown', () => {
        spyOn(component, 'applyTheme').and.callThrough();
        component.isDropdownOpen = true;

        component.setTheme('dark');

        expect(component.theme).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
        expect(component.applyTheme).toHaveBeenCalled();
        expect(component.isDropdownOpen).toBeFalse();
    });
});
