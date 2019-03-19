import { IApiResponse } from '../model/models'
var utils = require('./writer')

const DEBUG = process.env.DEBUG;



export interface JABCResponseType {
    error?: number,
    success?: number,
    message?: string
}

export class JABCResponse {
    static EMPLOYEE = {
        error: 410,
        success: 200
    }
    static ONBOARDING = {
        error: 411,
        success: 200
    }
    static PERFORMANCE = {
        error: 412,
        success: 200
    }
    static ROLE = {
        error: 413,
        success: 200
    }
    static VACATION = {
        error: 414,
        success: 200
    }
    static COMPETENCY = {
        error: 415,
        success: 200
    }

    static UNHANDLED_ERROR = {
        error: 500,
        message: 'There was a problem, try again later.'
    }
    static NOT_FOUND = {
        error: 404,
        message: 'The resource you requested wasn\' found'
    }
    static FORBIDDEN = {
        error: 403,
        message: 'You don\'t have the priviledges to request this operation'
    }
    static UNAUTHORIZED = {
        error: 401,
        message: 'You are not authorized to access the system'
    }
    static BAD_REQUEST = {
        error: 400,
        message: 'We can\'t process the sent data, please check the format.'
    }
}

export class JABCError extends Error implements IApiResponse {

    static NAME = 'JABCError';
    message: string;
    responseCode: number;
    debugMessage: any;
    type: IApiResponse.TypeEnum;

    constructor(response: JABCResponseType, ...args: any) {
        response = (response == undefined) ? JABCResponse.UNHANDLED_ERROR : response;
        super(...args)
        this.name = JABCError.NAME;
        this.message = args[0]
        this.responseCode = response.error;
        this.debugMessage = this.stack;
        this.type = IApiResponse.TypeEnum.ERROR;
        Error.captureStackTrace(this, JABCError)
        if (this.responseCode < JABCResponse.NOT_FOUND.error || this.responseCode == JABCResponse.UNHANDLED_ERROR.error) {
            this.message = (this.message === undefined) ? response.message : this.message
            this.debugMessage = `Error: ${this.message}, \n\n Stack: ${this.stack}`;
            this.message = response.message;
        }
    }
    static isError(error: Error) {
        if (error == undefined) return false
        return (error.name == JABCError.NAME)
    }

    public toJSON() {
        return {
            message: this.message,
            responseCode: this.responseCode,
            debugMessage: this.debugMessage,
            type: this.type
        };
    }
}

export class JABCSuccess implements IApiResponse {
    message: string;
    responseCode: number;
    type: IApiResponse.TypeEnum;

    constructor(response: JABCResponseType, message: string) {
        this.message = message;
        this.responseCode = response.success;
        this.type = IApiResponse.TypeEnum.SUCCESS;
        Error.captureStackTrace(this, JABCError)
    }

    static isSuccess(success: any) {
        if (success == undefined) return false
        if (success.hasOwnProperty('responseCode')) {
            return (success.responseCode > 200 && success.responseCode < 300)
        }
        return false
    }
}

export async function ErrorHandler(err: any, req: any, res: any, next: any) {
    if (err) {
        var debugMessage = null;
        if (err.failedValidation) {
            if(err.results !== undefined){
                debugMessage = JSON.stringify({
                    code: err.code,
                    errors: err.results.errors,
                    path: err.path,
                    paramName: err.paramName
                });
            }else{
                debugMessage = debugMessage = JSON.stringify({
                    code: err.code,
                    path: err.path,
                    paramName: err.paramName
                });
            }
        }else{
            debugMessage = debugMessage = JSON.stringify({
                code: err.code
            });
        }
        let error = new JABCError(JABCResponse.BAD_REQUEST)
        if (DEBUG)
            error.debugMessage = debugMessage;
        utils.writeJson(res, error, error.responseCode)
    } else {
        next()
    }
}