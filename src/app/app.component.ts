import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { DataCalculationService } from './services/data-calculation.service';
import { NumbersList } from './interfaces/numbersList';
import { SecondValue } from './interfaces/secondValue';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  numbersListUrl = '../assets/numbers.json';
  addValueUrl = '../assets/add.json';
  multiplyValueUrl = '../assets/multiply.json';
  showResults = true;
  datas: string[] = [];

  constructor(private dataCalculationService: DataCalculationService) {}

  dataCalculator(
    numbersList: NumbersList[],
    addValue: SecondValue,
    multiplyValue: SecondValue
  ) {
    numbersList.forEach((el: NumbersList) => {
      if (el.action === 'add') {
        if (addValue.isError) {
          this.datas.push('<MISSING DATA>');
        } else {
          this.datas.push(
            `${el.value} + ${addValue.value} = ${el.value + addValue.value}`
          );
        }
      } else if (el.action === 'multiply') {
        if (multiplyValue.isError) {
          this.datas.push('<MISSING DATA>');
        } else {
          this.datas.push(
            `${el.value} * ${multiplyValue.value} = ${
              el.value * multiplyValue.value
            }`
          );
        }
      }
    });
  }

  ngOnInit(): void {
    const { numbersList, addValue, multiplyValue } =
      this.dataCalculationService.fetchData(
        this.numbersListUrl,
        this.addValueUrl,
        this.multiplyValueUrl
      );

    forkJoin([numbersList, addValue, multiplyValue]).subscribe(
      (results: any) => {
        if (results[0].isError) {
          this.showResults = false;
        } else {
          this.dataCalculator(results[0], results[1], results[2]);
        }
      }
    );
  }
}
