import {IApiResponse} from '../model/models'


export interface JABCResponseType{
    error?: number,
    success?: number,
    message?: string
}

export class JABCResponse {
    static EMPLOYEE = {
        error: 410,
        success: 210
    }
    static DOCUMENT = {
        error: 411,
        success: 211
    }
    static PERFORMANCE = {
        error: 412,
        success: 212
    }
    static ROLE = {
        error: 413,
        success: 213
    }
    static VACATION = {
        error: 414,
        success: 214
    }
    static UNHANDLED = {
        error: 400,
        success: 200,
        message: ''
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
}

export class JABCError extends Error implements IApiResponse {

    static NAME = 'JABCError';
    message: string;
    responseCode: number;
    debugMessage: string;
    type: IApiResponse.TypeEnum;

    constructor(response: JABCResponseType, ...args: any) {
        super(...args)
        console.log(this as Error)
        this.name = JABCError.NAME;
        this.message = args[0]
        this.responseCode = response.error;
        this.debugMessage = this.stack;
        this.type = IApiResponse.TypeEnum.ERROR;
        Error.captureStackTrace(this, JABCError)
        if(this.responseCode < JABCResponse.NOT_FOUND.error){
            this.message = response.message;
        }
    }
    static isError(error: Error){
        if(error == undefined) return false
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

    static isSuccess(success: any){
        if(success == undefined) return false
        if(success.hasOwnProperty('responseCode')){
            return (success.responseCode > 200 && success.responseCode < 300)
        }
        return false
    }
}