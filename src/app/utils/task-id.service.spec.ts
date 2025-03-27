import { TestBed } from '@angular/core/testing';

import { TaskIdService } from './task-id.service';

describe('TaskIdService', () => {
  let service: TaskIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
