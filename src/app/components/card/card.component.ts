import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GithubService } from '../../storage/service/github.service';
import { GITHUB_URL } from '../../utils/constants/url_constants';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { GithubUser } from '../../storage/model/github-user.model';
import { NotificationService } from '../../storage/service/notification.service';
import { getErrorNotification } from '../../utils/message.util';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    imports: [
        NgOptimizedImage,
        NgIf
    ]
})
export class CardComponent implements OnInit, OnChanges {
    @Input() username: string = '';
    user?: GithubUser;

    constructor(
        private githubService: GithubService,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.fetchUser();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['username'] && !changes['username'].isFirstChange()) {
            this.fetchUser();
        }
    }

    private fetchUser(): void {
        this.githubService.fetchGithubUser(`${GITHUB_URL}/${this.username}`)
            .subscribe(
                (data: GithubUser) => {
                    this.user = data;
                },
                (error) => {
                    const notification = getErrorNotification(error);
                    this.notificationService.show(notification.message, notification.type);
                }
            );
    }
}
