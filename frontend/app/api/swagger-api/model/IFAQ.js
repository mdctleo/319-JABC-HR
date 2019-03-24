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
* The IFAQ model module.
* @module model/IFAQ
* @version 1.0.0
*/
export default class IFAQ {
    /**
    * Constructs a new <code>IFAQ</code>.
    * A FAQ contains a question and answer, to help the employee while onboarding 
    * @alias module:model/IFAQ
    * @class
    * @param question {String} 
    * @param answer {String} 
    */

    constructor(question, answer) {
        

        
        

        this['question'] = question;this['answer'] = answer;

        
    }

    /**
    * Constructs a <code>IFAQ</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/IFAQ} obj Optional instance to populate.
    * @return {module:model/IFAQ} The populated <code>IFAQ</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IFAQ();

            
            
            

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('question')) {
                obj['question'] = ApiClient.convertToType(data['question'], 'String');
            }
            if (data.hasOwnProperty('answer')) {
                obj['answer'] = ApiClient.convertToType(data['answer'], 'String');
            }
        }
        return obj;
    }

    /**
    * The unique identifier of the FAQ
    * @member {Number} id
    */
    id = undefined;
    /**
    * @member {String} question
    */
    question = undefined;
    /**
    * @member {String} answer
    */
    answer = undefined;








}


