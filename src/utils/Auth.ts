import {JABCError, JABCResponse } from './ResponseManager';
import DatabaseClient from '../database/Database';
import * as EmployeeService from '../service/EmployeeService';
const utils = require('./writer.js');

export default async function(req: any, res: any, next: any){
    if(req.swagger === undefined) { next(); return; }
    if(req.swagger.operation === undefined) { next(); return; }
    if(req.swagger.operation.security === undefined && req.swagger.operation.operationId !== 'login') { next(); return; }

    let securityOptions = req.swagger.operation.security;
    try{
        await Validate_AuthToken(req, res, securityOptions)
        next();
    }catch(err){
        utils.writeJson(res, err, err.responseCode);
        res.end()
    } 
}

function IsRequired(securityOptions: any, checker: any){
    if(securityOptions == undefined) return false;
    // Check if security is required for the endpoint
    var required = false;
    for(let securityOption of securityOptions){
        if (checker(securityOption)){
            required = true;
            break;
        }
    }
    return required;
}

// Validate X-AuthToken
function Validate_AuthToken(req: any, res: any, securityOptions: any){
    return new Promise((resolve, reject) => {
        let isLogin = req.swagger.operation.operationId === 'login'
        let isRequired = IsRequired(securityOptions, (securityOption: any) => {
            return Object.keys(securityOption).includes('AuthToken')
        })
        // Check if security is required for the endpoint
        if(!isRequired && !isLogin ){
            resolve();
            return;
        }
        // Auth Token header authorization
        let token = req.swagger.params['X-Auth-Token'].value;
        EmployeeService.Auth(token)
        .then( (loginResponse) => {
            if(isLogin){
                // The token is used to recover user info
                utils.writeJson(res, loginResponse)
                res.end()
            }else{
                resolve();
            }
        })
        .catch( (error: any) =>{
            if(isLogin ){
                resolve();
            }else{
                reject(error);
            }
        })
    })
}