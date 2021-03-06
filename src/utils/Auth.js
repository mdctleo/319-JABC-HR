"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseManager_1 = require("./ResponseManager");
const Priviledges_1 = require("./Priviledges");
const EmployeeService = require("../service/EmployeeService");
const models_1 = require("../model/models");
const utils = require('./writer.js');
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.swagger === undefined) {
            next();
            return;
        }
        if (req.swagger.operation === undefined) {
            next();
            return;
        }
        if (req.swagger.operation.security === undefined && req.swagger.operation.operationId !== 'login') {
            next();
            return;
        }
        let securityOptions = req.swagger.operation.security;
        try {
            yield Validate_AuthToken(req, res, securityOptions);
            yield Validate_Priviledges(req, res, req.swagger.operation.operationId);
            next();
        }
        catch (err) {
            let error = err;
            if (!ResponseManager_1.JABCError.isError(error))
                error = new ResponseManager_1.JABCError(ResponseManager_1.JABCResponse.UNAUTHORIZED);
            ResponseManager_1.RespondJson(res, error, error.responseCode);
            res.end();
        }
    });
}
exports.default = default_1;
function IsRequired(securityOptions, checker) {
    if (securityOptions == undefined)
        return false;
    var required = false;
    for (let securityOption of securityOptions) {
        if (checker(securityOption)) {
            required = true;
            break;
        }
    }
    return required;
}
function Validate_AuthToken(req, res, securityOptions) {
    return new Promise((resolve, reject) => {
        let isLogin = req.swagger.operation.operationId === 'login';
        let isRequired = IsRequired(securityOptions, (securityOption) => {
            return Object.keys(securityOption).includes('AuthToken');
        });
        if (!isRequired && !isLogin) {
            resolve();
            return;
        }
        let token = req.swagger.params['X-Auth-Token'].value;
        EmployeeService.Auth(token)
            .then((loginResponse) => {
            req.employee = loginResponse.employee;
            if (req.employee == undefined) {
                reject(new ResponseManager_1.JABCError(ResponseManager_1.JABCResponse.UNAUTHORIZED));
                return;
            }
            if (isLogin) {
                ResponseManager_1.RespondJson(res, loginResponse);
                res.end();
            }
            else {
                resolve();
            }
        })
            .catch((error) => {
            if (isLogin) {
                resolve();
            }
            else {
                reject(error);
            }
        });
    });
}
function Validate_Priviledges(req, res, operationId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let requiredLevel = Priviledges_1.Priviledges.operations[operationId];
            if (requiredLevel === undefined || requiredLevel === models_1.IEmployee.adminLevelEnum.PUBLIC)
                return;
            if (requiredLevel > req.employee.adminLevel)
                throw new ResponseManager_1.JABCError(ResponseManager_1.JABCResponse.FORBIDDEN);
        }
        catch (error) {
            throw error;
        }
    });
}
//# sourceMappingURL=Auth.js.map