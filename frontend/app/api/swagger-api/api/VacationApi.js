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


import ApiClient from "../ApiClient";
import IApiResponse from '../model/IApiResponse';
import IVacation from '../model/IVacation';

/**
* Vacation service.
* @module api/VacationApi
* @version 1.0.0
*/
export default class VacationApi {

    /**
    * Constructs a new VacationApi. 
    * @alias module:api/VacationApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * deletes Vacation
     * Will delete the Vacation that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched Vacation
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    deleteVacationWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteVacation");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
        'X-Auth-Token': opts['xAuthToken']
      };
      let formParams = {
      };

      let authNames = ['AuthToken'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = IApiResponse;

      return this.apiClient.callApi(
        '/vacation/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * deletes Vacation
     * Will delete the Vacation that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched Vacation
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    deleteVacation(id, opts) {
      return this.deleteVacationWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * gets an specific Vacation
     * Will return the Vacation that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched Vacation
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IVacation} and HTTP response
     */
    getVacationWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getVacation");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
        'X-Auth-Token': opts['xAuthToken']
      };
      let formParams = {
      };

      let authNames = ['AuthToken'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = IVacation;

      return this.apiClient.callApi(
        '/vacation/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific Vacation
     * Will return the Vacation that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched Vacation
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IVacation}
     */
    getVacation(id, opts) {
      return this.getVacationWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * updates the Vacation
     * Will update an Vacation with the provided data in body  if the Vacation matches the [id] 
     * @param {Number} id id of the searched Vacation
     * @param {module:model/IVacation} vacation Vacation data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    updateVacationWithHttpInfo(id, vacation, opts) {
      opts = opts || {};
      let postBody = vacation;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateVacation");
      }

      // verify the required parameter 'vacation' is set
      if (vacation === undefined || vacation === null) {
        throw new Error("Missing the required parameter 'vacation' when calling updateVacation");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
        'X-Auth-Token': opts['xAuthToken']
      };
      let formParams = {
      };

      let authNames = ['AuthToken'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = IApiResponse;

      return this.apiClient.callApi(
        '/vacation/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * updates the Vacation
     * Will update an Vacation with the provided data in body  if the Vacation matches the [id] 
     * @param {Number} id id of the searched Vacation
     * @param {module:model/IVacation} vacation Vacation data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    updateVacation(id, vacation, opts) {
      return this.updateVacationWithHttpInfo(id, vacation, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
