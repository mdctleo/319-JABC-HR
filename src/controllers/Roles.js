'use strict';

var utils = require('../utils/writer.js');
var Roles = require('../service/RolesService');

module.exports.createCompetency = function createCompetency (req, res, next) {
  var competency = req.swagger.params['competency'].value;
  var idRole = req.swagger.params['idRole'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.createCompetency(competency,idRole,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.createRole = function createRole (req, res, next) {
  var role = req.swagger.params['role'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.createRole(role,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.deleteCompetency = function deleteCompetency (req, res, next) {
  var id = req.swagger.params['id'].value;
  var idRole = req.swagger.params['idRole'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.deleteCompetency(id,idRole,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.deleteRole = function deleteRole (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.deleteRole(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getCompetency = function getCompetency (req, res, next) {
  var id = req.swagger.params['id'].value;
  var idRole = req.swagger.params['idRole'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.getCompetency(id,idRole,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getCompetencys = function getCompetencys (req, res, next) {
  var idRole = req.swagger.params['idRole'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.getCompetencys(idRole,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getRole = function getRole (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.getRole(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getRoles = function getRoles (req, res, next) {
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.getRoles(xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.updateCompetency = function updateCompetency (req, res, next) {
  var id = req.swagger.params['id'].value;
  var competency = req.swagger.params['competency'].value;
  var idRole = req.swagger.params['idRole'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.updateCompetency(id,competency,idRole,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.updateRole = function updateRole (req, res, next) {
  var id = req.swagger.params['id'].value;
  var role = req.swagger.params['role'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Roles.updateRole(id,role,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};
