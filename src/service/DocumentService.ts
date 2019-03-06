'use strict';
import {IDocument, IDocumentType} from '../model/models'

/**
 * creates a new DocumentType
 * Will create a new DocumentType with the provided data in body
 *
 * @param {IDocumentType} documentType DocumentType data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.createDocumentType = function(documentType : IDocumentType, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * deletes Document
 * Will delete the Document that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched Document
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.deleteDocument = function(id : Number,  xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * deletes DocumentType
 * Will delete an DocumentType if the DocumentType matches the [id]
 *
 * @param {Number} id of the DocumentType to be deleted
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.deleteDocumentType = function(id : Number,  xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * gets an specific Document
 * Will return the Document that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched Document
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IDocument>}
 **/
exports.getDocument = function(id : Number,  xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "expiryDate" : 1,
  "path" : "path",
  "createdDate" : 0,
  "fkDocumentType" : 1,
  "dueDate" : 6,
  "fkEmployee" : 1,
  "id" : 1,
  "type" : {
    "path" : "path",
    "name" : "name",
    "description" : "description",
    "id" : 1
  }
};
    resolve(examples);
  });
}


/**
 * gets an specific DocumentType
 * Will return the DocumentType that matches with the provided [id]
 *
 * @param {Number} id of the searched DocumentType
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IDocumentType>}
 **/
exports.getDocumentType = function(id : Number,  xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "path" : "path",
  "name" : "name",
  "description" : "description",
  "id" : 1
};
    resolve(examples);
  });
}


/**
 * get all the DocumentTypes
 * This returns all the DocumentTypes of the system. 
 *
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<[]>}
 **/
exports.getDocumentTypes = function(xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = [ {
  "path" : "path",
  "name" : "name",
  "description" : "description",
  "id" : 1
}, {
  "path" : "path",
  "name" : "name",
  "description" : "description",
  "id" : 1
} ];
    resolve(examples);
  });
}


/**
 * updates the Document
 * Will update an Document with the provided data in body  if the Document matches the [id] 
 *
 * @param {Number} id of the searched Document
 * @param {IDocument} document Document data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.updateDocument = function(id : Number, document : IDocument, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * updates the DocumentType
 * Will update an DocumentType with the provided data in body if the DocumentType matches the [id]
 *
 * @param {Number} id of the DocumentType to be updated
 * @param {IDocumentType} documentType DocumentType data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.updateDocumentType = function(id : Number, documentType : IDocumentType, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}

