import { JABCError, JABCResponse } from './ResponseManager';
import { Priviledges } from './Priviledges';
import * as EmployeeService from '../service/EmployeeService';
import { IEmployee } from '../model/models';
const utils = require('./writer.js');

export default async function (req: any, res: any, next: any) {
    if (req.swagger === undefined) { next(); return; }
    if (req.swagger.operation === undefined) { next(); return; }
    if (req.swagger.operation.security === undefined && req.swagger.operation.operationId !== 'login') { next(); return; }

    let securityOptions = req.swagger.operation.security;
    try {
        await Validate_AuthToken(req, res, securityOptions)
        await Validate_Priviledges(req, res, req.swagger.operation.operationId)
        next();
    } catch (err) {
        let error = err
        if(!JABCError.isError(error))
            error = new JABCError(JABCResponse.UNAUTHORIZED)
        utils.writeJson(res, error, error.responseCode);
        res.end()
    }
}

function IsRequired(securityOptions: any, checker: any) {
    if (securityOptions == undefined) return false;
    // Check if security is required for the endpoint
    var required = false;
    for (let securityOption of securityOptions) {
        if (checker(securityOption)) {
            required = true;
            break;
        }
    }
    return required;
}

// Validate X-AuthToken
function Validate_AuthToken(req: any, res: any, securityOptions: any) {
    return new Promise((resolve, reject) => {
        let isLogin = req.swagger.operation.operationId === 'login'
        let isRequired = IsRequired(securityOptions, (securityOption: any) => {
            return Object.keys(securityOption).includes('AuthToken')
        })
        // Check if security is required for the endpoint
        if (!isRequired && !isLogin) {
            resolve();
            return;
        }
        // Auth Token header authorization
        let token = req.swagger.params['X-Auth-Token'].value;
        EmployeeService.Auth(token)
            .then((loginResponse) => {
                req.employee = loginResponse.employee
                if (req.employee == undefined) {
                    reject(new JABCError(JABCResponse.UNAUTHORIZED))
                    return
                }
                if (isLogin) {
                    // The token is used to recover user info
                    utils.writeJson(res, loginResponse)
                    res.end()
                } else {
                    resolve();
                }
            })
            .catch((error: any) => {
                if (isLogin) {
                    resolve();
                } else {
                    reject(error);
                }
            })
    })
}

// Validate Admin level of the employee
async function Validate_Priviledges(req: any, res: any, operationId: any) {
    try {
        let requiredLevel = Priviledges.operations[operationId]
        if(requiredLevel === undefined || requiredLevel === IEmployee.adminLevelEnum.PUBLIC) return;
        if(requiredLevel > req.employee.adminLevel) throw new JABCError(JABCResponse.FORBIDDEN)
    } catch (error) {
        throw error
    }
}