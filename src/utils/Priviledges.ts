import {IEmployee} from '../model/models'

export class Priviledges{
    // Employee service
    static operations: any = {
        'getEmployees': IEmployee.adminLevelEnum.HR_ADMIN,
        'createEmployee': IEmployee.adminLevelEnum.HR_ADMIN,
        'getEmployee': IEmployee.adminLevelEnum.MANAGER,
        'updateEmployee': IEmployee.adminLevelEnum.STAFF,
        'deleteEmployee': IEmployee.adminLevelEnum.MANAGER,
        'linkEmployeeManager': IEmployee.adminLevelEnum.HR_ADMIN,
        'unlinkEmployeeManager': IEmployee.adminLevelEnum.HR_ADMIN,
        'getEmployeesByManager': IEmployee.adminLevelEnum.STAFF,
        'getEmployeeHistory': IEmployee.adminLevelEnum.STAFF,
        'getDocuments': IEmployee.adminLevelEnum.STAFF,
        'createDocument': IEmployee.adminLevelEnum.STAFF,
        'getPerformances': IEmployee.adminLevelEnum.STAFF,
        'createPerformance': IEmployee.adminLevelEnum.STAFF,
        'getVacations': IEmployee.adminLevelEnum.STAFF,
        'createVacation': IEmployee.adminLevelEnum.STAFF,
        'login': IEmployee.adminLevelEnum.PUBLIC,
        // Vacation service
        'getVacation': IEmployee.adminLevelEnum.STAFF,
        'updateVacation': IEmployee.adminLevelEnum.STAFF,
        'deleteVacation': IEmployee.adminLevelEnum.STAFF,
        // Document service
        'getDocument': IEmployee.adminLevelEnum.STAFF,
        'updateDocument': IEmployee.adminLevelEnum.STAFF,
        'deleteDocument': IEmployee.adminLevelEnum.HR_ADMIN,
        'getDocumentTypes': IEmployee.adminLevelEnum.STAFF,
        'createDocumentType': IEmployee.adminLevelEnum.MANAGER,
        'getDocumentType': IEmployee.adminLevelEnum.STAFF,
        'updateDocumentType': IEmployee.adminLevelEnum.MANAGER,
        'deleteDocumentType': IEmployee.adminLevelEnum.MANAGER,
        // Performance service
        'getPerformance': IEmployee.adminLevelEnum.STAFF,
        'updatePerformance': IEmployee.adminLevelEnum.STAFF,
        'deletePerformance': IEmployee.adminLevelEnum.STAFF,
        'getComments': IEmployee.adminLevelEnum.STAFF,
        'createComment': IEmployee.adminLevelEnum.STAFF,
        'getComment': IEmployee.adminLevelEnum.STAFF,
        'updateComment': IEmployee.adminLevelEnum.STAFF,
        'deleteComment': IEmployee.adminLevelEnum.STAFF,
        'getCompetencys': IEmployee.adminLevelEnum.STAFF,
        'createCompetency': IEmployee.adminLevelEnum.HR_ADMIN,
        'getCompetency': IEmployee.adminLevelEnum.STAFF,
        'updateCompetency': IEmployee.adminLevelEnum.HR_ADMIN,
        'deleteCompetency': IEmployee.adminLevelEnum.HR_ADMIN,
        // Role service
        'getRoles': IEmployee.adminLevelEnum.STAFF,
        'createRole': IEmployee.adminLevelEnum.HR_ADMIN,
        'getRole': IEmployee.adminLevelEnum.STAFF,
        'updateRole': IEmployee.adminLevelEnum.HR_ADMIN,
        'deleteRole': IEmployee.adminLevelEnum.HR_ADMIN,
    }
}