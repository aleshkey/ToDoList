import {ChangeDetectorRef, Component} from '@angular/core';
import {TaskService} from "../../storage/service/task.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-task-list',
    imports: [
        FormsModule,
        NgForOf
    ],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.css'
})
export class TaskListComponent {
    isAnyChecked: boolean = false;

    constructor(
        protected taskService: TaskService,
        private cdr: ChangeDetectorRef
    ) {
    }

    deleteTask(id: number) {
        this.taskService.deleteById(id);
    }

    editTask(id: number) {
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

    updateButtonState() {
        this.isAnyChecked = this.taskService.getAll().some(task => task.checked);
        this.cdr.detectChanges();
    }

    deleteSelected() {
        this.taskService.deleteChecked()
    }
}
