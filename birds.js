var express = require('express');
var router = express.Router();
var ejs = require('ejs');

var plainView = '\n<%= reply %>\n';
var htmlView = '\n<h1><%= reply %></h1>\n';
var jsonView = '\n{"reply":"<%= reply %>"}\n';

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
});

// define the home page route
router.get('/', function (req, res) {
  var reply = "Birds home page";

  res.format({
    'text/plain': function() {
      res.send(template(plainView,{reply:reply}));
    },
    'text/html': function() {
      res.send(template(htmlView,{reply:reply}));
    },
    'application/json': function() {
      res.send(template(jsonView,{reply:reply}));
    },
    'default': function() {
      res.status(406).send('Not Acceptable');
    }
  });
});

// define the about route
router.get('/about', function (req, res) {
  var reply = "About birds";

  res.format({
    'text/plain': function() {
      res.send(template(plainView,{reply:reply}));
    },
    'text/html': function() {
      res.send(template(htmlView,{reply:reply}));
    },
    'application/json': function() {
      res.send(template(jsonView,{reply:reply}));
    },
    'default': function() {
      res.status(406).send('Not Acceptable');
    }
  });
});

module.exports = router

function template(str, data, options) {
  return ejs.render(str, data, options);
}


