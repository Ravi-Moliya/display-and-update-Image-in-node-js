var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var url = "mongodb://localhost:27017";
var mc = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var multer = require('multer');
var path = require("path");
var dbname = "h10";


app.use(express.static(__dirname + '/fileupload'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/images'));
app.listen(9800,()=>{console.log("listen on port 9800.....")});
app.set('view engine','ejs');


app.get('/createimagepage',(req,res)=>{
    res.render("createimagepage");
});
app.post('/createimagepage',(req,res)=>{

    mc.connect(url,(err,db)=>{
        if (err) throw err;
        console.log("connected....");
        var dbo = db.db(dbname);
        var collection = dbo.collection("imagewithdata");
        var data ={
            TxtIMAGE:req.param("IMGDATA",null),
            TxtFNAME:req.param("FNAME",null),
            TxtLNAME:req.param("LNAME",null),
            TxtCONTACTNO:req.param("CONTACTNO",null),
            TxtEMAILID:req.param("EMAILID",null),
            TxtPASSWORD:req.param("PASSWORD",null),
            TxtSTATUS:"Y"
        }
        
        collection.insertOne(data,(err,result)=>{
            if (err) throw err;
            res.send("inserted....");
            
        });
        db.close();
    });
});

app.post('/FileUpload',function(req,res){
    console.log("avyo");
    var storage = multer.diskStorage({

        destination:function(req,file,cb){
            cb(null,__dirname+"/fileupload");
        },
        filename :function(req,file,cb){
            paths = file.fieldname + "-" +Date.now()+path.extname(file.originalname);
            cb(null,paths);
            console.log(file);
        } 
    });
    var upload = multer({storage:storage}).single("filetoupload");
    
    upload(req,res,function(err){
        if(err instanceof multer.MulterError)
        {
            console.log(err);
        }
        else if(err)
        {
            console.log(err);
        }
        else
        {
            
            res.set(200).json(paths);
            console.log("succssesfully done");
        }
        
    });
   
});

app.get('/imagepagerecords',(req,res)=>{
    res.render("imagepagerecords");
});

app.get('/imagerecordApi',(req,res)=>{

    mc.connect(url,(err,db)=>{
        if(err) throw err;
        var STR = req.query.Key;
        var temp ={};
        var findtemp ={};
        console.log("connected  display.....");
        var dbo = db.db(dbname);
        var collection = dbo.collection("imagewithdata");
        if(req.query.findOps == "SELECTALLASPEROBJECTID")
        {
            findtemp={"_id":ObjectId(STR)};
            console.log(findtemp);
        }
        collection.find(findtemp).toArray(function(req,docs){

            var returnvalue = "";
            for(var i=0;i<docs.length;i++)
            {
                if(returnvalue=="")
                {
                    returnvalue = returnvalue + "[" + JSON.stringify(docs[i]);
                }
                else
                {
                    returnvalue = returnvalue + "," + JSON.stringify(docs[i]);
                }

            }
            if(returnvalue=="")
            {
                returnvalue = "[]";
            }
            else
            {
                returnvalue = returnvalue + "]"; 
                res.set(200).json(returnvalue);
            }

        });
        db.close();
    });
});

app.post('/imagerecordApi',(req,res)=>{
    
    mc.connect(url,(err,db)=>{
        if(err) throw err;

        console.log("connected for update data.....");
        var dbo = db.db(dbname);
        var collection = dbo.collection("imagewithdata");

        var updatecondition={_id:ObjectId(req.body.ImegMemberId)};
        var updatecontent=null;
        console.log(updatecondition);
        
            updatecontent={
                $set:{
                    TxtIMAGE:req.body.IMGDATA,
                    TxtFNAME:req.body.FNAME,
                    TxtLNAME:req.body.LNAME
                    
                }
            };

        
        console.log(updatecontent);

        collection.updateOne(updatecondition,updatecontent,function(err,result){
            if(err) throw err;
            console.log("updated..");
            res.send("updated.....");

        });
        db.close();
    });
});





