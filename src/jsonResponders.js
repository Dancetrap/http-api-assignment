const respondJSON = (request, response, status, object) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response with json object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, content) => {
  // set status code (200 success) and content type
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  // write the content string or buffer to response
  response.write(content);
  // send the response to the client
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  // object for our headers
  // Content-Type for json
  const headers = {
    'Content-Type': 'application/json',
  };

  // send response without json object, just headers
  response.writeHead(status, headers);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This was a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respondXML(request, response, 200, responseXML);
  }

  console.log('Success!');
  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, acceptedTypes, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our json with a 400 bad request code
    if (acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      // return response passing out string and content type
      return respondXML(request, response, 400, responseXML);
    }
    return respondJSON(request, response, 400, responseJSON);
  }
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respondXML(request, response, 200, responseXML);
  }
  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  // if the request does not contain a valid=true query parameter
  if (!params.loggedIn || params.loggedIn !== 'true') {
    // set our error message
    responseJSON.message = 'You must be logged in to view';
    // give the error a consistent id
    responseJSON.id = 'unauthorized';
    if (acceptedTypes[0] === 'text/xml') {
      // create a valid XML string with name and age tags.
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
      responseXML = `${responseXML} </response>`;

      // return response passing out string and content type
      return respondXML(request, response, 401, responseXML);
    }
    return respondJSON(request, response, 401, responseJSON);
    // return our json with a 401 bad request code
  }
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respondXML(request, response, 200, responseXML);
  }
  // if the parameter is here, send json with a success status code
  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response, acceptedTypes) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respondXML(request, response, 404, responseXML);
  }
  // return a 404 with an error message
  return respondJSON(request, response, 404, responseJSON);
};

const forbidden = (request, response, acceptedTypes) => {
  // create error message for response
  const responseJSON = {
    message: 'You are not allowed to view this page',
    id: 'forbidden',
  };
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respondXML(request, response, 403, responseXML);
  }
  // return a 404 with an error message
  return respondJSON(request, response, 403, responseJSON);
};

const interal = (request, response, acceptedTypes) => {
  // create error message for response
  const responseJSON = {
    message: 'An unexpected condition is prevent this server from fulfilling its request',
    id: 'interal',
  };
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respondXML(request, response, 500, responseXML);
  }
  // return a 500 with an error message
  return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, acceptedTypes) => {
  // create error message for response
  const responseJSON = {
    message: 'The server does not recognize the request method',
    id: 'notImplemented',
  };
  if (acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respondXML(request, response, 501, responseXML);
  }
  // return a 501 with an error message
  return respondJSON(request, response, 501, responseJSON);
};

const notFoundMeta = (request, response) => {
  // return a 404 without an error message
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
};
