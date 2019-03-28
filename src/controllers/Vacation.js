'use strict';

var ResponseManager = require('../utils/ResponseManager');
var Vacation = require('../service/VacationService');

module.exports.deleteVacation = function deleteVacation (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Vacation.deleteVacation(id,xAuthToken)
    .then(function (response) {
      ResponseManager.RespondJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      ResponseManager.RespondJson(res, response, response.responseCode);
    });
};

module.exports.getVacation = function getVacation (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Vacation.getVacation(id,xAuthToken)
    .then(function (response) {
      ResponseManager.RespondJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      ResponseManager.RespondJson(res, response, response.responseCode);
    });
};

module.exports.updateVacation = function updateVacation (req, res, next) {
  var id = req.swagger.params['id'].value;
  var vacation = req.swagger.params['vacation'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Vacation.updateVacation(id,vacation,xAuthToken)
    .then(function (response) {
      ResponseManager.RespondJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      ResponseManager.RespondJson(res, response, response.responseCode);
    });
};
