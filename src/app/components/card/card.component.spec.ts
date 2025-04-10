import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CardComponent} from './card.component';
import {GithubService} from '../../storage/service/github.service';
import {NotificationService} from '../../storage/service/notification.service';
import {of, throwError} from 'rxjs';
import {IGithubUser} from "../../storage/model/igithub-user.model";

const mockGithubUser: IGithubUser = {
    login: 'mockuser',
    id: 123456,
    node_id: 'MDQ6VXNlcjEyMzQ1Ng==',
    avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/mockuser',
    html_url: 'https://github.com/mockuser',
    followers_url: 'https://api.github.com/users/mockuser/followers',
    following_url: 'https://api.github.com/users/mockuser/following{/other_user}',
    gists_url: 'https://api.github.com/users/mockuser/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/mockuser/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/mockuser/subscriptions',
    organizations_url: 'https://api.github.com/users/mockuser/orgs',
    repos_url: 'https://api.github.com/users/mockuser/repos',
    events_url: 'https://api.github.com/users/mockuser/events{/privacy}',
    received_events_url: 'https://api.github.com/users/mockuser/received_events',
    type: 'User',
    site_admin: false,
    name: 'Mock User',
    company: 'Mock Company',
    blog: 'https://mockuser.dev',
    location: 'Mock City',
    email: 'mockuser@example.com',
    hireable: true,
    bio: 'This is a mock user for testing purposes.',
    twitter_username: 'mockuser',
    public_repos: 42,
    public_gists: 7,
    followers: 100,
    following: 50,
    created_at: '2020-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z'
};

describe('CardComponent', () => {
    let component: CardComponent;
    let fixture: ComponentFixture<CardComponent>;
    let githubServiceSpy: jasmine.SpyObj<GithubService>;
    let notificationServiceSpy: jasmine.SpyObj<NotificationService>;

    beforeEach(async () => {
        githubServiceSpy = jasmine.createSpyObj('GithubService', ['fetchGithubUser']);
        notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['show']);

        await TestBed.configureTestingModule({
            imports: [CardComponent],
            providers: [
                { provide: GithubService, useValue: githubServiceSpy },
                { provide: NotificationService, useValue: notificationServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch user data on init', () => {
        githubServiceSpy.fetchGithubUser.and.returnValue(of(mockGithubUser));

        // Устанавливаем username перед инициализацией компонента
        component.username = 'testuser';
        fixture.detectChanges();

        expect(component.user).toEqual(mockGithubUser);
    });

    it('should fetch new user data when username changes', () => {
        githubServiceSpy.fetchGithubUser.and.returnValue(of(mockGithubUser));

        component.username = 'newuser';
        component.ngOnChanges({
            username: {
                currentValue: 'newuser',
                previousValue: 'olduser',
                firstChange: false,
                isFirstChange: () => false
            }
        });
        fixture.detectChanges();

        expect(githubServiceSpy.fetchGithubUser).toHaveBeenCalledWith(jasmine.stringMatching(/newuser/));
        expect(component.user).toEqual(mockGithubUser);
    });

    it('should handle fetch user error', () => {
        const errorResponse = new Error('User not found');
        githubServiceSpy.fetchGithubUser.and.returnValue(throwError(() => errorResponse));

        fixture.detectChanges();

        expect(notificationServiceSpy.show).toHaveBeenCalled();
    });
});
