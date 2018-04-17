var express = require('express');
var cors = require('cors');
var app = express();
var compileRun = require('compile-run');
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

function log(language, code, input, stdout, stderr, err) {
  console.log(`-------------------- run ${language} --------------------`);
  console.log(`code:\n${code}`);
  console.log(`input:\n${input}`);
  console.log(`stdout:\n${stdout}`);
  console.log(`stderr:\n${stderr}`);
  console.log(`err:\n${err}`);
}

app.post('/execute/javascript', function (req, res) {
  compileRun.runNode(req.body.code, req.body.input, function (stdout, stderr, err) {
    log('javascript', req.body.code, req.body.input, stdout, stderr, err);
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
  compileRun.runCpp(req.body.code, req.body.input, function (stdout, stderr, err) {
    log('cpp', req.body.code, req.body.input, stdout, stderr, err);
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

app.post('/execute/c', function (req, res) {
  compileRun.runC(req.body.code, req.body.input, function (stdout, stderr, err) {
    log('c', req.body.code, req.body.input, stdout, stderr, err);
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

app.post('/execute/java', function (req, res) {
  compileRun.runJava(req.body.code, req.body.input, function (stdout, stderr, err) {
    log('java', req.body.code, req.body.input, stdout, stderr, err);
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

app.post('/execute/python', function (req, res) {
  compileRun.runPython(req.body.code, req.body.input, function (stdout, stderr, err) {
    log('python', req.body.code, req.body.input, stdout, stderr, err);
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