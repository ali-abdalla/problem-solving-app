import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { js, cpp } from './source-code/source-codes';

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
    {name: 'Javascript', value: 'javascript', template: js},
    {name: 'C', value: 'c', template: ''},
    {name: 'C++', value: 'cpp', template: cpp},
    {name: 'Python', value: 'python', template: ''},
    {name: 'Java', value: 'java', template: ''}
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
    let previousLanguage = this.languages.find(element => element.value == this.selectedLanguage);
    previousLanguage.template = this.code;    
    this.selectedLanguage = language;
    this.editorOptions = {
      theme: this.selectedTheme,
      language: this.selectedLanguage
    };  
    this.code = this.languages.find(element => element.value == language).template;
  }

  selectTheme(theme: string) {
    this.selectedTheme = theme;
    this.editorOptions = {
      theme: this.selectedTheme,
      language: this.selectedLanguage
    };  
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
