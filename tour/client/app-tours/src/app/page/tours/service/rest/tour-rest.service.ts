import {importProvidersFrom, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITour} from "@tour/lib-dto-js";
import { ConfigService } from '@tour/lib-common';

@Injectable(
)
export class TourRestService {

  constructor(
    private http: HttpClient
  ) { }

  getTours() : Observable<ITour[]> {
    return this.http.get<ITour[]>(ConfigService.Config?.tourservice + "/tour", {
      headers: {
        "Test": "Hello"
      }
    })
  }

  getTours0() : Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/', {
      headers: {
        "Test": "Hello"
      }
    })
  }

  testError() : Observable<ITour[]> {
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/helloError', {
      headers: {
        "Mine": "Error"
      }
    })
  }

  initialize(n: number) {
    return this.http.post(ConfigService.Config?.tourservice + "/tour/syntetic-initialize", {n}).subscribe()
  }

  reset() {
    return this.http.delete(ConfigService.Config?.tourservice + "/tour/syntetic-reset", {}).subscribe()
  }
}
