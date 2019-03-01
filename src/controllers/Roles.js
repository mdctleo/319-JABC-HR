'use strict';

var utils = require('../utils/writer.js');
var Roles = require('../service/RolesService');

module.exports.createRole = function createRole (req, res, next) {
  var role = req.swagger.params['role'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.createRole(role,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteRole = function deleteRole (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.deleteRole(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRole = function getRole (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.getRole(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRoles = function getRoles (req, res, next) {
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.getRoles(xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateRole = function updateRole (req, res, next) {
  var id = req.swagger.params['id'].value;
  var role = req.swagger.params['role'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.updateRole(id,role,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
