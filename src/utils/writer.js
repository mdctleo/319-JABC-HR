'use strict';

var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  if(arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  if(arg2 && Number.isInteger(arg2)) {
    code = arg2;
  }
  else {
    if(arg1 && Number.isInteger(arg1)) {
      code = arg1;
    }
  }
  if(code && arg1) {
    payload = arg1;
  }
  else if(arg1) {
    payload = arg1;
  }

  if(!code) {
    // if no response code given, we default to 200
    code = 200;
  }
  if(typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }
  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}

exports.writeFile = function(response, file, code = 200) {
  response.writeHead(code, {'Content-Type': file.mimetype });
  response.end(file.buffer, 'binary');
}

exports.deleteNulls  = function(data){
  Object.keys(data).forEach((key) => (data[key] == null) && delete data[key]);
  return data
}

exports.deleteNullsArray  = function(arr){
  let newArr = []
  for(let obj of arr){
    obj = exports.deleteNulls(obj)
    newArr.push(obj)
  }
  return newArr
}