import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { js } from './source-code/source-codes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // themes
  private selectedTheme = 'vs-dark';
  private themes = [
    'vs',
    'vs-dark',
    'hc-black'
  ];

  // languages
  private languages = [
    {name: 'C', value: 'c'},
    {name: 'C++', value: 'cpp'},
    {name: 'Javascript', value: 'javascript'},
    {name: 'Python', value: 'python'},
    {name: 'Java', value: 'java'}
  ]
  private selectedLanguage = 'javascript';

  private code: string = js;
  private editorOptions = {
    theme: this.selectedTheme,
    language: this.selectedLanguage
  };

  private input = '';
  private output = '';

  constructor(private http: HttpClient) {}

  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }

  run() {
    console.log('code:' + this.code.toString());
    console.log('input:' + this.input.toString());
    this.http.post('http://localhost:4000/run', {
      code: this.code,
      input: this.input
    }).subscribe(res => {
      this.output = res['result'];
      console.log(this.output);
    });
  }
}
