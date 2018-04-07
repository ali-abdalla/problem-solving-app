import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  public execute(language: string, code: string, input: string) {
    console.log('code:' + code);
    console.log('input:' + input);
    return this.http.post(`http://localhost:4000/execute/${language}`, {code, input})
      .map((res: any) => res.result);
  }
}
