import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { By } from '@angular/platform-browser';
import { signal, WritableSignal } from '@angular/core';

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotificationComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;

        // Переопределяем входные сигналы, создавая writable сигналы с начальным значением
        (component as any).message = signal('');
        (component as any).type = signal<'success' | 'error' | 'info' | 'warning'>('info');
    });

    it('should create the notification component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the provided message', () => {
        const testMessage = 'Test notification message';
        // Приводим сигнал к WritableSignal и обновляем его значение
        ((component as any).message as WritableSignal<string>).set(testMessage);
        fixture.detectChanges();

        const messageElement = fixture.debugElement.query(By.css('.message')).nativeElement;
        expect(messageElement.textContent).toContain(testMessage);
    });

    it('should emit dismissed event when close button is clicked', () => {
        spyOn(component.dismissed, 'emit');
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('.close-btn')).nativeElement;
        button.click();
        expect(component.dismissed.emit).toHaveBeenCalled();
    });
});
