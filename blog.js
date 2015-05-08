var entries = [
{"id":1, "title":"Hello World!", "body":"This is the body of my blog entry. Sooo exciting.", "published":"6/4/2015"},
{"id":2, "title":"My cat is amazing", "body":"My cat is the most crazy cat in the planet.", "published":"7/4/2015"},
{"id":3, "title":"Bacon is good for you", "body":"Eat more bacon, it cures cancer!", "published":"16/4/2015"},
{"id":4, "title":"Node.js is so cool", "body":"Have you realised how fast you build your blog?.", "published":"23/4/2015"},
{"id":5, "title":"Mongo db coming soon", "body":"In the next posts we will connect mongo db to the blog", "published":"24/4/2015"},
{"id":6, "title":"Read my blog", "body":"Read it pleaseee and leave comments!", "published":"26/4/2015"}];

exports.getBlogEntries = function() {
 return entries;
}
 
exports.getBlogEntry = function(id) {
 for(var i=0; i < entries.length; i++) {
 if(entries[i].id == id) return entries[i];
 }
}