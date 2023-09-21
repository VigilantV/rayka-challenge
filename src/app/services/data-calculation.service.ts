import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

import { HttpReqService } from './http-req.service';

@Injectable({
  providedIn: 'root',
})
export class DataCalculationService {
  constructor(private httpReqService: HttpReqService) {}

  fetchData(
    numbersListUrl: string,
    addValueUrl: string,
    multiplyValueUrl: string
  ) {
    const numbersList = this.httpReqService
      .httpGetReq(numbersListUrl)
      .pipe(catchError(() => of({ isError: true })));
    const addValue = this.httpReqService
      .httpGetReq(addValueUrl)
      .pipe(catchError(() => of({ isError: true })));
    const multiplyValue = this.httpReqService
      .httpGetReq(multiplyValueUrl)
      .pipe(catchError(() => of({ isError: true })));

    return { numbersList, addValue, multiplyValue };
  }
}
