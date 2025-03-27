import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import { By } from '@angular/platform-browser';

describe('NotificationComponent', () => {
    let component: NotificationComponent;
    let fixture: ComponentFixture<NotificationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotificationComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationComponent);
        component = fixture.componentInstance;
    });

    it('should create the notification component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the provided message', () => {
        const testMessage = 'Test notification message';
        component.message = testMessage;
        fixture.detectChanges();

        const messageElement = fixture.debugElement.query(By.css('.message')).nativeElement;
        expect(messageElement.textContent).toContain(testMessage);
    });

    it('should apply the correct type class', () => {
        const testType: 'success' | 'error' | 'info' | 'warning' = 'error';
        component.type = testType;
        fixture.detectChanges();

        const notificationElement = fixture.debugElement.query(By.css('.notification')).nativeElement;
        expect(notificationElement.classList).toContain(testType);
    });

    it('should emit dismissed event when close button is clicked', () => {
        spyOn(component.dismissed, 'emit');
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('.close-btn')).nativeElement;
        button.click();
        expect(component.dismissed.emit).toHaveBeenCalled();
    });
});
