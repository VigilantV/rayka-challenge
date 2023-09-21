import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DataCalculationService } from './services/data-calculation.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dataCalculationService: DataCalculationService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dataCalculationService = TestBed.inject(DataCalculationService);
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should inject DataCalculationService', () => {
    expect(
      dataCalculationService instanceof DataCalculationService
    ).toBeTruthy();
  });

  it('should check the showResult condition (ngif)', (done) => {
    let calculatedResultDiv =
      fixture.debugElement.nativeElement.querySelector('.rows');
    let snackbarElement =
      fixture.debugElement.nativeElement.querySelector('#snackbar');
    expect(calculatedResultDiv).not.toBeNull();
    expect(snackbarElement).toBeNull();

    //make showResults equal to false (happens when there is no numbers.json)
    component.showResults = false;

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      calculatedResultDiv =
        fixture.debugElement.nativeElement.querySelector('.rows');
      snackbarElement =
        fixture.debugElement.nativeElement.querySelector('#snackbar');

      expect(calculatedResultDiv).toBeNull();
      expect(snackbarElement).not.toBeNull();
      done();
    });
  });

  it('should call spied methods', (done) => {
    spyOn(component, 'dataCalculator');
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.dataCalculator).toHaveBeenCalled();
      done();
    });
  });

  let tempNumbersList = [{ value: 3, action: 'add' }];
  let tempAddValue = { value: 5, isError: false };
  let tempMultiplyValue = { value: 8, isError: false };
  it('add action check (dataCalculator())', () => {
    tempNumbersList[0].action = 'add';
    tempAddValue.isError = false;
    tempMultiplyValue.isError = false;
    spyOn(component, 'dataCalculator').and.callThrough();
    component.dataCalculator(tempNumbersList, tempAddValue, tempMultiplyValue);
    expect(component.dataCalculator).toHaveBeenCalledWith(
      tempNumbersList,
      tempAddValue,
      tempMultiplyValue
    );
    expect(component.datas[0]).toBe('3 + 5 = 8');

    tempAddValue.isError = true;
    component.dataCalculator(tempNumbersList, tempAddValue, tempMultiplyValue);
    expect(component.datas[1]).toBe('<MISSING DATA>');
  });

  it('multiply action check (dataCalculator())', () => {
    tempNumbersList[0].action = 'multiply';
    tempAddValue.isError = false;
    tempMultiplyValue.isError = false;
    spyOn(component, 'dataCalculator').and.callThrough();
    component.dataCalculator(tempNumbersList, tempAddValue, tempMultiplyValue);
    expect(component.dataCalculator).toHaveBeenCalledWith(
      tempNumbersList,
      tempAddValue,
      tempMultiplyValue
    );
    expect(component.datas[0]).toBe('3 * 8 = 24');

    tempMultiplyValue.isError = true;
    component.dataCalculator(tempNumbersList, tempAddValue, tempMultiplyValue);
    expect(component.datas[1]).toBe('<MISSING DATA>');
  });

  it('should loop through datas array (ngfor)', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const el: DebugElement[] = fixture.debugElement.queryAll(
        By.css('#datas')
      );
      expect(el.length).toBe(component.datas.length);
      el.forEach((obj: DebugElement, i: number) => {
        const divElement = document.createElement('div');
        divElement.innerHTML = obj.children[0].nativeElement.innerHTML;
        expect(divElement.childNodes[0].nodeValue).toBe(component.datas[i]);
      });
      done();
    });
  });
});
