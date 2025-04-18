import {Component, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    imports: [FormsModule, NgOptimizedImage]
})
export class SearchComponent {
    username: string = '';

    searchEvent = output<string>();

    search(): void {
        this.searchEvent.emit(this.username);
    }
}
