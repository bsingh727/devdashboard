var fs = require('fs');
var async = require('async');
function readCollection(){
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
    console.log("Result-->"+results);
  });
}

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
module.exports=readCollection;
