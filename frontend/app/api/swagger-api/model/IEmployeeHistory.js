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
import IRole from './IRole';





/**
* The IEmployeeHistory model module.
* @module model/IEmployeeHistory
* @version 1.0.0
*/
export default class IEmployeeHistory {
    /**
    * Constructs a new <code>IEmployeeHistory</code>.
    * An Employee contains all the current information of a current or onboarding employee 
    * @alias module:model/IEmployeeHistory
    * @class
    * @param id {Number} The unique identifier of the Employee
    * @param sin {String} 
    * @param email {String} 
    * @param password {String} 
    * @param firstname {String} 
    * @param lastname {String} 
    * @param fte {Number} 
    * @param status {Number} 
    * @param adminLevel {Number} 
    * @param version {Number} The number of the version of the Employee data
    * @param fkCreator {Number} The unique identifier of the Employee that updated the data of the Employee
    * @param createdDate {Number} The unix timestamp of the date the creation of this version of the employee data
    */

    constructor(id, sin, email, password, firstname, lastname, fte, status, adminLevel, version, fkCreator, createdDate) {
        

        
        

        this['id'] = id;this['sin'] = sin;this['email'] = email;this['password'] = password;this['firstname'] = firstname;this['lastname'] = lastname;this['fte'] = fte;this['status'] = status;this['adminLevel'] = adminLevel;this['version'] = version;this['fkCreator'] = fkCreator;this['createdDate'] = createdDate;

        
    }

    /**
    * Constructs a <code>IEmployeeHistory</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/IEmployeeHistory} obj Optional instance to populate.
    * @return {module:model/IEmployeeHistory} The populated <code>IEmployeeHistory</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IEmployeeHistory();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('sin')) {
                obj['sin'] = ApiClient.convertToType(data['sin'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
            if (data.hasOwnProperty('firstname')) {
                obj['firstname'] = ApiClient.convertToType(data['firstname'], 'String');
            }
            if (data.hasOwnProperty('lastname')) {
                obj['lastname'] = ApiClient.convertToType(data['lastname'], 'String');
            }
            if (data.hasOwnProperty('fte')) {
                obj['fte'] = ApiClient.convertToType(data['fte'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Number');
            }
            if (data.hasOwnProperty('adminLevel')) {
                obj['adminLevel'] = ApiClient.convertToType(data['adminLevel'], 'Number');
            }
            if (data.hasOwnProperty('version')) {
                obj['version'] = ApiClient.convertToType(data['version'], 'Number');
            }
            if (data.hasOwnProperty('fkCreator')) {
                obj['fkCreator'] = ApiClient.convertToType(data['fkCreator'], 'Number');
            }
            if (data.hasOwnProperty('createdDate')) {
                obj['createdDate'] = ApiClient.convertToType(data['createdDate'], 'Number');
            }
            if (data.hasOwnProperty('salary')) {
                obj['salary'] = ApiClient.convertToType(data['salary'], 'Number');
            }
            if (data.hasOwnProperty('address')) {
                obj['address'] = ApiClient.convertToType(data['address'], 'String');
            }
            if (data.hasOwnProperty('birthdate')) {
                obj['birthdate'] = ApiClient.convertToType(data['birthdate'], 'Number');
            }
            if (data.hasOwnProperty('dateJoined')) {
                obj['dateJoined'] = ApiClient.convertToType(data['dateJoined'], 'Number');
            }
            if (data.hasOwnProperty('vacationDays')) {
                obj['vacationDays'] = ApiClient.convertToType(data['vacationDays'], 'Number');
            }
            if (data.hasOwnProperty('remainingVacationDays')) {
                obj['remainingVacationDays'] = ApiClient.convertToType(data['remainingVacationDays'], 'Number');
            }
            if (data.hasOwnProperty('fkRole')) {
                obj['fkRole'] = ApiClient.convertToType(data['fkRole'], 'Number');
            }
            if (data.hasOwnProperty('phoneNumber')) {
                obj['phoneNumber'] = ApiClient.convertToType(data['phoneNumber'], 'String');
            }
            if (data.hasOwnProperty('role')) {
                obj['role'] = IRole.constructFromObject(data['role']);
            }
        }
        return obj;
    }

    /**
    * The unique identifier of the Employee
    * @member {Number} id
    */
    id = undefined;
    /**
    * @member {String} sin
    */
    sin = undefined;
    /**
    * @member {String} email
    */
    email = undefined;
    /**
    * @member {String} password
    */
    password = undefined;
    /**
    * @member {String} firstname
    */
    firstname = undefined;
    /**
    * @member {String} lastname
    */
    lastname = undefined;
    /**
    * @member {Number} fte
    */
    fte = undefined;
    /**
    * @member {Number} status
    */
    status = undefined;
    /**
    * @member {Number} adminLevel
    */
    adminLevel = undefined;
    /**
    * The number of the version of the Employee data
    * @member {Number} version
    */
    version = undefined;
    /**
    * The unique identifier of the Employee that updated the data of the Employee
    * @member {Number} fkCreator
    */
    fkCreator = undefined;
    /**
    * The unix timestamp of the date the creation of this version of the employee data
    * @member {Number} createdDate
    */
    createdDate = undefined;
    /**
    * @member {Number} salary
    */
    salary = undefined;
    /**
    * @member {String} address
    */
    address = undefined;
    /**
    * The unix timestamp of the birthdate of the employee
    * @member {Number} birthdate
    */
    birthdate = undefined;
    /**
    * The unix timestamp of the date joined of the employee
    * @member {Number} dateJoined
    */
    dateJoined = undefined;
    /**
    * The number of vacation days allowed to the employee per year
    * @member {Number} vacationDays
    */
    vacationDays = undefined;
    /**
    * The number of vacation days allowed to the employee on the current year
    * @member {Number} remainingVacationDays
    */
    remainingVacationDays = undefined;
    /**
    * Foreign key of the role
    * @member {Number} fkRole
    */
    fkRole = undefined;
    /**
    * @member {String} phoneNumber
    */
    phoneNumber = undefined;
    /**
    * @member {module:model/IRole} role
    */
    role = undefined;








}


