'use strict';

var utils = require('../utils/writer.js');
var Onboarding = require('../service/OnboardingService');

module.exports.createDocumentType = function createDocumentType (req, res, next) {
  var documentType = req.swagger.params['documentType'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.createDocumentType(documentType,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.createFAQ = function createFAQ (req, res, next) {
  var faq = req.swagger.params['faq'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.createFAQ(faq,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.deleteDocumentType = function deleteDocumentType (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.deleteDocumentType(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.deleteFAQ = function deleteFAQ (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.deleteFAQ(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.deleteOnboardingTask = function deleteOnboardingTask (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.deleteOnboardingTask(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getDocumentType = function getDocumentType (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.getDocumentType(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getDocumentTypeFile = function getDocumentTypeFile (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.getDocumentTypeFile(id,xAuthToken)
    .then(function (response) {
      utils.writeFile(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getDocumentTypes = function getDocumentTypes (req, res, next) {
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.getDocumentTypes(xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getFAQ = function getFAQ (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.getFAQ(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getFAQs = function getFAQs (req, res, next) {
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.getFAQs(xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getOnboardingTask = function getOnboardingTask (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.getOnboardingTask(id,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.getOnboardingTaskFile = function getOnboardingTaskFile (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.getOnboardingTaskFile(id,xAuthToken)
    .then(function (response) {
      utils.writeFile(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.updateDocumentType = function updateDocumentType (req, res, next) {
  var id = req.swagger.params['id'].value;
  var documentType = req.swagger.params['documentType'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.updateDocumentType(id,documentType,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.updateFAQ = function updateFAQ (req, res, next) {
  var id = req.swagger.params['id'].value;
  var faq = req.swagger.params['faq'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.updateFAQ(id,faq,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.updateOnboardingTask = function updateOnboardingTask (req, res, next) {
  var id = req.swagger.params['id'].value;
  var onboardingTask = req.swagger.params['onboardingTask'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  Onboarding.updateOnboardingTask(id,onboardingTask,xAuthToken)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};

module.exports.uploadTemplateDocumentType = function uploadTemplateDocumentType (req, res, next) {
  var id = req.swagger.params['id'].value;
  var xAuthToken = req.swagger.params['X-Auth-Token'].value;
  var document = req.swagger.params['document'].value;
  Onboarding.uploadTemplateDocumentType(id,xAuthToken,document)
    .then(function (response) {
      utils.writeJson(res, response, response.responseCode);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.responseCode);
    });
};
