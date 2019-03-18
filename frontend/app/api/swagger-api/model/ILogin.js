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
 *
 */


import ApiClient from '../ApiClient';





/**
* The ILogin model module.
* @module model/ILogin
* @version 1.0.0
*/
export default class ILogin {
    /**
    * Constructs a new <code>ILogin</code>.
    * Represents the basic info to logged into the system
    * @alias module:model/ILogin
    * @class
    * @param email {String} 
    * @param password {String} 
    */

    constructor(email, password) {
        

        
        

        this['email'] = email;this['password'] = password;

        
    }

    /**
    * Constructs a <code>ILogin</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/ILogin} obj Optional instance to populate.
    * @return {module:model/ILogin} The populated <code>ILogin</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ILogin();

            
            
            

            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
        }
        return obj;
    }

    /**
    * @member {String} email
    */
    email = undefined;
    /**
    * @member {String} password
    */
    password = undefined;








}

