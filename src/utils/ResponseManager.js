"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../model/models");
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
exports.JABCResponse = JABCResponse;
class JABCError extends Error {
    constructor(response, ...args) {
        response = (response == undefined) ? JABCResponse.UNHANDLED_ERROR : response;
        super(...args);
        console.log(this);
        this.name = JABCError.NAME;
        this.message = args[0];
        this.responseCode = response.error;
        this.debugMessage = this.stack;
        this.type = models_1.IApiResponse.TypeEnum.ERROR;
        Error.captureStackTrace(this, JABCError);
        if (this.responseCode < JABCResponse.NOT_FOUND.error || this.responseCode == JABCResponse.UNHANDLED_ERROR.error) {
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
//# sourceMappingURL=ResponseManager.js.map