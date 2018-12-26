var express = require('express');
var router = express.Router();
var ejs = require('ejs');

// add auth0 support
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

var plainView = '\n<%= reply %>\n';
var htmlView = '\n<h1><%= reply %></h1>\n';
var jsonView = '\n{"reply":"<%= reply %>"}\n';

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://mamund.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://quickstarts/api',
  issuer: `https://mamund.auth0.com/`,
  algorithms: ['RS256']
});



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
router.get('/about', checkJwt, function (req, res) {
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


