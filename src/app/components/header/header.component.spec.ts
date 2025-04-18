import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent, RouterTestingModule] // HeaderComponent – standalone
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should emit sidenavStateChange with true', () => {
        let emittedValue: boolean | undefined;
        component.sidenavStateChange.subscribe((value) => (emittedValue = value));
        component.onSidenavToggle(true);
        expect(emittedValue).toBe(true);
    });

    it('should emit sidenavStateChange with false', () => {
        let emittedValue: boolean | undefined;
        component.sidenavStateChange.subscribe((value) => (emittedValue = value));
        component.onSidenavToggle(false);
        expect(emittedValue).toBe(false);
    });
});
