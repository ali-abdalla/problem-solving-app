var express = require('express');
var cors = require('cors');
var app = express();
var compile_run = require('compile-run');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.post('/execute/javascript', function (req, res) {
  console.log(req.body);
  compile_run.runNode(req.body.code, req.body.input, function (stdout, stderr, err) {
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    console.log('err:', err);
    if (!err) {
      if (stderr) {
        res.json({
          result: stderr.replace(/\n/ig, '\\n')
        });
      } else {
        res.json({
          result: stdout.replace(/\n/ig, '\\n')
        });
      }
    } else {
      console.log(err);
      res.json({
        result: stderr
      });
    }
  });
});

app.post('/execute/cpp', function (req, res) {
  console.log(req.body);
  compile_run.runCpp(req.body.code, req.body.input, function (stdout, stderr, err) {
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    console.log('err:', err);
    if (!err) {
      if (stderr) {
        res.json({
          result: stderr.replace(/\n/ig, '\\n')
        });
      } else {
        res.json({
          result: stdout.replace(/\n/ig, '\\n')
        });
      }
    } else {
      console.log(err);
      res.json({
        result: stderr
      });
    }
  });
});

app.listen(4000);