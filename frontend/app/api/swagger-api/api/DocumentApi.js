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
import IDocument from '../model/IDocument';
import IDocumentType from '../model/IDocumentType';

/**
* Document service.
* @module api/DocumentApi
* @version 1.0.0
*/
export default class DocumentApi {

    /**
    * Constructs a new DocumentApi. 
    * @alias module:api/DocumentApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * creates a new DocumentType
     * Will create a new DocumentType with the provided data in body
     * @param {module:model/IDocumentType} documentType DocumentType data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    createDocumentTypeWithHttpInfo(documentType, opts) {
      opts = opts || {};
      let postBody = documentType;

      // verify the required parameter 'documentType' is set
      if (documentType === undefined || documentType === null) {
        throw new Error("Missing the required parameter 'documentType' when calling createDocumentType");
      }


      let pathParams = {
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
        '/document/type', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * creates a new DocumentType
     * Will create a new DocumentType with the provided data in body
     * @param {module:model/IDocumentType} documentType DocumentType data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    createDocumentType(documentType, opts) {
      return this.createDocumentTypeWithHttpInfo(documentType, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * deletes Document
     * Will delete the Document that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched Document
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    deleteDocumentWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteDocument");
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
        '/document/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * deletes Document
     * Will delete the Document that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched Document
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    deleteDocument(id, opts) {
      return this.deleteDocumentWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * deletes DocumentType
     * Will delete an DocumentType if the DocumentType matches the [id]
     * @param {Number} id id of the DocumentType to be deleted
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    deleteDocumentTypeWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteDocumentType");
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
        '/document/type/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * deletes DocumentType
     * Will delete an DocumentType if the DocumentType matches the [id]
     * @param {Number} id id of the DocumentType to be deleted
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    deleteDocumentType(id, opts) {
      return this.deleteDocumentTypeWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * gets an specific Document
     * Will return the Document that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched Document
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IDocument} and HTTP response
     */
    getDocumentWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getDocument");
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
      let returnType = IDocument;

      return this.apiClient.callApi(
        '/document/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific Document
     * Will return the Document that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched Document
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IDocument}
     */
    getDocument(id, opts) {
      return this.getDocumentWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * gets an specific DocumentType
     * Will return the DocumentType that matches with the provided [id]
     * @param {Number} id id of the searched DocumentType
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IDocumentType} and HTTP response
     */
    getDocumentTypeWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getDocumentType");
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
      let returnType = IDocumentType;

      return this.apiClient.callApi(
        '/document/type/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific DocumentType
     * Will return the DocumentType that matches with the provided [id]
     * @param {Number} id id of the searched DocumentType
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IDocumentType}
     */
    getDocumentType(id, opts) {
      return this.getDocumentTypeWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the DocumentTypes
     * This returns all the DocumentTypes of the system. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/IDocumentType>} and HTTP response
     */
    getDocumentTypesWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
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
      let returnType = [IDocumentType];

      return this.apiClient.callApi(
        '/document/type', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the DocumentTypes
     * This returns all the DocumentTypes of the system. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/IDocumentType>}
     */
    getDocumentTypes(opts) {
      return this.getDocumentTypesWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * updates the Document
     * Will update an Document with the provided data in body  if the Document matches the [id] 
     * @param {Number} id id of the searched Document
     * @param {module:model/IDocument} document Document data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    updateDocumentWithHttpInfo(id, document, opts) {
      opts = opts || {};
      let postBody = document;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateDocument");
      }

      // verify the required parameter 'document' is set
      if (document === undefined || document === null) {
        throw new Error("Missing the required parameter 'document' when calling updateDocument");
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
        '/document/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * updates the Document
     * Will update an Document with the provided data in body  if the Document matches the [id] 
     * @param {Number} id id of the searched Document
     * @param {module:model/IDocument} document Document data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    updateDocument(id, document, opts) {
      return this.updateDocumentWithHttpInfo(id, document, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * updates the DocumentType
     * Will update an DocumentType with the provided data in body if the DocumentType matches the [id]
     * @param {Number} id id of the DocumentType to be updated
     * @param {module:model/IDocumentType} documentType DocumentType data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    updateDocumentTypeWithHttpInfo(id, documentType, opts) {
      opts = opts || {};
      let postBody = documentType;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateDocumentType");
      }

      // verify the required parameter 'documentType' is set
      if (documentType === undefined || documentType === null) {
        throw new Error("Missing the required parameter 'documentType' when calling updateDocumentType");
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
        '/document/type/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * updates the DocumentType
     * Will update an DocumentType with the provided data in body if the DocumentType matches the [id]
     * @param {Number} id id of the DocumentType to be updated
     * @param {module:model/IDocumentType} documentType DocumentType data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    updateDocumentType(id, documentType, opts) {
      return this.updateDocumentTypeWithHttpInfo(id, documentType, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
