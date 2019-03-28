"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../model/models");
const DEBUG = process.env.DEBUG;
class JABCResponse {
}
JABCResponse.EMPLOYEE = {
    error: 422,
    success: 200
};
JABCResponse.ONBOARDING = {
    error: 422,
    success: 200
};
JABCResponse.PERFORMANCE = {
    error: 422,
    success: 200
};
JABCResponse.ROLE = {
    error: 422,
    success: 200
};
JABCResponse.VACATION = {
    error: 422,
    success: 200
};
JABCResponse.COMPETENCY = {
    error: 422,
    success: 200
};
JABCResponse.UNHANDLED_ERROR = {
    error: 500,
    message: 'Sorry there was a problem, try again later. If the problem persists, comunicate with the site manager.'
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
        MAXIMUM: 'MAXIMUM',
        MINIMUM: 'MINIMUM',
        MIN_LENGTH: 'MIN_LENGTH',
        MAX_LENGTH: 'MAX_LENGTH',
        PATTERN: 'PATTERN'
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
function PreValidator(req, res, next) {
    req.body = deleteDeepNulls(req.body);
    next();
}
exports.PreValidator = PreValidator;
function ErrorHandler(err, req, res, next) {
    if (err) {
        var debugMessage = null;
        var message = JABCResponse.BAD_REQUEST.message;
        if (err.failedValidation) {
            if (err.results !== undefined) {
                let missingProperties = [];
                let invalidProperties = [];
                let typeProperties = [];
                let importantMessage = false;
                for (let error of err.results.errors) {
                    let property;
                    try {
                        property = error.description.split(',')[0];
                    }
                    catch (errr) {
                        importantMessage = true;
                        break;
                    }
                    switch (error.code) {
                        case JABCResponse.ValidatorCodes.MISSING:
                            missingProperties.push(error.message.split(":")[1].trim());
                            break;
                        case JABCResponse.ValidatorCodes.FORMAT:
                            invalidProperties.push(property);
                            break;
                        case JABCResponse.ValidatorCodes.TYPE:
                            typeProperties.push(property);
                            break;
                        case JABCResponse.ValidatorCodes.MINIMUM:
                            message = error.message.replace('Value', `Property ${property} with value,`);
                            importantMessage = true;
                            break;
                        case JABCResponse.ValidatorCodes.MAXIMUM:
                            message = error.message.replace('Value', `Property ${property} with value,`);
                            importantMessage = true;
                            break;
                        case JABCResponse.ValidatorCodes.MIN_LENGTH:
                            message = error.message.replace('String', `Property ${property}`);
                            importantMessage = true;
                            break;
                        case JABCResponse.ValidatorCodes.MAX_LENGTH:
                            message = error.message.replace('String', `Property ${property}`);
                            importantMessage = true;
                            break;
                        case JABCResponse.ValidatorCodes.PATTERN:
                            message = error.message.replace('String', `Property ${property}`);
                            importantMessage = true;
                            if (error.path[0] === 'password') {
                                message = `Property password, does not meet the requirements for a good password.\n Please use at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character [#,?,!,@,$,%,^,&,*,-,:,_,+,¿,¡,¬]`;
                            }
                            break;
                    }
                }
                if (!importantMessage) {
                    let messages = [];
                    if (missingProperties.length > 0)
                        messages.push(`${(missingProperties.length == 1) ? 'Property' : 'Properties'}: ${missingProperties.join(", ")}, ${(missingProperties.length == 1) ? 'is' : 'are'} missing`);
                    if (invalidProperties.length > 0)
                        messages.push(`${(invalidProperties.length == 1) ? 'Property' : 'Properties'}: ${invalidProperties.join(", ")}, have an invalid format`);
                    if (typeProperties.length > 0)
                        messages.push(`${(typeProperties.length == 1) ? 'Property' : 'Properties'}: ${typeProperties.join(", ")}, have an invalid type`);
                    message = `${messages.join('; ')}.`;
                }
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
        RespondJson(res, error, error.responseCode);
    }
    else {
        next();
    }
}
exports.ErrorHandler = ErrorHandler;
class ResponsePayload {
    constructor(code, payload) {
        this.code = code;
        this.payload = payload;
    }
}
exports.ResponsePayload = ResponsePayload;
function RespondWithCode(code, payload) {
    return new ResponsePayload(code, payload);
}
exports.RespondWithCode = RespondWithCode;
function RespondJson(response, arg1, arg2) {
    var code;
    var payload;
    if (arg1 && arg1 instanceof ResponsePayload) {
        RespondJson(response, arg1.payload, arg1.code);
        return;
    }
    if (arg2 && Number.isInteger(arg2)) {
        code = arg2;
    }
    else {
        if (arg1 && Number.isInteger(arg1)) {
            code = arg1;
        }
    }
    if (code && arg1) {
        payload = arg1;
    }
    else if (arg1) {
        payload = arg1;
    }
    if (!code) {
        code = 200;
    }
    if (typeof payload === 'object') {
        deleteDeepNulls(payload);
        payload = JSON.stringify(payload, null, 2);
        if (payload === '{}') {
            payload = JSON.stringify(new JABCError(JABCResponse.UNHANDLED_ERROR), null, 2);
        }
    }
    response.writeHead(code, { 'Content-Type': 'application/json' });
    response.end(payload);
}
exports.RespondJson = RespondJson;
function RespondFile(response, file, code = 200) {
    response.writeHead(code, { 'Content-Type': file.mimetype });
    response.end(file.buffer, 'binary');
}
exports.RespondFile = RespondFile;
function deleteDeepNulls(data) {
    if (typeof data === 'object') {
        Object.keys(data).forEach((key) => {
            if (data[key] == null || (typeof data[key] === 'number' && isNaN(data[key]))) {
                delete data[key];
            }
            else {
                deleteDeepNulls(data[key]);
            }
        });
    }
    return data;
}
exports.deleteDeepNulls = deleteDeepNulls;
function deleteNulls(data) {
    Object.keys(data).forEach((key) => (data[key] == null || (typeof data[key] === 'number' && isNaN(data[key]))) && delete data[key]);
    return data;
}
exports.deleteNulls = deleteNulls;
function deleteNullsArray(arr) {
    let newArr = [];
    for (let obj of arr) {
        obj = deleteNulls(obj);
        newArr.push(obj);
    }
    return newArr;
}
exports.deleteNullsArray = deleteNullsArray;
//# sourceMappingURL=ResponseManager.js.map