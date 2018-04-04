import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= `process.stdin.resume();
  process.stdin.setEncoding('ascii');
  
  var input_stdin = "";
  var input_stdin_array = "";
  var input_currentline = 0;
  
  process.stdin.on('data', function (data) {
      input_stdin += data;
  });
  
  process.stdin.on('end', function () {
      input_stdin_array = input_stdin.split("\\n");
      main();    
  });
  
  function readLine() {
      return input_stdin_array[input_currentline++];
  }
  
  /////////////// ignore above this line ////////////////////
  
  function main() {
      var N = parseInt(readLine());
      if (N % 2) {
        console.log("Weird");
      } else {
        console.log("Not Weird");
      }
  }
  
  `;

  input = "";
  output = "";

  constructor(private http: HttpClient) { }

  run() {
    console.log('code: ' + this.code.toString());
    console.log('input: ' + this.input.toString());
    this.http.post('http://localhost:4000/run', {
      code: this.code,
      input: this.input
    }).subscribe(res => {
      this.output = res['result'];
      console.log(this.output);
    });
    
  }
}
