import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {TaskModel} from "../model/task.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks = new BehaviorSubject<any[]>([]);

    constructor() {}

    getAll(): TaskModel[] {
        return this.tasks.getValue();
    }

    setTasks(tasks: TaskModel[]): void {
        this.tasks.next(tasks);
    }

    addTask(taskContent: string): void {
        const task: TaskModel = {
            id: Date.now(),
            content: taskContent,
            checked: false
        };
        this.setTasks([...this.getAll(), task]);
    }

    deleteChecked(): void {
        const remainingTasks = this.getAll().filter(task => !task.checked);
        this.setTasks(remainingTasks);
    }

    deleteById(id: number): void {
        const remainingTasks = this.getAll().filter(task => task.id !== id);
        this.setTasks(remainingTasks);
    }
}
