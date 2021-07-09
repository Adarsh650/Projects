var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose=require('mongoose')
//const expressLayouts = require('express-ejs-layouts')



mongoose.connect('mongodb://localhost:27017/js-project',{ useNewUrlParser: true },(err)=>{
	if(!err){
		console.log("connection succeeded hurray!");
	}else{
		console.log("connection error: " + err);
	}
});

var addSchema = new mongoose.Schema({
	bookName: String,
	author: String,
	type:String,
	created:{type: Date,default: Date.now}
});

var Register = mongoose.model("indexs",addSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("images"));

const indexRouter = require('./views/indexes6')
const authorRouter = require('./views/indexs')
const bookRouter = require('./views/myLirary')
const indexsRouter = require('./views/show')
app.use('/', indexRouter)
app.use('/indexs', authorRouter)
app.use('/myLibrary', bookRouter)
app.use('/show',indexsRouter)


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))



app.listen(3000,()=>{
	console.log("server is running");
});
