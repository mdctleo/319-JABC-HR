'use strict';
import {IRole, Role} from "../model/models";
import {JABCResponse, JABCSuccess} from "../utils/ResponseManager";
import Database from "../database/Database";


/**
 * creates a new Role
 * Will create a new Role with the provided data in body
 *
 * @param {IRole} role Role data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function createRole (role: IRole, xAuthToken: String) {
    try {
        let res = await Database.getInstance().query('CALL create_role(?,?)', [
            role.name,
            role.description
        ], JABCResponse.ROLE);

        return new JABCSuccess(JABCResponse.ROLE, `The role was created successfully.`)
    } catch(error) {
        throw error;
    }
}


/**
 * deletes Role
 * Will delete an Role if the Role matches the [id]
 *
 * @param {Number} id of the Role to be deleted
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deleteRole (id : Number, xAuthToken: String) {
    try {
        let res = await Database.getInstance().query('CALL delete_role(?)', [id], JABCResponse.ROLE);
        return new JABCSuccess(JABCResponse.ROLE, `The role was deleted successfully.`);
    } catch (error) {
        throw error;
    }
}


/**
 * gets an specific Role
 * Will return the Role that matches with the provided [id]
 *
 * @param {Number} id of the searched Role
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IRole>}
 **/
export async function getRole (id : Number, xAuthToken : String) {
    try {
        let res = await Database.getInstance().query('CALL get_role(?)', [id], JABCResponse.ROLE);
        return new Role(res[0][0][0]);
    } catch (error) {
        throw error;
    }
}


/**
 * get all the Roles
 * This returns all the Roles of the system. 
 *
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<[]>}
 **/
export async function getRoles (xAuthToken : String) {
    try {
        let res = await Database.getInstance().query('CALL get_roles()', [], JABCResponse.ROLE);
        return Role.Roles(res[0][0]);
    } catch (error) {
        throw error;
    }
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
export async function updateRole (id : Number, role : IRole, xAuthToken : String) {
    try {
        role = Role.Prepare(role);
        let res = await Database.getInstance().query('CALL update_role(?,?,?)', [
            id,
            role.name,
            role.description
        ], JABCResponse.ROLE);
        return new JABCSuccess(JABCResponse.ROLE, `The role, ${role.name}, was updated successfully`);
    } catch(error) {
        throw error;
    }
}
