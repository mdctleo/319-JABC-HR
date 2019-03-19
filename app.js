'use strict';

require('dotenv').config()
var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('express')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serveStatic = require('serve-static')
var Auth = require('./src/utils/Auth').default
var ResponseManager = require('./src/utils//ResponseManager')
var serverPort = process.env.PORT;

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './src/controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'./src/api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  app.use(ResponseManager.NullHandler)

  // Validate Swagger requests
  app.use(middleware.swaggerValidator({
    schema: swaggerDoc,
    validateRequest: true,
    validateResponse: false,
    allowNullable: true
  }));

  // Authenticates
  app.use(Auth);

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  app.use(ResponseManager.ErrorHandler)

  // Serve static files of frontend
  app.use(serveStatic('frontend/build/'));
  app.get('*', (req, res) =>
      res.sendFile(path.join(__dirname,'./frontend/build/index.html'))
  );

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  });

});
