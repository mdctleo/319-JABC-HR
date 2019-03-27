"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../model/models");
class Priviledges {
}
Priviledges.operations = {
    'getEmployees': models_1.IEmployee.adminLevelEnum.MANAGER,
    'createEmployee': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'getEmployee': models_1.IEmployee.adminLevelEnum.STAFF,
    'updateEmployee': models_1.IEmployee.adminLevelEnum.STAFF,
    'deleteEmployee': models_1.IEmployee.adminLevelEnum.MANAGER,
    'updateEmployeePassword': models_1.IEmployee.adminLevelEnum.STAFF,
    'getManagersByEmployee': models_1.IEmployee.adminLevelEnum.STAFF,
    'linkEmployeeManager': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'unlinkEmployeeManager': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'setEmployeesOfManager': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'setManagersOfEmployee': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'getEmployeesByManager': models_1.IEmployee.adminLevelEnum.MANAGER,
    'getEmployeeHistory': models_1.IEmployee.adminLevelEnum.MANAGER,
    'getOnboardingTasks': models_1.IEmployee.adminLevelEnum.STAFF,
    'createOnboardingTask': models_1.IEmployee.adminLevelEnum.MANAGER,
    'completeOnboardingTask': models_1.IEmployee.adminLevelEnum.STAFF,
    'getPerformancePlans': models_1.IEmployee.adminLevelEnum.STAFF,
    'createPerformancePlan': models_1.IEmployee.adminLevelEnum.STAFF,
    'getPerformanceReviews': models_1.IEmployee.adminLevelEnum.STAFF,
    'createPerformanceReview': models_1.IEmployee.adminLevelEnum.STAFF,
    'getVacations': models_1.IEmployee.adminLevelEnum.STAFF,
    'createVacation': models_1.IEmployee.adminLevelEnum.STAFF,
    'login': models_1.IEmployee.adminLevelEnum.PUBLIC,
    'getVacation': models_1.IEmployee.adminLevelEnum.STAFF,
    'updateVacation': models_1.IEmployee.adminLevelEnum.STAFF,
    'deleteVacation': models_1.IEmployee.adminLevelEnum.STAFF,
    'getAllOnboardingTasks': models_1.IEmployee.adminLevelEnum.MANAGER,
    'getOnboardingTask': models_1.IEmployee.adminLevelEnum.MANAGER,
    'updateOnboardingTask': models_1.IEmployee.adminLevelEnum.MANAGER,
    'deleteOnboardingTask': models_1.IEmployee.adminLevelEnum.MANAGER,
    'getOnboardingTaskFile': models_1.IEmployee.adminLevelEnum.PUBLIC,
    'getDocumentTypes': models_1.IEmployee.adminLevelEnum.STAFF,
    'createDocumentType': models_1.IEmployee.adminLevelEnum.MANAGER,
    'getDocumentType': models_1.IEmployee.adminLevelEnum.STAFF,
    'uploadTemplateDocumentType': models_1.IEmployee.adminLevelEnum.MANAGER,
    'updateDocumentType': models_1.IEmployee.adminLevelEnum.MANAGER,
    'deleteDocumentType': models_1.IEmployee.adminLevelEnum.MANAGER,
    'getDocumentTypeFile': models_1.IEmployee.adminLevelEnum.PUBLIC,
    'getFAQs': models_1.IEmployee.adminLevelEnum.STAFF,
    'createFAQ': models_1.IEmployee.adminLevelEnum.STAFF,
    'getFAQ': models_1.IEmployee.adminLevelEnum.STAFF,
    'updateFAQ': models_1.IEmployee.adminLevelEnum.STAFF,
    'deleteFAQ': models_1.IEmployee.adminLevelEnum.STAFF,
    'getPerformancePlan': models_1.IEmployee.adminLevelEnum.STAFF,
    'updatePerformancePlan': models_1.IEmployee.adminLevelEnum.STAFF,
    'deletePerformancePlan': models_1.IEmployee.adminLevelEnum.MANAGER,
    'getPerformanceReview': models_1.IEmployee.adminLevelEnum.STAFF,
    'updatePerformanceReview': models_1.IEmployee.adminLevelEnum.STAFF,
    'deletePerformanceReview': models_1.IEmployee.adminLevelEnum.MANAGER,
    'getComments': models_1.IEmployee.adminLevelEnum.STAFF,
    'createComment': models_1.IEmployee.adminLevelEnum.STAFF,
    'getComment': models_1.IEmployee.adminLevelEnum.STAFF,
    'updateComment': models_1.IEmployee.adminLevelEnum.STAFF,
    'deleteComment': models_1.IEmployee.adminLevelEnum.STAFF,
    'getRoles': models_1.IEmployee.adminLevelEnum.STAFF,
    'createRole': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'getRole': models_1.IEmployee.adminLevelEnum.STAFF,
    'updateRole': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'deleteRole': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'getCompetencys': models_1.IEmployee.adminLevelEnum.STAFF,
    'createCompetency': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'getCompetency': models_1.IEmployee.adminLevelEnum.STAFF,
    'updateCompetency': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
    'deleteCompetency': models_1.IEmployee.adminLevelEnum.HR_ADMIN,
};
exports.Priviledges = Priviledges;
//# sourceMappingURL=Priviledges.js.map