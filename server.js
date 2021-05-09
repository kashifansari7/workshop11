var express = require('express');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//here we upload our file
router.put('/upload', function(req, res) {
    const form = new formidable.IncomingForm();
    
    // part.filename.match(/\.(jpg|jpeg|png)$/i))
    
    form.on("file", ( field,file) => {
       
       
        var size=file.size/(1024*1024);
        // console.log(size);
        console.log(file.name);
        // console.log(file);
        if(file.name.match(/\.(jpeg|png)$/i) && size<=1) {
            console.log(file);
            var oldpath = file.path;
            console.log(oldpath);
            var newpath = 'C:/Users/Kashif Saad/Desktop/workshop11/images/' + file.name;
            console.log(newpath);
    
            fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
            
            res.json({result:file,ID:newpath});
            });

           

        } 
        else if(size>1){
            // console.log("true");
            res.json({result:"size exceed, greater than 1 mb"});
        }
        else {
            
            res.json({result:"invalid file type "});
        }
      
    });

    form.parse(req);
    
});

//deleting a file ID
router.delete('/delete-file', function(req, res) {
    var id = req.body.id;
    fs.unlink(id, function (err) {
        if (err) throw err;
        res.json({sucess:"file is deleted successfully"});
      });

});

//taking id and renaming file 

router.post('/rename-file',function(req, res){
      var id=req.body.id;
      var newname =req.body.newname;

    fs.rename(id, newname, function (err) {
        if (err) throw err;
        res.json({sucess:"true", newname:newname});
      });
});



app.use('/api',router);
app.listen(3000);