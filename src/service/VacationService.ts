'use strict';
import { Vacation, IVacation } from "../model/models";
import { JABCError, JABCSuccess, JABCResponse } from '../utils/ResponseManager'
import Database from '../database/Database';


/**
 * deletes Vacation
 * Will delete the Vacation that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched Vacation
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deleteVacation(id: Number, xAuthToken: String) {
    try{
		let res = await Database.getInstance().query('CALL delete_vacation_request(?)', [id], JABCResponse.VACATION)
		return new JABCSuccess(JABCResponse.VACATION, `The vacation request was deleted successfuly`)
	}catch(error){
		throw error;
	}
}


/**
 * gets an specific Vacation
 * Will return the Vacation that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched Vacation
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IVacation>}
 **/
export async function getVacation(id: Number, xAuthToken: String) {
    try{
		let res = await Database.getInstance().query('CALL get_vacation_request(?)', [id], JABCResponse.VACATION)
		return new Vacation(res[0][0][0])
	}catch(error){
		throw error;
	}
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
export async function updateVacation(id: Number, vacation: IVacation, xAuthToken: String) {
    try{
        let res = await Database.getInstance().query('CALL update_vacation_request(?,?,?,?,?)', 
        [
            id,
            vacation.fkApprover,
            vacation.requestedDays,
            vacation.requestedStatus,
            vacation.date,
        ], JABCResponse.VACATION)
		return new JABCSuccess(JABCResponse.VACATION, `The vacation request was updated successfuly`)
	}catch(error){
		throw error;
	}
}

