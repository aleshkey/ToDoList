import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from '../../storage/service/notification.service';
import { Notification } from '../../storage/model/notification.model';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NotificationComponent } from '../notification/notification.component';
import {NotificationsContainerComponent} from "./notification-container.component";

describe('NotificationsContainerComponent', () => {
    let component: NotificationsContainerComponent;
    let fixture: ComponentFixture<NotificationsContainerComponent>;
    let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
    let notificationsSubject: BehaviorSubject<Notification[]>;

    const mockNotifications: Notification[] = [
        { message: 'Test message 1', type: 'info' },
        { message: 'Test message 2', type: 'success' }
    ];

    beforeEach(async () => {
        notificationsSubject = new BehaviorSubject<Notification[]>(mockNotifications);
        notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['remove'], {
            notifications$: notificationsSubject.asObservable()
        });

        await TestBed.configureTestingModule({
            imports: [NotificationsContainerComponent],
            providers: [
                { provide: NotificationService, useValue: notificationServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NotificationsContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display notifications from the service', () => {
        expect(component.notifications.length).toBe(2);

        const notificationElements = fixture.debugElement.queryAll(By.css('app-notification'));
        expect(notificationElements.length).toBe(2);

        const firstMessage = notificationElements[0].nativeElement.textContent;
        expect(firstMessage).toContain('Test message 1');
    });

    it('should call remove on notificationService when a notification is dismissed', () => {
        const notificationDebugElements = fixture.debugElement.queryAll(By.directive(NotificationComponent));

        notificationDebugElements[0].componentInstance.dismissed.emit();

        expect(notificationServiceSpy.remove).toHaveBeenCalledWith(mockNotifications[0]);
    });
});
