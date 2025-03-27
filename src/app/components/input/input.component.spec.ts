import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { FormsModule } from '@angular/forms';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputComponent, FormsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have default label', () => {
        expect(component.label).toBe('Add a new task');
    });

    it('should update value via writeValue', () => {
        const testValue = 'Hello, world!';
        component.writeValue(testValue);
        expect(component.value).toBe(testValue);
    });

    it('should call onChange when input changes', () => {
        const spyOnChange = jasmine.createSpy('onChange');
        component.registerOnChange(spyOnChange);

        const newValue = 'New Value';
        component.onInputChange(newValue);

        expect(component.value).toBe(newValue);
        expect(spyOnChange).toHaveBeenCalledWith(newValue);
    });

    it('should register and call onTouched', () => {
        const spyOnTouched = jasmine.createSpy('onTouched');
        component.registerOnTouched(spyOnTouched);

        // Вызываем onTouched для проверки, что зарегистрированная функция срабатывает
        component.onTouched();
        expect(spyOnTouched).toHaveBeenCalled();
    });
});
