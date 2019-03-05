'use strict';
import { IRole } from "../model/models";


/**
 * creates a new Role
 * Will create a new Role with the provided data in body
 *
 * @param {IRole} role Role data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.createRole = function(role : IRole, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * deletes Role
 * Will delete an Role if the Role matches the [id]
 *
 * @param {Number} id of the Role to be deleted
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.deleteRole = function(id : Number,  xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}


/**
 * gets an specific Role
 * Will return the Role that matches with the provided [id]
 *
 * @param {Number} id of the searched Role
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IRole>}
 **/
exports.getRole = function(id : Number,  xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "name" : "name",
  "description" : "description",
  "id" : 1
};
    resolve(examples);
  });
}


/**
 * get all the Roles
 * This returns all the Roles of the system. 
 *
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<[]>}
 **/
exports.getRoles = function(xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = [ {
  "name" : "name",
  "description" : "description",
  "id" : 1
}, {
  "name" : "name",
  "description" : "description",
  "id" : 1
} ];
    resolve(examples);
  });
}


/**
 * updates the Role
 * Will update an Role with the provided data in body if the Role matches the [id]
 *
 * @param {Number} id of the Role to be updated
 * @param {IRole} role Role data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.updateRole = function(id : Number, role : IRole, xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "debugMessage" : "This is a debug message",
  "type" : "ERROR",
  "message" : "Unauthorized access to the API",
  "responseCode" : 0
};
    resolve(examples);
  });
}

