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
const models_1 = require("../model/models");
var utils = require('./writer');
const DEBUG = true;
class JABCResponse {
}
JABCResponse.EMPLOYEE = {
    error: 410,
    success: 210
};
JABCResponse.DOCUMENT = {
    error: 411,
    success: 211
};
JABCResponse.PERFORMANCE = {
    error: 412,
    success: 212
};
JABCResponse.ROLE = {
    error: 413,
    success: 213
};
JABCResponse.VACATION = {
    error: 414,
    success: 214
};
JABCResponse.UNHANDLED_SUCCESS = {
    error: 200,
    message: ''
};
JABCResponse.UNHANDLED_ERROR = {
    error: 500,
    message: 'There was a problem, try again later.'
};
JABCResponse.NOT_FOUND = {
    error: 404,
    message: 'The resource you requested wasn\' found'
};
JABCResponse.FORBIDDEN = {
    error: 403,
    message: 'You don\'t have the priviledges to request this operation'
};
JABCResponse.UNAUTHORIZED = {
    error: 401,
    message: 'You are not authorized to access the system'
};
JABCResponse.BAD_REQUEST = {
    error: 400,
    message: 'We can\'t process the sent data, please check the format.'
};
exports.JABCResponse = JABCResponse;
class JABCError extends Error {
    constructor(response, ...args) {
        response = (response == undefined) ? JABCResponse.UNHANDLED_ERROR : response;
        super(...args);
        this.name = JABCError.NAME;
        this.message = args[0];
        this.responseCode = response.error;
        this.debugMessage = this.stack;
        this.type = models_1.IApiResponse.TypeEnum.ERROR;
        Error.captureStackTrace(this, JABCError);
        if (this.responseCode < JABCResponse.NOT_FOUND.error || this.responseCode == JABCResponse.UNHANDLED_ERROR.error) {
            this.message = (this.message === undefined) ? response.message : this.message;
            this.debugMessage = `Error: ${this.message}, \n\n Stack: ${this.stack}`;
            this.message = response.message;
        }
    }
    static isError(error) {
        if (error == undefined)
            return false;
        return (error.name == JABCError.NAME);
    }
    toJSON() {
        return {
            message: this.message,
            responseCode: this.responseCode,
            debugMessage: this.debugMessage,
            type: this.type
        };
    }
}
JABCError.NAME = 'JABCError';
exports.JABCError = JABCError;
class JABCSuccess {
    constructor(response, message) {
        response = (response == undefined) ? JABCResponse.UNHANDLED_SUCCESS : response;
        this.message = message;
        this.responseCode = response.success;
        this.type = models_1.IApiResponse.TypeEnum.SUCCESS;
        Error.captureStackTrace(this, JABCError);
    }
    static isSuccess(success) {
        if (success == undefined)
            return false;
        if (success.hasOwnProperty('responseCode')) {
            return (success.responseCode > 200 && success.responseCode < 300);
        }
        return false;
    }
}
exports.JABCSuccess = JABCSuccess;
function ErrorHandler(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (err) {
            var debugMessage = null;
            if (err.failedValidation) {
                if (err.results !== undefined) {
                    debugMessage = {
                        code: err.code,
                        errors: err.results.errors,
                        path: err.path,
                        paramName: err.paramName
                    };
                }
                else {
                    debugMessage = {
                        code: err.code,
                        path: err.path,
                        paramName: err.paramName
                    };
                }
            }
            else {
                debugMessage = {
                    code: err.code
                };
            }
            let error = new JABCError(JABCResponse.BAD_REQUEST);
            if (DEBUG)
                error.debugMessage = debugMessage;
            utils.writeJson(res, error, error.responseCode);
        }
        else {
            next();
        }
    });
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ResponseManager.js.map