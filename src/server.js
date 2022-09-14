const http = require('http'); // http module
const url = require('url'); // url module
const htmlHandler = require('./htmlResponders.js');
const jsonHandler = require('./jsonResponders.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  // first we have to parse information from the url
  const parsedUrl = url.parse(request.url);

  // next we need to ensure that we can handle the request
  // method that they are making the request with. This server
  // is only built to handle GET and HEAD requests, so we want
  // to send back a 404 if they make anything else. We can use
  // the HEAD version of notFound to send just a 404 status code.
  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }

  // now we check to see if we have something to handle the
  // request. This syntax may look verbose, but essentially
  // what we are doing is indexing into urlStruct by the method
  // which returns another object. We then index into that object
  // by the pathname to get the handler. Inside the if, we can
  // use that same syntax to call the actual function.
  if (urlStruct[request.method][parsedUrl.pathname]) {
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

// start server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});