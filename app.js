var express = require('express');
var app = express();
var hbs = require('hbs');
var moment = require('moment');

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
	renderIndex(res);
});
 
app.get('/about', function(req, res) {
 	res.render('about', {title:"About Me"});
});
 
app.get('/article/:id', function(req, res) {
	Article.where({id : req.params.id}).findOne(function(err, entry) {
		res.render('article',{title:entry.title, blog:entry});
	});
});

app.post('/add', function(req, res) {
	var article = new Article ({ 
		id : randomNumber(), 
		title : req.body.title,
		body : req.body.body,
		published : moment().format('D/M/YYYY')
	});

	article.saveQ().then(function(){
        renderIndex(res);
    }).catch(function(err) {
    	console.log('There was an error saving the article' + err);
    });
});
 
var server = app.listen(8000, function() {
 	console.log('Listening on http://127.0.0.1:8000');
});

// Creates a random number between 1 and 9999
var randomNumber = function() {
	return Math.floor((Math.random() * 9999) + 1);
}

var renderIndex = function(res) {
	Article.find(function(err, entries) {
 		res.render('index', {title:"My Blog", entries:entries});
	});
}
