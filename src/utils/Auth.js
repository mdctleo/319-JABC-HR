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
const EmployeeService = require("../service/EmployeeService");
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
        if (req.swagger.operation.security === undefined) {
            next();
            return;
        }
        let securityOptions = req.swagger.operation.security;
        try {
            yield Validate_AuthToken(req, res, securityOptions);
            next();
        }
        catch (err) {
            utils.writeJson(res, err, err.responseCode);
            res.end();
        }
    });
}
exports.default = default_1;
function IsRequired(securityOptions, checker) {
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
            if (isLogin) {
                utils.writeJson(res, loginResponse);
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
//# sourceMappingURL=Auth.js.map