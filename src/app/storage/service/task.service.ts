import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {ITaskModel} from "../model/itask.model";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks = new BehaviorSubject<any[]>([]);

    constructor() {}

    getAll(): ITaskModel[] {
        return this.tasks.getValue();
    }

    setTasks(tasks: ITaskModel[]): void {
        this.tasks.next(tasks);
    }

    addTask(taskContent: string): ITaskModel {
        const task: ITaskModel = {
            id: Date.now(),
            content: taskContent,
            checked: false
        };
        this.setTasks([...this.getAll(), task]);
        return task;
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
