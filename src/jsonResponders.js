const users = {};

const respondJSON = (request, response, status, object) => {
    //object for our headers
    //Content-Type for json
    const headers = {
      'Content-Type': 'application/json',
    };
    
    //send response with json object
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    //object for our headers
    //Content-Type for json
    const headers = {
      'Content-Type': 'application/json',
    };
  
    //send response without json object, just headers
    response.writeHead(status, headers);
    response.end();
  };

const success = (request,response) => {
    const responseJSON = {
        message: 'This was a successful response',
    };
    console.log("Success!");
    return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
    //message to send
    const responseJSON = {
      message: 'This request has the required parameters',
    };
  
    //if the request does not contain a valid=true query parameter
    if(!params.valid || params.valid !== 'true') {
      //set our error message
      responseJSON.message = 'Missing valid query parameter set to true';
      //give the error a consistent id 
      responseJSON.id = 'badRequest';
      //return our json with a 400 bad request code
      return respondJSON(request, response, 400, responseJSON);
    }
  
    //if the parameter is here, send json with a success status code
    return respondJSON(request, response, 200, responseJSON);
  };

  const unauthorized = (request, response, params) => {
    //message to send
    const responseJSON = {
      message: 'This request has the required parameters',
    };
  
    //if the request does not contain a valid=true query parameter
    if(!params.valid || params.valid !== 'true') {
      //set our error message
      responseJSON.message = 'You must be logged in to view';
      //give the error a consistent id 
      responseJSON.id = 'unauthorized';
      //return our json with a 401 bad request code
      return respondJSON(request, response, 401, responseJSON);
    }
    params.notFound
    //if the parameter is here, send json with a success status code
    return respondJSON(request, response, 200, responseJSON);
  };

const notFound = (request, response) => {
    //create error message for response
    const responseJSON = {
      message: 'The page you are looking for was not found',
      id: 'notFound',
    };
  
    //return a 404 with an error message
    respondJSON(request, response, 404, responseJSON);
};

const forbidden = (request, response) => {
    //create error message for response
    const responseJSON = {
      message: 'You are not allowed to view this page',
      id: 'forbidden',
    };
  
    //return a 404 with an error message
    respondJSON(request, response, 403, responseJSON);
};

const interal = (request, response) => {
    //create error message for response
    const responseJSON = {
      message: 'An unexpected condition is prevent this server from fulfilling its request',
      id: 'interal',
    };
  
    //return a 500 with an error message
    respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
    //create error message for response
    const responseJSON = {
      message: 'The server does not recognize the request method',
      id: 'notImplemented',
    };
  
    //return a 500 with an error message
    respondJSON(request, response, 501, responseJSON);
};

const notFoundMeta = (request, response) => {
    //return a 404 without an error message
    respondJSONMeta(request, response, 404);
  };

module.exports = {
    success,
    badRequest,
    unauthorized,
    notFound,
    forbidden,
    interal,
    notImplemented,
    notFoundMeta,
}