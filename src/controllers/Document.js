'use strict';

var utils = require('../utils/writer.js');
var Document = require('../service/DocumentService');

module.exports.createDocumentType = function createDocumentType (req, res, next) {
  var documentType = req.swagger.params['documentType'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Document.createDocumentType(documentType,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteDocument = function deleteDocument (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Document.deleteDocument(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteDocumentType = function deleteDocumentType (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Document.deleteDocumentType(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDocument = function getDocument (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Document.getDocument(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDocumentType = function getDocumentType (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Document.getDocumentType(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDocumentTypes = function getDocumentTypes (req, res, next) {
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Document.getDocumentTypes(xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateDocument = function updateDocument (req, res, next) {
  var id = req.swagger.params['id'].value;
  var document = req.swagger.params['document'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Document.updateDocument(id,document,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateDocumentType = function updateDocumentType (req, res, next) {
  var id = req.swagger.params['id'].value;
  var documentType = req.swagger.params['documentType'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Document.updateDocumentType(id,documentType,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
