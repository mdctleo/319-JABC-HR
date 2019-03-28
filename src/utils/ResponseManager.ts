import { IApiResponse } from '../model/models'
import Log from '../../util/Log';

const DEBUG = process.env.DEBUG;

export interface JABCResponseType {
    error?: number,
    success?: number,
    message?: string
}

export class JABCResponse {
    static EMPLOYEE = {
        error: 422,
        success: 200
    }
    static ONBOARDING = {
        error: 422,
        success: 200
    }
    static PERFORMANCE = {
        error: 422,
        success: 200
    }
    static ROLE = {
        error: 422,
        success: 200
    }
    static VACATION = {
        error: 422,
        success: 200
    }
    static COMPETENCY = {
        error: 422,
        success: 200
    }

    static UNHANDLED_ERROR = {
        error: 500,
        message: 'Sorry there was a problem, try again later. If the problem persists, comunicate with the site manager.'
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
export namespace JABCResponse {
    export type ValidatorCodes = 'SCHEMA_VALIDATION_FAILED' | 'OBJECT_MISSING_REQUIRED_PROPERTY' | 'INVALID_TYPE' | 'INVALID_FORMAT';
    export const ValidatorCodes = {
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

export function PreValidator(req: any, res: any, next: any) {
    // Delete any null value
    req.body = deleteDeepNulls(req.body)
    next()
}

export function ErrorHandler(err: any, req: any, res: any, next: any) {
    if (err) {
        var debugMessage = null;
        var message = JABCResponse.BAD_REQUEST.message;
        if (err.failedValidation) {
            if (err.results !== undefined) {
                let missingProperties = []
                let invalidProperties = []
                let typeProperties = []
                let importantMessage = false
                for (let error of err.results.errors) {
                    let property;
                    try {
                        property = error.description.split(',')[0]
                    } catch (errr) {
                        importantMessage = true;
                        break;
                    }

                    switch (error.code) {
                        case JABCResponse.ValidatorCodes.MISSING:
                            missingProperties.push(error.message.split(":")[1].trim())
                            break;
                        case JABCResponse.ValidatorCodes.FORMAT:
                            invalidProperties.push(property)
                            break;
                        case JABCResponse.ValidatorCodes.TYPE:
                            typeProperties.push(property)
                            break;
                        case JABCResponse.ValidatorCodes.MINIMUM:
                            message = error.message.replace('Value', `Property ${property} with value,`);
                            importantMessage = true
                            break
                        case JABCResponse.ValidatorCodes.MAXIMUM:
                            message = error.message.replace('Value', `Property ${property} with value,`);
                            importantMessage = true
                            break
                        case JABCResponse.ValidatorCodes.MIN_LENGTH:
                            message = error.message.replace('String', `Property ${property}`);
                            importantMessage = true
                            break
                        case JABCResponse.ValidatorCodes.MAX_LENGTH:
                            message = error.message.replace('String', `Property ${property}`);
                            importantMessage = true
                            break
                        case JABCResponse.ValidatorCodes.PATTERN:
                            message = error.message.replace('String', `Property ${property}`);
                            importantMessage = true
                            if (error.path[0] === 'password') {
                                message = `Property password, does not meet the requirements for a good password.\n Please use at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character [#,?,!,@,$,%,^,&,*,-,:,_,+,¿,¡,¬]`;
                            }
                            break
                    }
                }
                if (!importantMessage) {
                    let messages = []
                    if (missingProperties.length > 0) messages.push(`${(missingProperties.length == 1) ? 'Property' : 'Properties'}: ${missingProperties.join(", ")}, ${(missingProperties.length == 1) ? 'is' : 'are'} missing`)
                    if (invalidProperties.length > 0) messages.push(`${(invalidProperties.length == 1) ? 'Property' : 'Properties'}: ${invalidProperties.join(", ")}, have an invalid format`)
                    if (typeProperties.length > 0) messages.push(`${(typeProperties.length == 1) ? 'Property' : 'Properties'}: ${typeProperties.join(", ")}, have an invalid type`)

                    message = `${messages.join('; ')}.`;
                }
            } else {
                debugMessage = {
                    code: err.code,
                    path: err.path,
                    paramName: err.paramName
                };
            }
        } else if (err.type == 'entity.parse.failed') {
            message = 'Please send the data in a correct JSON format'
        } else {
            debugMessage = err;
        }
        let error = new JABCError(JABCResponse.BAD_REQUEST, message)
        if (DEBUG)
            error.debugMessage = JSON.stringify(debugMessage);
        RespondJson(res, error, error.responseCode)
    } else {
        next()
    }
}

// ########################### Response handler

export class ResponsePayload {
    code: any;
    payload: any;

    constructor(code: any, payload: any) {
        this.code = code;
        this.payload = payload;
    }
}

export function RespondWithCode(code: any, payload: any) {
    return new ResponsePayload(code, payload);
}

export function RespondJson(response: any, arg1: any, arg2?: any) {
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
        // if no response code given, we default to 200
        code = 200;
    }
    if (typeof payload === 'object') {
        deleteDeepNulls(payload)
        payload = JSON.stringify(payload, null, 2);
        if(payload === '{}'){
            payload = JSON.stringify(new JABCError(JABCResponse.UNHANDLED_ERROR), null, 2)
        }
    }
    response.writeHead(code, { 'Content-Type': 'application/json' });
    response.end(payload);
}

export function RespondFile(response: any, file: any, code: any = 200) {
    response.writeHead(code, {'Content-Type': file.mimetype });
    response.end(file.buffer, 'binary');
}

export function deleteDeepNulls(data: any) {
    if (typeof data === 'object') {
        Object.keys(data).forEach((key) => {
            if (data[key] == null || (typeof data[key] === 'number' && isNaN(data[key]))) {
                delete data[key]
            } else {
                deleteDeepNulls(data[key])
            }
        });
    }
    return data
}

export function deleteNulls(data: any) {
    Object.keys(data).forEach((key) => (data[key] == null || (typeof data[key] === 'number' && isNaN(data[key]))) && delete data[key]);
    return data
}

export function deleteNullsArray(arr: any) {
    let newArr = []
    for (let obj of arr) {
        obj = deleteNulls(obj)
        newArr.push(obj)
    }
    return newArr
}