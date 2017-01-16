var fs = require('fs');
var async = require('async');
var output_filename;
var main_array=[];
module.exports = {
readAllCollection:function(){
const folder = './collection_output/';
                var status;
                var count=0;
                var collection=[];
                var output_filename;
                fs.readdir(folder, (err, subfolder) => {
                 var remaining = subfolder.length;
                  subfolder.forEach(subfolder_name => {
                   var dir=folder+subfolder_name+'/';
                    fs.readdir(dir, (err, json_file) => {
                     json_file.forEach(json_file_name => {
                                        var collectionjson_path=dir+json_file_name;
                                        collection.push(collectionjson_path);
                                        console.log("ouput json path-->"+collectionjson_path);
                                        collection.push(collectionjson_path);
                                       /* console.log(collection);
                                          console.log(remaining);
*/
                                        });
                     });
                  });
                });
                console.log("==================");
                console.log(collection);
                console.log("==================");
//return collection;
},
 getContent:function(file_path){
         // var json_dir=folder+subfolder_name+'/'+files[index_file];
          console.log("getContent");
         fs.readFile(file_path,function(error,contents){
         if(error){
         console.log(error);
         }else{
         console.log("getContent1"+contents);
         return contents;
         }
         });
 },
readAllCollectionSynch:function(){
const folder = './collection_output/';
fs.readdir( folder, ( error, subfolder )=> {
        if ( error ) {
            console.log("Error listing file contents.");
        } else {
            var totalBytes = 0;
            // This function repeatedly calls itself until the files are all read.
            var readFiles = function(index) {
                if ( index == subfolder.length ) {
                    // we are done.
                    console.log( "Done reading files. totalBytes = ");
                } else {
                      var dir=folder+subfolder[index]+'/';
                      console.log("folder-->"+dir);
                      fs.readdir( dir, ( error, files ) =>{
                        if ( error ) {
                            console.log( "Error reading file. ", error );
                        } else {
                            var json_dir=dir+files;
                            console.log("file path-->"+json_dir);
                             var content= module.exports.getContent(json_dir);
                             console.log("content-->"+content);
                            readFiles(index + 1);
                        }
                    });
                }

            };

            readFiles(0);
        }
    });
},
demoFunction:function(callback){
const folder = './collection_output/';
                var status;
                var count=0;
                var collection=[];
                var output_filename;
                fs.readdir(folder, (err, subfolder) => {
                 var remaining = subfolder.length;
                  subfolder.forEach(subfolder_name => {
                   var dir=folder+subfolder_name+'/';
                    fs.readdir(dir, (err, json_file) => {
                     json_file.forEach(json_file_name => {
                                        var collectionjson_path=dir+json_file_name;
                                        collection.push(collectionjson_path);
                                        console.log("ouput json path-->"+collectionjson_path);
                                        collection.push(collectionjson_path);
                                        count++;
                                       /* console.log(collection);
                                          console.log(remaining);
*/
                                        });
                     });
                  });
                });
                if(collection.length == count) {
                            if(typeof callback == "function") {
                                callback(collection);
                            }
                            console.log("demoFunction: done"+collection.length+"---"+count);
                        } else {
                            console.log("demoFunction: length mistmach");
                        }

                console.log("==================");
                console.log(collection);
                console.log("==================");
 },callbackDemo:function(){
  console.log("callbackDemo is running");
     var work = {};
     var results1={};
     const parentFolder = './collection_output/';
     console.log('parentFolder-->'+parentFolder);
     var fileNames = this.walk(parentFolder);
     for(var i= 0; i<fileNames.length ; i++){
        work['file0'+i] = async.apply(fs.readFile, "./"+fileNames[i].slice( 1 ));
     }
     console.log(work);
     async.parallel(work, function (error, results) {
       if (error) {
         //res.status(500).send(error);
         console.log(error);
         return error;

       }
       var resLen = Object.keys(results);
       for(var i= 0; i< resLen.length; i++){
           results1['file0'+i] =  JSON.parse(results['file0'+i]);
           main_array.push(results1);
           console.log(results1);
       }
       //res.send(results);
       console.log("results-->"+results);
       //return results;
     });
 }, walk : function(dir) {
 console.log("walk is running");
       var results = []
       var list = fs.readdirSync(dir)
       list.forEach(function(file) {
           file = dir + '/' + file
           var stat = fs.statSync(file)
           if (stat && stat.isDirectory()) results = results.concat(module.exports.walk(file))
           else results.push(file)
       })
       return results
 },getJsonArray:function()
 {
 return main_array;
 }
//return collection;}
};