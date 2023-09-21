import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { HttpReqService } from './http-req.service';

describe('HttpReqService', () => {
  let httpMock: HttpTestingController;
  let service: HttpReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpReqService],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(HttpReqService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const reqs = [
    { url: '../../assets/numbers.json', uniqueText: 'numbersList' },
    { url: '../../assets/add.json', uniqueText: 'addValue' },
    { url: '../../assets/multiply.json', uniqueText: 'multiplyValue' },
  ];
  reqs.forEach((req) => {
    it(`should request http get method for ${req.uniqueText}`, () => {
      const tempData = ['no matter what!'];

      service.httpGetReq(req.url).subscribe((data) => {
        expect(data).toEqual(tempData);
      });

      const thisReq = httpMock.expectOne(req.url);
      expect(thisReq.cancelled).toBeFalsy();
      expect(thisReq.request.responseType).toEqual('json');

      thisReq.flush(tempData);

      httpMock.verify();
    });
  });
});
