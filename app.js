
var express=require('express');
const mysql= require('mysql');

//create mysql connection
const db= mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'version_control',
  multipleStatements:'true'
});

var message;
var fnumber;
var femail;

var uid;
var uname;
var uemail;
var ucontact;
var upass;

//connect
db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log('MySql Connected...');
});
var app=express();
app.get('/createdb',(req,res)=>{
  let sql= 'insert into feedback values(29,"h04@gmail.com",'+ message +');';
  db.query(sql,(err,result)=>{
    if(err) throw err;
    res.send("inserted");
  });
});
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.use(require('body-parser').urlencoded({extended : true}));

app.set('port',process.env.PORT || 3000);

app.get('/',function(req,res){
    res.render('home');
});
app.get('/views/feedback',function(req,res){
  res.render('feedback');
});

app.get('/views/signup',function(req,res){
  res.render('signup');
});
app.post('/views/feedback', (req,res) => {
    message="'"+req.body.feedback+"'";
    fnumber="'"+req.body.num+"'";
    femail="'"+req.body.email+"'";
    let sql= 'insert into feedback values('+ fnumber +',' + femail + ','+ message +');';
  db.query(sql,(err,result)=>{
    if(err) throw err;
    console.log("inserted");
  });
});

app.post('/views/signup', (req,res) => {
  uid="'"+req.body.ID+"'";
  uname="'"+req.body.name+"'";
  uemail="'"+req.body.email+"'";
  ucontact="'"+req.body.number+"'";
  upass="'"+req.body.password+"'";
  
  let sql= 'insert into user values('+ uid +',' + uname + ','+ uemail +','+ ucontact +','+ upass +');';
db.query(sql,(err,result)=>{
  if(err){ 
    res.send("INVALID DETAILS: Try Again!");
    throw err;
  }
  console.log("inserted");
});
});

app.use(function(req,res,next){
    console.log("looking for url"+ req.url);
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

