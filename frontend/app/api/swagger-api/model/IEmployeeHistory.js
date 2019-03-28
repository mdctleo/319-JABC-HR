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
    * Employee, contains all the current information of a current or onboarding employee 
    * @alias module:model/IEmployeeHistory
    * @class
    * @param sin {Number} SIN, the social insurance number of an employee
    * @param email {String} email, used to sign into the system
    * @param firstname {String} first name, of an employee
    * @param lastname {String} last name, of an employee
    * @param fte {Number} FTE, this determines if an employee is working full time or not
    * @param status {Number} status, it can be active | inactive | onboarding | probation
    * @param adminLevel {Number} admin level, this restricts the access of the user to the system
    * @param version {Number} version of employee data, at some point
    * @param fkCreator {Number} creator ID, the unique identifier of the Employee that updated the data of the Employee
    * @param createdDate {Date} date of creation, of this version of the employee data
    */

    constructor(sin, email, firstname, lastname, fte, status, adminLevel, version, fkCreator, createdDate) {
        

        
        

        this['sin'] = sin;this['email'] = email;this['firstname'] = firstname;this['lastname'] = lastname;this['fte'] = fte;this['status'] = status;this['adminLevel'] = adminLevel;this['version'] = version;this['fkCreator'] = fkCreator;this['createdDate'] = createdDate;

        
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
                obj['sin'] = ApiClient.convertToType(data['sin'], 'Number');
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
                obj['createdDate'] = ApiClient.convertToType(data['createdDate'], 'Date');
            }
            if (data.hasOwnProperty('salary')) {
                obj['salary'] = ApiClient.convertToType(data['salary'], 'Number');
            }
            if (data.hasOwnProperty('address')) {
                obj['address'] = ApiClient.convertToType(data['address'], 'String');
            }
            if (data.hasOwnProperty('birthdate')) {
                obj['birthdate'] = ApiClient.convertToType(data['birthdate'], 'Date');
            }
            if (data.hasOwnProperty('dateJoined')) {
                obj['dateJoined'] = ApiClient.convertToType(data['dateJoined'], 'Date');
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
    * employee ID, the unique identifier of the Employee
    * @member {Number} id
    */
    id = undefined;
    /**
    * SIN, the social insurance number of an employee
    * @member {Number} sin
    */
    sin = undefined;
    /**
    * email, used to sign into the system
    * @member {String} email
    */
    email = undefined;
    /**
    * password, used to sign into the system
    * @member {String} password
    */
    password = undefined;
    /**
    * first name, of an employee
    * @member {String} firstname
    */
    firstname = undefined;
    /**
    * last name, of an employee
    * @member {String} lastname
    */
    lastname = undefined;
    /**
    * FTE, this determines if an employee is working full time or not
    * @member {Number} fte
    */
    fte = undefined;
    /**
    * status, it can be active | inactive | onboarding | probation
    * @member {Number} status
    */
    status = undefined;
    /**
    * admin level, this restricts the access of the user to the system
    * @member {Number} adminLevel
    */
    adminLevel = undefined;
    /**
    * version of employee data, at some point
    * @member {Number} version
    */
    version = undefined;
    /**
    * creator ID, the unique identifier of the Employee that updated the data of the Employee
    * @member {Number} fkCreator
    */
    fkCreator = undefined;
    /**
    * date of creation, of this version of the employee data
    * @member {Date} createdDate
    */
    createdDate = undefined;
    /**
    * salary, this is how much an employee earn per month
    * @member {Number} salary
    */
    salary = undefined;
    /**
    * address, where does the employee live
    * @member {String} address
    */
    address = undefined;
    /**
    * birthdate, of the employee
    * @member {Date} birthdate
    */
    birthdate = undefined;
    /**
    * date joined, of the employee
    * @member {Date} dateJoined
    */
    dateJoined = undefined;
    /**
    * total vacation days, allowed to the employee per year
    * @member {Number} vacationDays
    */
    vacationDays = undefined;
    /**
    * remaining vacation days, allowed to the employee on the current year
    * @member {Number} remainingVacationDays
    */
    remainingVacationDays = undefined;
    /**
    * role ID, Foreign key of the role
    * @member {Number} fkRole
    */
    fkRole = undefined;
    /**
    * phone number, of an employee
    * @member {String} phoneNumber
    */
    phoneNumber = undefined;
    /**
    * @member {module:model/IRole} role
    */
    role = undefined;








}


