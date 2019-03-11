'use strict';

var utils = require('../utils/writer.js');
var Employee = require('../service/EmployeeService');

module.exports.createDocument = function createDocument (req, res, next) {
  var id = req.swagger.params['id'].value;
  var document = req.swagger.params['document'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.createDocument(id,document,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.createEmployee = function createEmployee (req, res, next) {
  var employee = req.swagger.params['employee'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.createEmployee(employee,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.createPerformance = function createPerformance (req, res, next) {
  var id = req.swagger.params['id'].value;
  var performance = req.swagger.params['performance'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.createPerformance(id,performance,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.createVacation = function createVacation (req, res, next) {
  var id = req.swagger.params['id'].value;
  var vacation = req.swagger.params['vacation'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.createVacation(id,vacation,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.deleteEmployee = function deleteEmployee (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  var idAdmin = req.swagger.params['idAdmin'].value;
  Employee.deleteEmployee(id,xAuthToken,idAdmin)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getDocuments = function getDocuments (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  var term = req.swagger.params['term'].value;
  Employee.getDocuments(id,xAuthToken,term)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getEmployee = function getEmployee (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.getEmployee(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getEmployeeHistory = function getEmployeeHistory (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.getEmployeeHistory(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getEmployees = function getEmployees (req, res, next) {
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  var term = req.swagger.params['term'].value;
  Employee.getEmployees(xAuthToken,term)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getEmployeesByManager = function getEmployeesByManager (req, res, next) {
  var idManager = req.swagger.params['idManager'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.getEmployeesByManager(idManager,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getPerformances = function getPerformances (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  var term = req.swagger.params['term'].value;
  Employee.getPerformances(id,xAuthToken,term)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getVacations = function getVacations (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  var term = req.swagger.params['term'].value;
  Employee.getVacations(id,xAuthToken,term)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.linkEmployeeManager = function linkEmployeeManager (req, res, next) {
  var id = req.swagger.params['id'].value;
  var idManager = req.swagger.params['idManager'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.linkEmployeeManager(id,idManager,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.login = function login (req, res, next) {
  var body = req.swagger.params['body'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.login(body,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.unlinkEmployeeManager = function unlinkEmployeeManager (req, res, next) {
  var id = req.swagger.params['id'].value;
  var idManager = req.swagger.params['idManager'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Employee.unlinkEmployeeManager(id,idManager,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.updateEmployee = function updateEmployee (req, res, next) {
  var id = req.swagger.params['id'].value;
  var employee = req.swagger.params['employee'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  var idAdmin = req.swagger.params['idAdmin'].value;
  Employee.updateEmployee(id,employee,xAuthToken,idAdmin)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};
