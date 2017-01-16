var application_root = __dirname,
    express = require("express"),
    cors = require("cors"),
    path = require("path");
  var async = require('async');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
var fs = require('fs');

var app = express();
app.use(cors());
app.use( bodyParser.urlencoded( {
    extended: true
}));

app.use( bodyParser.json() );

console.log("Server is running");

app.post('/getprojectdetails', function(req, res){

    console.log(req.body);
    var project_name = req.body.project_name;

    fs.readFile('newmanresults/PRJ1/1.JSON', 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        res.send(content);
    });
});
app.get('/json', function(req, res) {

  var work = {};

  const parentFolder = './collection_output/';

  var fileNames = walk(parentFolder);

  for(var i= 0; i<fileNames.length ; i++){
     work['file0'+i] = async.apply(fs.readFile, __dirname + fileNames[i].slice( 1 ));
  }

  async.parallel(work, function (error, results) {
    if (error) {
      res.status(500).send(error);
      return;
    }

    var resLen = Object.keys(results);

    for(var i= 0; i< resLen.length; i++){
        results['file0'+i] =  JSON.parse(results['file0'+i]);
    }

    res.send(results);
  });
});

var walk = function(dir) {
    var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) results = results.concat(walk(file))
        else results.push(file)
    })

    return results
}

app.listen(1212);