import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= `function processData(inputString) {
    // This line of code prints the first line of output
    console.log("Hello, World.");
    
    // Write the second line of output that prints the contents of 'inputString' here.
  } 

  process.stdin.resume();
  process.stdin.setEncoding("ascii");
  _input = "";
  process.stdin.on("data", function (input) {
      _input += input;
  });

  process.stdin.on("end", function () {
    processData(_input);
  });
  `;

  input = "";
  output = "";

  run() {
    console.log('code: ', this.code);
    console.log('input: ', this.input);
    console.log('output: ', this.output);
  }
}
