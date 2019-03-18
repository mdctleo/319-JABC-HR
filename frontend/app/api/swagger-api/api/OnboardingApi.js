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
import IDocumentType from '../model/IDocumentType';
import IFAQ from '../model/IFAQ';
import IOnboardingTask from '../model/IOnboardingTask';

/**
* Onboarding service.
* @module api/OnboardingApi
* @version 1.0.0
*/
export default class OnboardingApi {

    /**
    * Constructs a new OnboardingApi. 
    * @alias module:api/OnboardingApi
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
        '/onboarding/documentType', 'POST',
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
     * creates a new FAQ
     * Will create a new FAQ with the provided data in body
     * @param {module:model/IFAQ} faq FAQ data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    createFAQWithHttpInfo(faq, opts) {
      opts = opts || {};
      let postBody = faq;

      // verify the required parameter 'faq' is set
      if (faq === undefined || faq === null) {
        throw new Error("Missing the required parameter 'faq' when calling createFAQ");
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
        '/onboarding/faq', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * creates a new FAQ
     * Will create a new FAQ with the provided data in body
     * @param {module:model/IFAQ} faq FAQ data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    createFAQ(faq, opts) {
      return this.createFAQWithHttpInfo(faq, opts)
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
        '/onboarding/documentType/{id}', 'DELETE',
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
     * deletes FAQ
     * Will delete an FAQ if the FAQ matches the [id]
     * @param {Number} id id of the FAQ to be deleted
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    deleteFAQWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteFAQ");
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
        '/onboarding/faq/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * deletes FAQ
     * Will delete an FAQ if the FAQ matches the [id]
     * @param {Number} id id of the FAQ to be deleted
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    deleteFAQ(id, opts) {
      return this.deleteFAQWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * deletes OnboardingTask
     * Will delete the OnboardingTask that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched OnboardingTask
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    deleteOnboardingTaskWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteOnboardingTask");
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
        '/onboarding/task/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * deletes OnboardingTask
     * Will delete the OnboardingTask that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched OnboardingTask
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    deleteOnboardingTask(id, opts) {
      return this.deleteOnboardingTaskWithHttpInfo(id, opts)
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
        '/onboarding/documentType/{id}', 'GET',
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
     * gets an specific DocumentType file
     * Will return the DocumentType File that matches with the provided [id] 
     * @param {Number} id id of the searched DocumentType
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link File} and HTTP response
     */
    getDocumentTypeFileWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getDocumentTypeFile");
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

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = File;

      return this.apiClient.callApi(
        '/onboarding/documentType/{id}/file', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific DocumentType file
     * Will return the DocumentType File that matches with the provided [id] 
     * @param {Number} id id of the searched DocumentType
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link File}
     */
    getDocumentTypeFile(id, opts) {
      return this.getDocumentTypeFileWithHttpInfo(id, opts)
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
        '/onboarding/documentType', 'GET',
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
     * gets an specific FAQ
     * Will return the FAQ that matches with the provided [id]
     * @param {Number} id id of the searched FAQ
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IFAQ} and HTTP response
     */
    getFAQWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getFAQ");
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
      let returnType = IFAQ;

