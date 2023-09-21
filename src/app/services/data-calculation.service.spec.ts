import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { DataCalculationService } from './data-calculation.service';
import { HttpReqService } from './http-req.service';

describe('DataCalculationService', () => {
  let service: DataCalculationService;
  let httpReqService: HttpReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(DataCalculationService);
    httpReqService = TestBed.inject(HttpReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject HttpReqService', () => {
    expect(httpReqService instanceof HttpReqService).toBeTruthy();
  });

  const numbersListUrl = '../../assets/numbers.json';
  const addValueUrl = '../../assets/add.json';
  const multiplyValueUrl = '../../assets/multiply.json';

  it('should fetch files without error catch', () => {
    const { numbersList, addValue, multiplyValue } = service.fetchData(
      numbersListUrl,
      addValueUrl,
      multiplyValueUrl
    );
    numbersList.subscribe((result: any) => {
      expect(result.isError).toBeUndefined();
    });
    addValue.subscribe((result: any) => {
      expect(result.isError).toBeUndefined();
    });
    multiplyValue.subscribe((result: any) => {
      expect(result.isError).toBeUndefined();
    });
    expect().nothing();
  });

  it('should catch error when numbersList file is not exist', () => {
    const { numbersList, addValue, multiplyValue } = service.fetchData(
      'fake path',
      'fake path',
      'fake path'
    );

    numbersList.subscribe((result: any) => {
      expect(result.isError).toBeTrue();
    });
    addValue.subscribe((result: any) => {
      expect(result.isError).toBeTrue();
    });
    multiplyValue.subscribe((result: any) => {
      expect(result.isError).toBeTrue();
    });
    expect().nothing();
  });
});
