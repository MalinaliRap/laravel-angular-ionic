import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

    readonly apiUrl: string = 'http://webfloat.test/api/v1';

  constructor() { }
}