      return this.apiClient.callApi(
        '/onboarding/faq/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific FAQ
     * Will return the FAQ that matches with the provided [id]
     * @param {Number} id id of the searched FAQ
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IFAQ}
     */
    getFAQ(id, opts) {
      return this.getFAQWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the FAQs
     * This returns all the FAQs of the system. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/IFAQ>} and HTTP response
     */
    getFAQsWithHttpInfo(opts) {
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
      let returnType = [IFAQ];

      return this.apiClient.callApi(
        '/onboarding/faq', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the FAQs
     * This returns all the FAQs of the system. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/IFAQ>}
     */
    getFAQs(opts) {
      return this.getFAQsWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * gets an specific OnboardingTask
     * Will return the OnboardingTask that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched OnboardingTask
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IOnboardingTask} and HTTP response
     */
    getOnboardingTaskWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getOnboardingTask");
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
      let returnType = IOnboardingTask;

      return this.apiClient.callApi(
        '/onboarding/task/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific OnboardingTask
     * Will return the OnboardingTask that matches with the provided [id] from  the Employee with [id] 
     * @param {Number} id id of the searched OnboardingTask
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IOnboardingTask}
     */
    getOnboardingTask(id, opts) {
      return this.getOnboardingTaskWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * gets an specific OnboardingTask file
     * Will return the OnboardingTask File that matches with the provided [id] 
     * @param {Number} id id of the searched OnboardingTask
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link File} and HTTP response
     */
    getOnboardingTaskFileWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getOnboardingTaskFile");
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

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = File;

      return this.apiClient.callApi(
        '/onboarding/task/{id}/file', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific OnboardingTask file
     * Will return the OnboardingTask File that matches with the provided [id] 
     * @param {Number} id id of the searched OnboardingTask
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link File}
     */
    getOnboardingTaskFile(id, opts) {
      return this.getOnboardingTaskFileWithHttpInfo(id, opts)
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
        '/onboarding/documentType/{id}', 'PUT',
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


    /**
     * updates the FAQ
     * Will update an FAQ with the provided data in body if the FAQ matches the [id]
     * @param {Number} id id of the FAQ to be updated
     * @param {module:model/IFAQ} faq FAQ data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    updateFAQWithHttpInfo(id, faq, opts) {
      opts = opts || {};
      let postBody = faq;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateFAQ");
      }

      // verify the required parameter 'faq' is set
      if (faq === undefined || faq === null) {
        throw new Error("Missing the required parameter 'faq' when calling updateFAQ");
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
        '/onboarding/faq/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * updates the FAQ
     * Will update an FAQ with the provided data in body if the FAQ matches the [id]
     * @param {Number} id id of the FAQ to be updated
     * @param {module:model/IFAQ} faq FAQ data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    updateFAQ(id, faq, opts) {
      return this.updateFAQWithHttpInfo(id, faq, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * updates the OnboardingTask
     * Will update an OnboardingTask with the provided data in body  if the OnboardingTask matches the [id] 
     * @param {Number} id id of the searched OnboardingTask
     * @param {module:model/IOnboardingTask} onboardingTask OnboardingTask data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    updateOnboardingTaskWithHttpInfo(id, onboardingTask, opts) {
      opts = opts || {};
      let postBody = onboardingTask;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateOnboardingTask");
      }

      // verify the required parameter 'onboardingTask' is set
      if (onboardingTask === undefined || onboardingTask === null) {
        throw new Error("Missing the required parameter 'onboardingTask' when calling updateOnboardingTask");
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
        '/onboarding/task/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * updates the OnboardingTask
     * Will update an OnboardingTask with the provided data in body  if the OnboardingTask matches the [id] 
     * @param {Number} id id of the searched OnboardingTask
     * @param {module:model/IOnboardingTask} onboardingTask OnboardingTask data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    updateOnboardingTask(id, onboardingTask, opts) {
      return this.updateOnboardingTaskWithHttpInfo(id, onboardingTask, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * uploads the template to the DocumentType
     * Will update an DocumentType with the provided file as a template if the DocumentType matches the [id]
     * @param {Number} id id of the DocumentType to be updated
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {File} opts.document The document file to be used as a template
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    uploadTemplateDocumentTypeWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling uploadTemplateDocumentType");
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
        'document': opts['document']
      };

      let authNames = ['AuthToken'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = IApiResponse;

      return this.apiClient.callApi(
        '/onboarding/documentType/{id}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * uploads the template to the DocumentType
     * Will update an DocumentType with the provided file as a template if the DocumentType matches the [id]
     * @param {Number} id id of the DocumentType to be updated
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {File} opts.document The document file to be used as a template
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    uploadTemplateDocumentType(id, opts) {
      return this.uploadTemplateDocumentTypeWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
