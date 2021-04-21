const express = require('express');
const app = express();
app.use(express.json());
const path = require('path');

var urlencodedParser = express.urlencoded({ extended: false })
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
//const client = MongoClient('mongodb://localhost:27017';

app.get('/photo', (req, res) => {
	 MongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true}, function(err, db) 
	 {
		 if (err) throw err;
		 var dbo = db.db("photodb");
			var query = {email_address: req.query.username, password :req.query.password};
			if ((req.query.username == '')||(req.query.password == '')){
				res.send("Textbox should not be empty");
			}
			else{
			dbo.collection("photo").find(query).toArray(function(err, result) {
			if (err) throw err;
			
			//res.send(result);
			if(result == ''){
				res.send("invalid username or password");
			}
			else{
			//res.sendFile(__dirname + '/profile.html');
			//console.log(result);		
			
			 db.close();	  
			}
			})};	
	}); 
});
app.use(express.static(path.join(__dirname, "/public")));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','html');
app.get('/index.html',function(req,res){
	res.sendFile(__dirname+"/"+"index.html");
})

app.get('/register.html',function(req,res){
	res.sendFile(__dirname+"/"+"register.html");
})
app.get('/Profile.html',function(req,res){
	res.sendFile(__dirname+"/"+"Profile.html");
})

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Listening on port ${port}..`));
