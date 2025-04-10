import {ChangeDetectorRef, Component} from '@angular/core';
import {TaskService} from "../../storage/service/task.service";
import {FormsModule} from "@angular/forms";


@Component({
    selector: 'app-task-list',
    imports: [
    FormsModule
],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
})
export class TaskListComponent {
    isAnyChecked: boolean = false;

    constructor(
        protected taskService: TaskService,
    ) {
    }

    deleteTask(id: number): void {
        this.taskService.deleteById(id);
    }

    editTask(id: number): void {
        const task = this.taskService
            .getAll()
            .find(t => t.id === id);
        if (task) {
            const newText = prompt('Edit task:', task.content);
            if (newText !== null) {
                task.content = newText.trim();
            }
        }
    }

    updateButtonState(): void {
        this.isAnyChecked = this.taskService.getAll()
            .some(task => task.checked);
    }

    deleteSelected(): void {
        this.taskService.deleteChecked()
    }
}
