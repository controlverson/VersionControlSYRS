var express=require('express');
const mysql= require('mysql');
//create mysql connection
const db= mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  databse:'VersionControl'
});
//connect
db.connect((err)=>{
  if(err){
    throw err;
  }
  console.log('MySql Connected...');
});
var app=express();
app.get('/createdb',(req,res)=>{
  let sql= 'CREATE DATABASE VersionControl';
  db.query(sql,(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send('Database created...');
  });
});
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');

app.use(require('body-parser').urlencoded({extended : true}));

app.set('port',process.env.PORT || 3000);

app.get('/',function(req,res){
    res.render('home');
});



app.use(function(req,res,next){
    console.log("looking for url"+ req.url);
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

