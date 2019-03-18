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
* The IVacation model module.
* @module model/IVacation
* @version 1.0.0
*/
export default class IVacation {
    /**
    * Constructs a new <code>IVacation</code>.
    * A Vacation contains info of the employee asking for a vaction period 
    * @alias module:model/IVacation
    * @class
    * @param id {Number} The unique identifier of the Vacation
    * @param fkEmployee {Number} The unique identifier of the Employee that requests the vacation
    * @param requestedDays {Number} The number of vacation days the employee requested
    * @param requestedStatus {Number} 
    * @param _date {Number} The unix timestamp of the date when the employee requested the vacation
    */

    constructor(id, fkEmployee, requestedDays, requestedStatus, _date) {
        

        
        

        this['id'] = id;this['fkEmployee'] = fkEmployee;this['requestedDays'] = requestedDays;this['requestedStatus'] = requestedStatus;this['date'] = _date;

        
    }

    /**
    * Constructs a <code>IVacation</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/IVacation} obj Optional instance to populate.
    * @return {module:model/IVacation} The populated <code>IVacation</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IVacation();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('fkEmployee')) {
                obj['fkEmployee'] = ApiClient.convertToType(data['fkEmployee'], 'Number');
            }
            if (data.hasOwnProperty('fkApprover')) {
                obj['fkApprover'] = ApiClient.convertToType(data['fkApprover'], 'Number');
            }
            if (data.hasOwnProperty('requestedDays')) {
                obj['requestedDays'] = ApiClient.convertToType(data['requestedDays'], 'Number');
            }
            if (data.hasOwnProperty('requestedStatus')) {
                obj['requestedStatus'] = ApiClient.convertToType(data['requestedStatus'], 'Number');
            }
            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Number');
            }
        }
        return obj;
    }

    /**
    * The unique identifier of the Vacation
    * @member {Number} id
    */
    id = undefined;
    /**
    * The unique identifier of the Employee that requests the vacation
    * @member {Number} fkEmployee
    */
    fkEmployee = undefined;
    /**
    * The unique identifier of the Employee that approves the vacation request
    * @member {Number} fkApprover
    */
    fkApprover = undefined;
    /**
    * The number of vacation days the employee requested
    * @member {Number} requestedDays
    */
    requestedDays = undefined;
    /**
    * @member {Number} requestedStatus
    */
    requestedStatus = undefined;
    /**
    * The unix timestamp of the date when the employee requested the vacation
    * @member {Number} date
    */
    date = undefined;








}

