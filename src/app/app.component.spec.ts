import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ChangeDetectorRef} from "@angular/core";
import {TaskService} from "./storage/service/task.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('AppComponent', () => {
  let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
      cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent],
      providers: [
          { provide: ChangeDetectorRef, useValue: cdrSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'ToDoList' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ToDoList');
  });

});
