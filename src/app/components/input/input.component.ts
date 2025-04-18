import {Component, forwardRef, input} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    imports: [
        FormsModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ]
})
export class InputComponent implements ControlValueAccessor {
    label = input<string>('Add a new task');
    value: string = '';
    isFocused: boolean = false;

    onChange: (value: string) => void = () => {};
    onTouched: () => void = () => {};

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onInputChange(value: string): void {
        this.value = value;
        this.onChange(value);
    }
}
