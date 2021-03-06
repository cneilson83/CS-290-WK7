var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

app.get('/',function(req,res){
  res.render('home');
});

function genContext(){
  var output = {};
  output.randNum = Math.random() * (100 - 1) + 1;
  return output;
}

app.get('/display-info',function(req,res){
  var qParams = [];
  for(var p in req.query){
    qParams.push({'name':p, 'value':req.query[p]})
  }
  var context = {};
  context.sentData = qParams;
  res.render('display-info', context);
});

app.get('/random',function(req,res){
  res.render('random', genContext());
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
