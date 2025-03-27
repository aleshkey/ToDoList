import { ChangeDetectorRef, Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { TaskService } from '../../storage/service/task.service';
import { NgForOf } from '@angular/common';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../storage/service/notification.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [
        InputComponent,
        TaskListComponent,
        FormsModule
    ]
})
export class HomeComponent {
    protected newTask: string = '';

    constructor(
        protected taskService: TaskService,
        private cdr: ChangeDetectorRef,
        private notificationService: NotificationService
    ) {}

    addTask(): void {
        if (this.newTask === '') {
            this.notificationService.show('Задача не может быть пустой', 'error');
            return;
        }
        console.log(this.newTask);
        this.taskService.addTask(this.newTask);
        this.notificationService.show('Задача создана', 'success');
        this.newTask = '';
        this.cdr.detectChanges();
    }
}
