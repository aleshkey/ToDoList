import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GithubService } from '../../storage/service/github.service';
import { NgOptimizedImage } from '@angular/common';
import { NotificationService } from '../../storage/service/notification.service';
import { getErrorNotification } from '../../utils/message.util';
import {IGithubUser} from "../../storage/model/igithub-user.model";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
    imports: [
    NgOptimizedImage
]
})
export class CardComponent implements OnInit, OnChanges {
    @Input() username: string = '';
    user?: IGithubUser;

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
        this.githubService
            .fetchGithubUser(this.username)
            .subscribe({
                next: (data: IGithubUser) => {
                    this.user = data;
                },
                error: (error) => {
                    const notification = getErrorNotification(error);
                    this.notificationService.show(notification.message, notification.type);
                }
            });
    }
}
