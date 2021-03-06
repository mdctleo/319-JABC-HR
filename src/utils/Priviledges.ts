import {IEmployee} from '../model/models'

export class Priviledges{
    // Employee service
    static operations: any = {
        // Employee service
        'getEmployees': IEmployee.adminLevelEnum.MANAGER,
        'createEmployee': IEmployee.adminLevelEnum.HR_ADMIN,
        'getEmployee': IEmployee.adminLevelEnum.STAFF,
        'updateEmployee': IEmployee.adminLevelEnum.MANAGER,
        'deleteEmployee': IEmployee.adminLevelEnum.MANAGER,
        'updateEmployeePassword': IEmployee.adminLevelEnum.STAFF,
        'getManagersByEmployee': IEmployee.adminLevelEnum.STAFF,
        'linkEmployeeManager': IEmployee.adminLevelEnum.HR_ADMIN,
        'unlinkEmployeeManager': IEmployee.adminLevelEnum.HR_ADMIN,
        'setEmployeesOfManager': IEmployee.adminLevelEnum.HR_ADMIN,
        'setManagersOfEmployee': IEmployee.adminLevelEnum.HR_ADMIN,
        'getEmployeesByManager': IEmployee.adminLevelEnum.MANAGER,
        'getEmployeeHistory': IEmployee.adminLevelEnum.MANAGER,
        'getOnboardingTasks': IEmployee.adminLevelEnum.STAFF,
        'createOnboardingTask': IEmployee.adminLevelEnum.MANAGER,
        'completeOnboardingTask': IEmployee.adminLevelEnum.STAFF,
        'getPerformancePlans': IEmployee.adminLevelEnum.STAFF,
        'createPerformancePlan': IEmployee.adminLevelEnum.STAFF,
        'getPerformanceReviews': IEmployee.adminLevelEnum.STAFF,
        'createPerformanceReview': IEmployee.adminLevelEnum.STAFF,
        'getVacations': IEmployee.adminLevelEnum.STAFF,
        'createVacation': IEmployee.adminLevelEnum.STAFF,
        'login': IEmployee.adminLevelEnum.PUBLIC,
        // Vacation service
        'getVacation': IEmployee.adminLevelEnum.STAFF,
        'updateVacation': IEmployee.adminLevelEnum.STAFF,
        'deleteVacation': IEmployee.adminLevelEnum.STAFF,
        // Onboarding service
        'getAllOnboardingTasks': IEmployee.adminLevelEnum.MANAGER,
        'getOnboardingTask': IEmployee.adminLevelEnum.MANAGER,
        'updateOnboardingTask': IEmployee.adminLevelEnum.STAFF,
        'deleteOnboardingTask': IEmployee.adminLevelEnum.MANAGER,
        'getOnboardingTaskFile': IEmployee.adminLevelEnum.PUBLIC,
        'getDocumentTypes': IEmployee.adminLevelEnum.STAFF,
        'createDocumentType': IEmployee.adminLevelEnum.MANAGER,
        'getDocumentType': IEmployee.adminLevelEnum.STAFF,
        'uploadTemplateDocumentType': IEmployee.adminLevelEnum.MANAGER,
        'updateDocumentType': IEmployee.adminLevelEnum.MANAGER,
        'deleteDocumentType': IEmployee.adminLevelEnum.MANAGER,
        'getDocumentTypeFile': IEmployee.adminLevelEnum.PUBLIC,
        'getFAQs': IEmployee.adminLevelEnum.STAFF,
        'createFAQ': IEmployee.adminLevelEnum.STAFF,
        'getFAQ': IEmployee.adminLevelEnum.STAFF,
        'updateFAQ': IEmployee.adminLevelEnum.STAFF,
        'deleteFAQ': IEmployee.adminLevelEnum.STAFF,
        // Performance service
        'getPerformancePlan': IEmployee.adminLevelEnum.STAFF,
        'updatePerformancePlan': IEmployee.adminLevelEnum.STAFF,
        'deletePerformancePlan': IEmployee.adminLevelEnum.MANAGER,
        'getPerformanceReview': IEmployee.adminLevelEnum.STAFF,
        'updatePerformanceReview': IEmployee.adminLevelEnum.STAFF,
        'deletePerformanceReview': IEmployee.adminLevelEnum.MANAGER,
        'getComments': IEmployee.adminLevelEnum.STAFF,
        'createComment': IEmployee.adminLevelEnum.STAFF,
        'getComment': IEmployee.adminLevelEnum.STAFF,
        'updateComment': IEmployee.adminLevelEnum.STAFF,
        'deleteComment': IEmployee.adminLevelEnum.STAFF,
        // Role service
        'getRoles': IEmployee.adminLevelEnum.STAFF,
        'createRole': IEmployee.adminLevelEnum.HR_ADMIN,
        'getRole': IEmployee.adminLevelEnum.STAFF,
        'updateRole': IEmployee.adminLevelEnum.HR_ADMIN,
        'deleteRole': IEmployee.adminLevelEnum.HR_ADMIN,
        'getCompetencys': IEmployee.adminLevelEnum.STAFF,
        'createCompetency': IEmployee.adminLevelEnum.HR_ADMIN,
        'getCompetency': IEmployee.adminLevelEnum.STAFF,
        'updateCompetency': IEmployee.adminLevelEnum.HR_ADMIN,
        'deleteCompetency': IEmployee.adminLevelEnum.HR_ADMIN,
    }
}