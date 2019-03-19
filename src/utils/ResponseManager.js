"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../model/models");
var utils = require('./writer');
const DEBUG = process.env.DEBUG;
class JABCResponse {
}
JABCResponse.EMPLOYEE = {
    error: 410,
    success: 200
};
JABCResponse.ONBOARDING = {
    error: 411,
    success: 200
};
JABCResponse.PERFORMANCE = {
    error: 412,
    success: 200
};
JABCResponse.ROLE = {
    error: 413,
    success: 200
};
JABCResponse.VACATION = {
    error: 414,
    success: 200
};
JABCResponse.COMPETENCY = {
    error: 415,
    success: 200
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
(function (JABCResponse) {
    JABCResponse.ValidatorCodes = {
        SCHEMA: 'SCHEMA_VALIDATION_FAILED',
        MISSING: 'OBJECT_MISSING_REQUIRED_PROPERTY',
        TYPE: 'INVALID_TYPE',
        FORMAT: 'INVALID_FORMAT',
    };
})(JABCResponse = exports.JABCResponse || (exports.JABCResponse = {}));
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
        if ((this.responseCode < JABCResponse.NOT_FOUND.error || this.responseCode == JABCResponse.UNHANDLED_ERROR.error) && this.responseCode != JABCResponse.BAD_REQUEST.error) {
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
function NullHandler(req, res, next) {
    req.body = utils.deleteDeepNulls(req.body);
    next();
}
exports.NullHandler = NullHandler;
function ErrorHandler(err, req, res, next) {
    if (err) {
        var debugMessage = null;
        var message = JABCResponse.BAD_REQUEST.message;
        if (err.failedValidation) {
            if (err.results !== undefined) {
                let missingProperties = [];
                let invalidProperties = [];
                let typeProperties = [];
                for (let error of err.results.errors) {
                    switch (error.code) {
                        case JABCResponse.ValidatorCodes.MISSING:
                            missingProperties.push(error.message.split(":")[1].trim());
                            break;
                        case JABCResponse.ValidatorCodes.FORMAT:
                            invalidProperties.push(error.path[0]);
                            break;
                        case JABCResponse.ValidatorCodes.TYPE:
                            typeProperties.push(error.path[0]);
                            break;
                    }
                }
                let messages = [];
                if (missingProperties.length > 0)
                    messages.push(`${(missingProperties.length == 1) ? 'Property' : 'Properties'}: ${missingProperties.join(", ")}, are missing`);
                if (invalidProperties.length > 0)
                    messages.push(`${(invalidProperties.length == 1) ? 'Property' : 'Properties'}: ${invalidProperties.join(", ")}, have an invalid format`);
                if (typeProperties.length > 0)
                    messages.push(`${(typeProperties.length == 1) ? 'Property' : 'Properties'}: ${typeProperties.join(", ")}, have an invalid type`);
                message = `${messages.join('; ')}.`;
            }
            else {
                debugMessage = {
                    code: err.code,
                    path: err.path,
                    paramName: err.paramName
                };
            }
        }
        else if (err.type == 'entity.parse.failed') {
            message = 'Please send the data in a correct JSON format';
        }
        else {
            debugMessage = err;
        }
        let error = new JABCError(JABCResponse.BAD_REQUEST, message);
        if (DEBUG)
            error.debugMessage = JSON.stringify(debugMessage);
        utils.writeJson(res, error, error.responseCode);
    }
    else {
        next();
    }
}
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ResponseManager.js.map