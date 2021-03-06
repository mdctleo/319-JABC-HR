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
import ICompetency from '../model/ICompetency';
import IRole from '../model/IRole';

/**
* Roles service.
* @module api/RolesApi
* @version 1.0.0
*/
export default class RolesApi {

    /**
    * Constructs a new RolesApi. 
    * @alias module:api/RolesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * creates a new Competency
     * Will create a new Competency with the provided data in body
     * @param {module:model/ICompetency} competency Competency data
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    createCompetencyWithHttpInfo(competency, idRole, opts) {
      opts = opts || {};
      let postBody = competency;

      // verify the required parameter 'competency' is set
      if (competency === undefined || competency === null) {
        throw new Error("Missing the required parameter 'competency' when calling createCompetency");
      }

      // verify the required parameter 'idRole' is set
      if (idRole === undefined || idRole === null) {
        throw new Error("Missing the required parameter 'idRole' when calling createCompetency");
      }


      let pathParams = {
        'idRole': idRole
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
        '/role/{idRole}/competency', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * creates a new Competency
     * Will create a new Competency with the provided data in body
     * @param {module:model/ICompetency} competency Competency data
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    createCompetency(competency, idRole, opts) {
      return this.createCompetencyWithHttpInfo(competency, idRole, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * creates a new Role
     * Will create a new Role with the provided data in body
     * @param {module:model/IRole} role Role data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    createRoleWithHttpInfo(role, opts) {
      opts = opts || {};
      let postBody = role;

      // verify the required parameter 'role' is set
      if (role === undefined || role === null) {
        throw new Error("Missing the required parameter 'role' when calling createRole");
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
        '/role', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * creates a new Role
     * Will create a new Role with the provided data in body
     * @param {module:model/IRole} role Role data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    createRole(role, opts) {
      return this.createRoleWithHttpInfo(role, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * deletes Competency
     * Will delete an Competency if the Competency matches the [id]
     * @param {Number} id id of the Competency to be deleted
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    deleteCompetencyWithHttpInfo(id, idRole, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteCompetency");
      }

      // verify the required parameter 'idRole' is set
      if (idRole === undefined || idRole === null) {
        throw new Error("Missing the required parameter 'idRole' when calling deleteCompetency");
      }


      let pathParams = {
        'id': id,
        'idRole': idRole
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
        '/role/{idRole}/competency/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * deletes Competency
     * Will delete an Competency if the Competency matches the [id]
     * @param {Number} id id of the Competency to be deleted
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    deleteCompetency(id, idRole, opts) {
      return this.deleteCompetencyWithHttpInfo(id, idRole, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * deletes Role
     * Will delete an Role if the Role matches the [id]
     * @param {Number} id id of the Role to be deleted
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    deleteRoleWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling deleteRole");
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
        '/role/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * deletes Role
     * Will delete an Role if the Role matches the [id]
     * @param {Number} id id of the Role to be deleted
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    deleteRole(id, opts) {
      return this.deleteRoleWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * gets an specific Competency
     * Will return the Competency that matches with the provided [id]
     * @param {Number} id id of the searched Competency
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/ICompetency} and HTTP response
     */
    getCompetencyWithHttpInfo(id, idRole, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getCompetency");
      }

      // verify the required parameter 'idRole' is set
      if (idRole === undefined || idRole === null) {
        throw new Error("Missing the required parameter 'idRole' when calling getCompetency");
      }


      let pathParams = {
        'id': id,
        'idRole': idRole
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
      let returnType = ICompetency;

      return this.apiClient.callApi(
        '/role/{idRole}/competency/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific Competency
     * Will return the Competency that matches with the provided [id]
     * @param {Number} id id of the searched Competency
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/ICompetency}
     */
    getCompetency(id, idRole, opts) {
      return this.getCompetencyWithHttpInfo(id, idRole, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the Competencys
     * This returns all the Competencys of the system.  
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/ICompetency>} and HTTP response
     */
    getCompetencysWithHttpInfo(idRole, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'idRole' is set
      if (idRole === undefined || idRole === null) {
        throw new Error("Missing the required parameter 'idRole' when calling getCompetencys");
      }


      let pathParams = {
        'idRole': idRole
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
      let returnType = [ICompetency];

      return this.apiClient.callApi(
        '/role/{idRole}/competency', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the Competencys
     * This returns all the Competencys of the system.  
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/ICompetency>}
     */
    getCompetencys(idRole, opts) {
      return this.getCompetencysWithHttpInfo(idRole, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * gets an specific Role
     * Will return the Role that matches with the provided [id]
     * @param {Number} id id of the searched Role
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IRole} and HTTP response
     */
    getRoleWithHttpInfo(id, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling getRole");
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
      let returnType = IRole;

      return this.apiClient.callApi(
        '/role/{id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * gets an specific Role
     * Will return the Role that matches with the provided [id]
     * @param {Number} id id of the searched Role
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IRole}
     */
    getRole(id, opts) {
      return this.getRoleWithHttpInfo(id, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get all the Roles
     * This returns all the Roles of the system. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link Array.<module:model/IRole>} and HTTP response
     */
    getRolesWithHttpInfo(opts) {
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
      let returnType = [IRole];

      return this.apiClient.callApi(
        '/role', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * get all the Roles
     * This returns all the Roles of the system. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link Array.<module:model/IRole>}
     */
    getRoles(opts) {
      return this.getRolesWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * updates the Competency
     * Will update an Competency with the provided data in body if the Competency matches the [id]
     * @param {Number} id id of the Competency to be updated
     * @param {module:model/ICompetency} competency Competency data
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    updateCompetencyWithHttpInfo(id, competency, idRole, opts) {
      opts = opts || {};
      let postBody = competency;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateCompetency");
      }

      // verify the required parameter 'competency' is set
      if (competency === undefined || competency === null) {
        throw new Error("Missing the required parameter 'competency' when calling updateCompetency");
      }

      // verify the required parameter 'idRole' is set
      if (idRole === undefined || idRole === null) {
        throw new Error("Missing the required parameter 'idRole' when calling updateCompetency");
      }


      let pathParams = {
        'id': id,
        'idRole': idRole
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
        '/role/{idRole}/competency/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * updates the Competency
     * Will update an Competency with the provided data in body if the Competency matches the [id]
     * @param {Number} id id of the Competency to be updated
     * @param {module:model/ICompetency} competency Competency data
     * @param {Number} idRole id of the Role with searched Competency
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    updateCompetency(id, competency, idRole, opts) {
      return this.updateCompetencyWithHttpInfo(id, competency, idRole, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * updates the Role
     * Will update an Role with the provided data in body if the Role matches the [id]
     * @param {Number} id id of the Role to be updated
     * @param {module:model/IRole} role Role data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/IApiResponse} and HTTP response
     */
    updateRoleWithHttpInfo(id, role, opts) {
      opts = opts || {};
      let postBody = role;

      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling updateRole");
      }

      // verify the required parameter 'role' is set
      if (role === undefined || role === null) {
        throw new Error("Missing the required parameter 'role' when calling updateRole");
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
        '/role/{id}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * updates the Role
     * Will update an Role with the provided data in body if the Role matches the [id]
     * @param {Number} id id of the Role to be updated
     * @param {module:model/IRole} role Role data
     * @param {Object} opts Optional parameters
     * @param {String} opts.xAuthToken Auth Token that grants access to the system
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/IApiResponse}
     */
    updateRole(id, role, opts) {
      return this.updateRoleWithHttpInfo(id, role, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
