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
export namespace JABCResponse{
    export type ValidatorCodes = 'SCHEMA_VALIDATION_FAILED' |'OBJECT_MISSING_REQUIRED_PROPERTY' |'INVALID_TYPE' |'INVALID_FORMAT'  ;
    export const ValidatorCodes = {
        SCHEMA: 'SCHEMA_VALIDATION_FAILED',
        MISSING: 'OBJECT_MISSING_REQUIRED_PROPERTY',
        TYPE: 'INVALID_TYPE',
        FORMAT: 'INVALID_FORMAT',
        MAXIMUM: 'MAXIMUM',
        MINIMUM: 'MINIMUM'
    };
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
        if ((this.responseCode < JABCResponse.NOT_FOUND.error || this.responseCode == JABCResponse.UNHANDLED_ERROR.error) && this.responseCode != JABCResponse.BAD_REQUEST.error) {
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

export function PreValidator(req: any, res: any, next: any){
    // Delete any null value
    req.body = utils.deleteDeepNulls(req.body)
    next()
}

export function ErrorHandler(err: any, req: any, res: any, next: any) {
    if (err) {
        var debugMessage = null;
        var message = JABCResponse.BAD_REQUEST.message;
        if (err.failedValidation) {
            if(err.results !== undefined){
                let missingProperties = []
                let invalidProperties = []
                let typeProperties = []
                let minProperties = []
                let maxProperties = []
                for(let error of err.results.errors){
                    switch(error.code){
                        case JABCResponse.ValidatorCodes.MISSING:
                            missingProperties.push(error.message.split(":")[1].trim())
                        break;
                        case JABCResponse.ValidatorCodes.FORMAT:
                            invalidProperties.push(error.path[0])
                        break;
                        case JABCResponse.ValidatorCodes.TYPE:
                            typeProperties.push(error.path[0])
                        break;
                        case JABCResponse.ValidatorCodes.MINIMUM:
                            minProperties.push(error.path[0])
                        break;
                        case JABCResponse.ValidatorCodes.MAXIMUM:
                            maxProperties.push(error.path[0])
                        break;
                    }
                }
                let messages = []
                if(missingProperties.length>0) messages.push(`${(missingProperties.length==1)? 'Property' : 'Properties'}: ${missingProperties.join(", ")}, ${(missingProperties.length==1)? 'is' : 'are'} missing`)
                if(invalidProperties.length>0) messages.push(`${(invalidProperties.length==1)? 'Property' : 'Properties'}: ${invalidProperties.join(", ")}, have an invalid format`)
                if(typeProperties.length>0) messages.push(`${(typeProperties.length==1)? 'Property' : 'Properties'}: ${typeProperties.join(", ")}, have an invalid type`)
                if(minProperties.length>0) messages.push(`${(minProperties.length==1)? 'Property' : 'Properties'}: ${minProperties.join(", ")}, have a value that exceeded the minimum limit`)
                if(maxProperties.length>0) messages.push(`${(maxProperties.length==1)? 'Property' : 'Properties'}: ${maxProperties.join(", ")}, have a value that exceeded the maximum limit`)
                
                message = `${messages.join('; ')}.`;
            }else{
                debugMessage = {
                    code: err.code,
                    path: err.path,
                    paramName: err.paramName
                };
            }
        }else if(err.type == 'entity.parse.failed'){
            message = 'Please send the data in a correct JSON format'
        }else{
            debugMessage = err;
        }
        let error = new JABCError(JABCResponse.BAD_REQUEST, message)
        if (DEBUG)
            error.debugMessage = JSON.stringify(debugMessage);
        utils.writeJson(res, error, error.responseCode)
    } else {
        next()
    }
}