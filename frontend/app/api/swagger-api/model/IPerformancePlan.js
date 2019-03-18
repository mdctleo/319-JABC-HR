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
import IComment from './IComment';
import IPerformanceSection from './IPerformanceSection';





/**
* The IPerformancePlan model module.
* @module model/IPerformancePlan
* @version 1.0.0
*/
export default class IPerformancePlan {
    /**
    * Constructs a new <code>IPerformancePlan</code>.
    * PerformancePlan contains info of the sections of a performance plan of an employee 
    * @alias module:model/IPerformancePlan
    * @class
    * @param id {Number} The unique identifier of the Performance
    * @param fkEmployee {Number} Foreign key of the employee with this performance review
    * @param _date {Number} The unix timestamp of the date the performance review was created
    * @param status {Number} 
    */

    constructor(id, fkEmployee, _date, status) {
        

        
        

        this['id'] = id;this['fkEmployee'] = fkEmployee;this['date'] = _date;this['status'] = status;

        
    }

    /**
    * Constructs a <code>IPerformancePlan</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/IPerformancePlan} obj Optional instance to populate.
    * @return {module:model/IPerformancePlan} The populated <code>IPerformancePlan</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IPerformancePlan();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('fkEmployee')) {
                obj['fkEmployee'] = ApiClient.convertToType(data['fkEmployee'], 'Number');
            }
            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Number');
            }
            if (data.hasOwnProperty('sections')) {
                obj['sections'] = ApiClient.convertToType(data['sections'], [IPerformanceSection]);
            }
            if (data.hasOwnProperty('comments')) {
                obj['comments'] = ApiClient.convertToType(data['comments'], [IComment]);
            }
        }
        return obj;
    }

    /**
    * The unique identifier of the Performance
    * @member {Number} id
    */
    id = undefined;
    /**
    * Foreign key of the employee with this performance review
    * @member {Number} fkEmployee
    */
    fkEmployee = undefined;
    /**
    * The unix timestamp of the date the performance review was created
    * @member {Number} date
    */
    date = undefined;
    /**
    * @member {Number} status
    */
    status = undefined;
    /**
    * Contains all the IPerformanceSections Related to this IPerformancePlan
    * @member {Array.<module:model/IPerformanceSection>} sections
    */
    sections = undefined;
    /**
    * Contains all the comments of this performance review
    * @member {Array.<module:model/IComment>} comments
    */
    comments = undefined;








}

