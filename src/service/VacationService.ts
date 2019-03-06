'use strict';
import { IVacation } from "../model/models";


/**
 * deletes Vacation
 * Will delete the Vacation that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched Vacation
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.deleteVacation = function(id : Number,  xAuthToken : String) {
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
 * gets an specific Vacation
 * Will return the Vacation that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched Vacation
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IVacation>}
 **/
exports.getVacation = function(id : Number,  xAuthToken : String) {
  return new Promise(function(resolve, reject) {
    var examples = {
  "date" : 1,
  "requestedDays" : 0,
  "fkApprover" : 1,
  "fkEmployee" : 1,
  "id" : 1,
  "requestedStatus" : 6
};
    resolve(examples);
  });
}


/**
 * updates the Vacation
 * Will update an Vacation with the provided data in body  if the Vacation matches the [id] 
 *
 * @param {Number} id of the searched Vacation
 * @param {IVacation} vacation Vacation data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
exports.updateVacation = function(id : Number, vacation : IVacation, xAuthToken : String) {
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

