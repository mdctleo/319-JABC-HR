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
import IEmployee from '../model/IEmployee';
import IEmployeeHistory from '../model/IEmployeeHistory';
import ILogin from '../model/ILogin';
import ILoginResponse from '../model/ILoginResponse';
import IPerformance from '../model/IPerformance';
import IVacation from '../model/IVacation';

/**
* Employee service.
* @module api/EmployeeApi
* @version 1.0.0
*/
export default class EmployeeApi {

    /**
    * Constructs a new EmployeeApi. 
    * @alias module:api/EmployeeApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * creates a new Document for the employee with [id]
     * Will create a new Document with the provided data in body
     * @param {Number} id id of the searched Employee
     * @param {module:model/IDocument} document Document data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    createDocumentWithHttpInfo(id, document, opts) {
      opts = opts || {};
      let postBody = document;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling createDocument");
      }

      // verify the required parameter 'document' is set
      if (document === undefined || document === null) {
        throw new Error("Missing the required parameter 'document' when calling createDocument");
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
        '/employee/{id}/document', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * creates a new Document for the employee with [id]
     * Will create a new Document with the provided data in body
     * @param {Number} id id of the searched Employee
     * @param {module:model/IDocument} document Document data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    createDocument(id, document, opts) {
      return this.createDocumentWithHttpInfo(id, document, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * creates a new Employee
     * Will create a new Employee with the provided data in body
     * @param {module:model/IEmployee} employee Employee data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    createEmployeeWithHttpInfo(employee, opts) {
      opts = opts || {};
      let postBody = employee;

      // verify the required parameter 'employee' is set
      if (employee === undefined || employee === null) {
        throw new Error("Missing the required parameter 'employee' when calling createEmployee");
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
        '/employee', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * creates a new Employee
     * Will create a new Employee with the provided data in body
     * @param {module:model/IEmployee} employee Employee data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    createEmployee(employee, opts) {
      return this.createEmployeeWithHttpInfo(employee, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * creates a new Performance for the employee with [id]
     * Will create a new Performance with the provided data in body
     * @param {Number} id id of the searched Employee
     * @param {module:model/IPerformance} performance Performance data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    createPerformanceWithHttpInfo(id, performance, opts) {
      opts = opts || {};
      let postBody = performance;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling createPerformance");
      }

      // verify the required parameter 'performance' is set
      if (performance === undefined || performance === null) {
        throw new Error("Missing the required parameter 'performance' when calling createPerformance");
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
        '/employee/{id}/performance', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * creates a new Performance for the employee with [id]
     * Will create a new Performance with the provided data in body
     * @param {Number} id id of the searched Employee
     * @param {module:model/IPerformance} performance Performance data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    createPerformance(id, performance, opts) {
      return this.createPerformanceWithHttpInfo(id, performance, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * creates a new Vacation for the employee with [id]
     * Will create a new Vacation with the provided data in body
     * @param {Number} id id of the searched Employee
     * @param {module:model/IVacation} vacation Vacation data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    createVacationWithHttpInfo(id, vacation, opts) {
      opts = opts || {};
      let postBody = vacation;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling createVacation");
      }

      // verify the required parameter 'vacation' is set
      if (vacation === undefined || vacation === null) {
        throw new Error("Missing the required parameter 'vacation' when calling createVacation");
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
        '/employee/{id}/vacation', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * creates a new Vacation for the employee with [id]
     * Will create a new Vacation with the provided data in body
     * @param {Number} id id of the searched Employee
     * @param {module:model/IVacation} vacation Vacation data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    createVacation(id, vacation, opts) {
      return this.createVacationWithHttpInfo(id, vacation, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * deletes Employee
     * Will delete (deactivate) an Employee if the Employee matches the [id]
     * @param {Number} id id of the Employee to be deleted
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {Number} opts.idAdmin Who is deleting the employee
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    deleteEmployeeWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteEmployee");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
        'idAdmin': opts['idAdmin']
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
        '/employee/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * deletes Employee
     * Will delete (deactivate) an Employee if the Employee matches the [id]
     * @param {Number} id id of the Employee to be deleted
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {Number} opts.idAdmin Who is deleting the employee
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    deleteEmployee(id, opts) {
      return this.deleteEmployeeWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the Documents of the employee with [id]
     * This returns all the Documents of the system.  If [term] is provided this returns the Documents of the Employee that match with the [term].  
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {String} opts.term Search term for filter the data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/IDocument>} and HTTP response
     */
    getDocumentsWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getDocuments");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
        'term': opts['term']
      };
      let headerParams = {
        'X-Auth-Token': opts['xAuthToken']
      };
      let formParams = {
      };

      let authNames = ['AuthToken'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = [IDocument];

      return this.apiClient.callApi(
        '/employee/{id}/document', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the Documents of the employee with [id]
     * This returns all the Documents of the system.  If [term] is provided this returns the Documents of the Employee that match with the [term].  
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {String} opts.term Search term for filter the data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/IDocument>}
     */
    getDocuments(id, opts) {
      return this.getDocumentsWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * gets an specific Employee
     * Will return the Employee that matches with the provided [id]
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IEmployee} and HTTP response
     */
    getEmployeeWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getEmployee");
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
      let returnType = IEmployee;

      return this.apiClient.callApi(
        '/employee/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific Employee
     * Will return the Employee that matches with the provided [id]
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IEmployee}
     */
    getEmployee(id, opts) {
      return this.getEmployeeWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the history of the employee with [id]
     * This returns all the history data of the employee with [id].  
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/IEmployeeHistory>} and HTTP response
     */
    getEmployeeHistoryWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getEmployeeHistory");
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
      let returnType = [IEmployeeHistory];

      return this.apiClient.callApi(
        '/employee/{id}/history', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the history of the employee with [id]
     * This returns all the history data of the employee with [id].  
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/IEmployeeHistory>}
     */
    getEmployeeHistory(id, opts) {
      return this.getEmployeeHistoryWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the Employees
     * This returns all the Employees of the system.  If [term] is provided this returns the Employees of the system that match with the [term]. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {String} opts.term Search term for filter the data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/IEmployee>} and HTTP response
     */
    getEmployeesWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
      };
      let queryParams = {
        'term': opts['term']
      };
      let headerParams = {
        'X-Auth-Token': opts['xAuthToken']
      };
      let formParams = {
      };

      let authNames = ['AuthToken'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = [IEmployee];

      return this.apiClient.callApi(
        '/employee', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the Employees
     * This returns all the Employees of the system.  If [term] is provided this returns the Employees of the system that match with the [term]. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {String} opts.term Search term for filter the data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/IEmployee>}
     */
    getEmployees(opts) {
      return this.getEmployeesWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the Employees that are managed by employee with [idManager]
     * This returns all the Employees that are managed by employee with [idManager]. 
     * @param {Number} idManager Employee that will manage the employee with [id]
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/IEmployee>} and HTTP response
     */
    getEmployeesByManagerWithHttpInfo(idManager, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'idManager' is set
      if (idManager === undefined || idManager === null) {
        throw new Error("Missing the required parameter 'idManager' when calling getEmployeesByManager");
      }


      let pathParams = {
        'idManager': idManager
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
      let returnType = [IEmployee];

      return this.apiClient.callApi(
        '/employee/manager/{idManager}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the Employees that are managed by employee with [idManager]
     * This returns all the Employees that are managed by employee with [idManager]. 
     * @param {Number} idManager Employee that will manage the employee with [id]
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/IEmployee>}
     */
    getEmployeesByManager(idManager, opts) {
      return this.getEmployeesByManagerWithHttpInfo(idManager, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the Performances of the employee with [id]
     * This returns all the Performances of the system. If [term] is provided this returns the Performances of the Employee that match with the [term].  
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {String} opts.term Search term for filter the data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/IPerformance>} and HTTP response
     */
    getPerformancesWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getPerformances");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
        'term': opts['term']
      };
      let headerParams = {
        'X-Auth-Token': opts['xAuthToken']
      };
      let formParams = {
      };

      let authNames = ['AuthToken'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = [IPerformance];

      return this.apiClient.callApi(
        '/employee/{id}/performance', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the Performances of the employee with [id]
     * This returns all the Performances of the system. If [term] is provided this returns the Performances of the Employee that match with the [term].  
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {String} opts.term Search term for filter the data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/IPerformance>}
     */
    getPerformances(id, opts) {
      return this.getPerformancesWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the Vacations of the employee with [id]
     * This returns all the Vacations of the system.  If [term] is provided this returns the Vacations of the Employee that match with the [term].  
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {String} opts.term Search term for filter the data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/IVacation>} and HTTP response
     */
    getVacationsWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getVacations");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
        'term': opts['term']
      };
      let headerParams = {
        'X-Auth-Token': opts['xAuthToken']
      };
      let formParams = {
      };

      let authNames = ['AuthToken'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = [IVacation];

      return this.apiClient.callApi(
        '/employee/{id}/vacation', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the Vacations of the employee with [id]
     * This returns all the Vacations of the system.  If [term] is provided this returns the Vacations of the Employee that match with the [term].  
     * @param {Number} id id of the searched Employee
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {String} opts.term Search term for filter the data
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/IVacation>}
     */
    getVacations(id, opts) {
      return this.getVacationsWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Links employee to his manager
     * Sets the employee with [id] to be managed by the employee with [idManager]
     * @param {Number} id Employee to be managed by another
     * @param {Number} idManager Employee that will manage the employee with [id]
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    linkEmployeeManagerWithHttpInfo(id, idManager, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling linkEmployeeManager");
      }

      // verify the required parameter 'idManager' is set
      if (idManager === undefined || idManager === null) {
        throw new Error("Missing the required parameter 'idManager' when calling linkEmployeeManager");
      }


      let pathParams = {
        'id': id,
        'idManager': idManager
      };
      let queryParams = {
      };
      let headerParams = {
        'X-Auth-Token': opts['xAuthToken']
      };
      let formParams = {
      };

      let authNames = ['AuthToken'];
      let contentTypes = ['application/octet-stream'];
      let accepts = ['application/json'];
      let returnType = IApiResponse;

      return this.apiClient.callApi(
        '/employee/{id}/manager/{idManager}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Links employee to his manager
     * Sets the employee with [id] to be managed by the employee with [idManager]
     * @param {Number} id Employee to be managed by another
     * @param {Number} idManager Employee that will manage the employee with [id]
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    linkEmployeeManager(id, idManager, opts) {
      return this.linkEmployeeManagerWithHttpInfo(id, idManager, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * sign in the employee into the system
     * @param {module:model/ILogin} body Employee login data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/ILoginResponse} and HTTP response
     */
    loginWithHttpInfo(body, opts) {
      opts = opts || {};
      let postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling login");
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

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = ILoginResponse;

      return this.apiClient.callApi(
        '/employee/token', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * sign in the employee into the system
     * @param {module:model/ILogin} body Employee login data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/ILoginResponse}
     */
    login(body, opts) {
      return this.loginWithHttpInfo(body, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Unlinks employee from his manager
     * Deletes the relation between employee with [id] and the employee with [idManager]
     * @param {Number} id Employee to be unmanaged by another
     * @param {Number} idManager Employee that will stop managing the employee with [id]
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    unlinkEmployeeManagerWithHttpInfo(id, idManager, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling unlinkEmployeeManager");
      }

      // verify the required parameter 'idManager' is set
      if (idManager === undefined || idManager === null) {
        throw new Error("Missing the required parameter 'idManager' when calling unlinkEmployeeManager");
      }


      let pathParams = {
        'id': id,
        'idManager': idManager
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
        '/employee/{id}/manager/{idManager}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * Unlinks employee from his manager
     * Deletes the relation between employee with [id] and the employee with [idManager]
     * @param {Number} id Employee to be unmanaged by another
     * @param {Number} idManager Employee that will stop managing the employee with [id]
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    unlinkEmployeeManager(id, idManager, opts) {
      return this.unlinkEmployeeManagerWithHttpInfo(id, idManager, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * updates the Employee
     * Will update an Employee with the provided data in body if the Employee matches the [id]
     * @param {Number} id id of the Employee to be updated
     * @param {module:model/IEmployee} employee Employee data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {Number} opts.idAdmin Who is updating the employee
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    updateEmployeeWithHttpInfo(id, employee, opts) {
      opts = opts || {};
      let postBody = employee;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateEmployee");
      }

      // verify the required parameter 'employee' is set
      if (employee === undefined || employee === null) {
        throw new Error("Missing the required parameter 'employee' when calling updateEmployee");
      }


      let pathParams = {
        'id': id
      };
      let queryParams = {
        'idAdmin': opts['idAdmin']
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
        '/employee/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * updates the Employee
     * Will update an Employee with the provided data in body if the Employee matches the [id]
     * @param {Number} id id of the Employee to be updated
     * @param {module:model/IEmployee} employee Employee data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @param {Number} opts.idAdmin Who is updating the employee
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    updateEmployee(id, employee, opts) {
      return this.updateEmployeeWithHttpInfo(id, employee, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
