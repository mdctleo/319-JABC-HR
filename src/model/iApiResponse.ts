/**
 * JABC
 * This API provides all the functions needed to manage  the JABC HR system. 
 *
 * OpenAPI spec version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface IApiResponse { 
    responseCode: number;
    type: IApiResponse.TypeEnum;
    message: string;
    debugMessage?: string;
}
export namespace IApiResponse {
    export type TypeEnum = 'ERROR' | 'SUCCESS';
    export const TypeEnum = {
        ERROR: 'ERROR' as TypeEnum,
        SUCCESS: 'SUCCESS' as TypeEnum
    };
}