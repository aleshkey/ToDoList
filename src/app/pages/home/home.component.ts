import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { TaskService } from '../../storage/service/task.service';

import { TaskListComponent } from '../../components/task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../storage/service/notification.service';
import {BehaviorSubject} from "rxjs";
import {ITaskModel} from "../../storage/model/itask.model";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        InputComponent,
        TaskListComponent,
        FormsModule
    ]
})
export class HomeComponent {
    private tasks$ = new BehaviorSubject<ITaskModel[]>([]);
    readonly tasks = this.tasks$.asObservable();
    protected newTask: string = '';

    constructor(
        protected taskService: TaskService,
        private notificationService: NotificationService
    ) {}

    addTask(): void {
        if (this.newTask === '') {
            this.notificationService.show('Задача не может быть пустой', 'error');
            return;
        }
        const taskModel = this.taskService.addTask(this.newTask);
        this.notificationService.show('Задача создана', 'success');
        this.tasks$.next([...this.tasks$.value, taskModel]);
        this.newTask = '';
    }
}
