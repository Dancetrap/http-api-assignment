const users = {};

const respondXML = (request, response, status, object) => {
    //object for our headers
    //Content-Type for json
    const headers = {
      'Content-Type': 'text/xml',
    };
    
    //send response with json object
    const xhr = new XMLHttpRequest;
    xhr.open('GET', '/');
    xhr.responseType = 'document';
    xhr.overrideMimeType('text/xml');

    // XMLHttpRequest.respondXML
    response.writeHead(status, headers);
    response.write(XMLHttpRequest.toString(object));
    response.end();
};

const respondXMLMeta = (request, response, status) => {
  //object for our headers
  //Content-Type for json
  const headers = {
    'Content-Type': 'text/xml',
  };
  
  //send response with json object
  response.writeHead(status, headers);
  response.end();
};

const success = (request,response) => {
  const responseXML = {
    message: 'This was a successful response',
  };
  console.log("Success!");
  return respondXML(request, response, 200, responseXML);
}

module.exports = {
  success
}