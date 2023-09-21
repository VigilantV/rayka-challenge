import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpReqService {
  constructor(private http: HttpClient) {}

  httpGetReq(url: string) {
    return this.http.get(url);
  }
}
