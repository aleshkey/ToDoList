import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../storage/service/task.service';
import { ChangeDetectorRef } from '@angular/core';

describe('TaskListComponent', () => {
    let component: TaskListComponent;
    let fixture: ComponentFixture<TaskListComponent>;
    let taskServiceSpy: jasmine.SpyObj<TaskService>;
    let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;

    beforeEach(async () => {
        taskServiceSpy = jasmine.createSpyObj('TaskService', ['deleteById', 'getAll', 'deleteChecked']);
        cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

        await TestBed.configureTestingModule({
            imports: [TaskListComponent],
            providers: [
                { provide: TaskService, useValue: taskServiceSpy },
                { provide: ChangeDetectorRef, useValue: cdrSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskListComponent);
        component = fixture.componentInstance;
    });

    it('deleteTask should call taskService.deleteById with given id', () => {
        const taskId = 123;
        component.deleteTask(taskId);
        expect(taskServiceSpy.deleteById).toHaveBeenCalledWith(taskId);
    });

    describe('editTask', () => {
        const originalContent = 'original content';
        const newContent = 'edited content';
        let task: { id: number; content: string; checked: boolean };

        beforeEach(() => {
            task = { id: 1, content: originalContent, checked: false };
            taskServiceSpy.getAll.and.returnValue([task]);
        });

        it('should update task content when prompt returns a new value', () => {
            spyOn(window, 'prompt').and.returnValue(newContent);
            component.editTask(1);
            expect(task.content).toBe(newContent.trim());
        });

        it('should not update task content when prompt returns null', () => {
            spyOn(window, 'prompt').and.returnValue(null);
            component.editTask(1);
            expect(task.content).toBe(originalContent);
        });
    });


    it('deleteSelected should call taskService.deleteChecked', () => {
        component.deleteSelected();
        expect(taskServiceSpy.deleteChecked).toHaveBeenCalled();
    });
});
