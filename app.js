var express = require('express');
var app = express();
var hbs = require('hbs');

var mongoose = require('mongoose-promised').connect('mongodb://localhost/simple');;

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.bodyParser());

var articleSchema = {
	id : Number, 
	title : String, 
	body : String, 
	published : String
};

var Article = mongoose.model('Article', articleSchema, 'articles');

app.get('/', function(req, res) {
	Article.find(function(err, entries) {
	 	res.render('index',{title:"My Blog", entries:entries});
	});
});
 
app.get('/about', function(req, res) {
 res.render('about', {title:"About Me"});
});
 
app.get('/article/:id', function(req, res) {
	Article.where({id : req.params.id}).findOne(function(err, entry) {
		res.render('article',{title:entry.title, blog:entry});
	});
});
 
var server = app.listen(8000, function() {
 	console.log('Listening on http://127.0.0.1:8000');
});
