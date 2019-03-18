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
import IDocumentType from './IDocumentType';





/**
* The IOnboardingTask model module.
* @module model/IOnboardingTask
* @version 1.0.0
*/
export default class IOnboardingTask {
    /**
    * Constructs a new <code>IOnboardingTask</code>.
    * An onboarding task required for the onbarding proccess of a new Employee, if the property [requireDoc] is set to 1, then the OnboardingTask require the employee to upload a document, and the fkDocumentType will  contain the id of the IDocumentType object with the template of the document to be filled by the employee.  Otherwise the [fkDocumentType] property will be null. 
    * @alias module:model/IOnboardingTask
    * @class
    * @param id {Number} The unique identifier of the Role
    * @param fkEmployee {Number} The foreign key  of the Employee that needs to upload this Document
    * @param createdDate {Number} The unix timestamp of the created date of this Document
    * @param dueDate {Number} The unix timestamp of the due date of this Document
    * @param requireDoc {Number} Wether the Onboarding task requires document upload or not.
    */

    constructor(id, fkEmployee, createdDate, dueDate, requireDoc) {
        

        
        

        this['id'] = id;this['fkEmployee'] = fkEmployee;this['createdDate'] = createdDate;this['dueDate'] = dueDate;this['requireDoc'] = requireDoc;

        
    }

    /**
    * Constructs a <code>IOnboardingTask</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/IOnboardingTask} obj Optional instance to populate.
    * @return {module:model/IOnboardingTask} The populated <code>IOnboardingTask</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IOnboardingTask();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('fkDocumentType')) {
                obj['fkDocumentType'] = ApiClient.convertToType(data['fkDocumentType'], 'Number');
            }
            if (data.hasOwnProperty('fkEmployee')) {
                obj['fkEmployee'] = ApiClient.convertToType(data['fkEmployee'], 'Number');
            }
            if (data.hasOwnProperty('createdDate')) {
                obj['createdDate'] = ApiClient.convertToType(data['createdDate'], 'Number');
            }
            if (data.hasOwnProperty('dueDate')) {
                obj['dueDate'] = ApiClient.convertToType(data['dueDate'], 'Number');
            }
            if (data.hasOwnProperty('requireDoc')) {
                obj['requireDoc'] = ApiClient.convertToType(data['requireDoc'], 'Number');
            }
            if (data.hasOwnProperty('expiryDate')) {
                obj['expiryDate'] = ApiClient.convertToType(data['expiryDate'], 'Number');
            }
            if (data.hasOwnProperty('file')) {
                obj['file'] = ApiClient.convertToType(data['file'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = IDocumentType.constructFromObject(data['type']);
            }
        }
        return obj;
    }

    /**
    * The unique identifier of the Role
    * @member {Number} id
    */
    id = undefined;
    /**
    * The foreign key  of the DocumentType of this Document
    * @member {Number} fkDocumentType
    */
    fkDocumentType = undefined;
    /**
    * The foreign key  of the Employee that needs to upload this Document
    * @member {Number} fkEmployee
    */
    fkEmployee = undefined;
    /**
    * The unix timestamp of the created date of this Document
    * @member {Number} createdDate
    */
    createdDate = undefined;
    /**
    * The unix timestamp of the due date of this Document
    * @member {Number} dueDate
    */
    dueDate = undefined;
    /**
    * Wether the Onboarding task requires document upload or not.
    * @member {Number} requireDoc
    */
    requireDoc = undefined;
    /**
    * The unix timestamp of the expiry date of this Document
    * @member {Number} expiryDate
    */
    expiryDate = undefined;
    /**
    * The link to the file
    * @member {String} file
    */
    file = undefined;
    /**
    * @member {String} description
    */
    description = undefined;
    /**
    * @member {module:model/IDocumentType} type
    */
    type = undefined;








}

