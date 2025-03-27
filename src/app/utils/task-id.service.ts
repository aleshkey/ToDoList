import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskIdService {

    private currentId = 1;

    generateId(): number {
        return this.currentId++;
    }
}
