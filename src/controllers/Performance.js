'use strict';

var utils = require('../utils/writer.js');
var Performance = require('../service/PerformanceService');

module.exports.createComment = function createComment (req, res, next) {
  var id = req.swagger.params['id'].value;
  var comment = req.swagger.params['comment'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Performance.createComment(id,comment,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.deleteComment = function deleteComment (req, res, next) {
  var id = req.swagger.params['id'].value;
  var idComment = req.swagger.params['idComment'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Performance.deleteComment(id,idComment,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.deletePerformance = function deletePerformance (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Performance.deletePerformance(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getComment = function getComment (req, res, next) {
  var id = req.swagger.params['id'].value;
  var idComment = req.swagger.params['idComment'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Performance.getComment(id,idComment,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getComments = function getComments (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Performance.getComments(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getPerformance = function getPerformance (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Performance.getPerformance(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.updateComment = function updateComment (req, res, next) {
  var id = req.swagger.params['id'].value;
  var idComment = req.swagger.params['idComment'].value;
  var comment = req.swagger.params['comment'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Performance.updateComment(id,idComment,comment,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.updatePerformance = function updatePerformance (req, res, next) {
  var id = req.swagger.params['id'].value;
  var performance = req.swagger.params['performance'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Performance.updatePerformance(id,performance,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};
