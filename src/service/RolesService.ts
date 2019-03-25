'use strict';
import {IRole, Role, ICompetency, Competency} from "../model/models";
import { JABCResponse, JABCSuccess } from "../utils/ResponseManager";
import Database from "../database/Database";
import Log from "../../util/Log";
import IDatabaseClient from "../database/IDatabaseClient";


/**
 * creates a new Competency
 * Will create a new Competency with the provided data in body
 *
 * competency ICompetency Competency data
 * idRole Integer id of the Role with searched Competency
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
export async function createCompetency(competency: ICompetency, idRole: number, xAuthToken: string) {
    try {
        competency = Competency.Prepare(competency);
        let res = await Database.getInstance().query('CALL create_competency(?,?,?)', [
            idRole,
            competency.name,
            competency.description
        ], JABCResponse.COMPETENCY);

        return new JABCSuccess(JABCResponse.ROLE, `The competency was created successfully.`)
    } catch (error) {
        throw error;
    }
}


/**
 * creates a new Role
 * Will create a new Role with the provided data in body
 *
 * @param {IRole} role Role data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function createRole(role: IRole, xAuthToken: String) {
    let db: IDatabaseClient;
    let conn: any;
    try {
        db = Database.getInstance();
        conn = await db.initConnection()
        await db.beginTransaction(conn);

        role = Role.Prepare(role);
        await Database.getInstance().rawQuery(conn, 'CALL create_role(?,?)', [
            role.name,
            role.description
        ], JABCResponse.ROLE);

        let res = await Database.getInstance().rawQuery(conn, 'CALL get_role_with_name(?)', [role.name], JABCResponse.ROLE);

        if(role.competencies != null){
            for (let competency of role.competencies) {
                competency = Competency.Prepare(competency);
    
                await db.rawQuery(conn, 'CALL create_competency(?,?,?)', [
                    res[0][0][0].ROLE_ID,
                    competency.name,
                    competency.description
                ], JABCResponse.COMPETENCY);
            }
        }

        await db.commit(conn);
        await db.closeConnection(conn);

        return new JABCSuccess(JABCResponse.ROLE, `The role was created successfully.`);
    } catch (error) {
		try {
			await db.rollback(conn);
        } catch (err) { }
		throw error;
	} finally {
        try {
            await db.rollback(conn);
        } catch (err) { }
        try {
            await db.closeConnection(conn);
        } catch (err) { }
    }
}


/**
 * deletes Competency
 * Will delete an Competency if the Competency matches the [id]
 *
 * id Integer id of the Competency to be deleted
 * idRole Integer id of the Role with searched Competency
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
export async function deleteCompetency(id: Number, idRole: Number, xAuthToken: String) {
    try {
        let res = await Database.getInstance().query('CALL delete_competency(?)', [id], JABCResponse.COMPETENCY);
        return new JABCSuccess(JABCResponse.COMPETENCY, `The competency was deleted successfully.`);
    } catch (error) {
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
export async function deleteRole(id: Number, xAuthToken: String) {
    try {
        let res = await Database.getInstance().query('CALL delete_role(?)', [id], JABCResponse.ROLE);
        return new JABCSuccess(JABCResponse.ROLE, `The role was deleted successfully.`);
    } catch (error) {
        throw error;
    }
}


/**
 * gets an specific Competency
 * Will return the Competency that matches with the provided [id]
 *
 * id Integer id of the searched Competency
 * idRole Integer id of the Role with searched Competency
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns ICompetency
 **/
export async function getCompetency(id: Number, idRole: Number, xAuthToken: String) {
    try {
        let res = await Database.getInstance().query('CALL get_competency(?)', [id], JABCResponse.COMPETENCY);
        return new Competency(res[0][0][0]);
    } catch (error) {
        throw error;
    }
}


/**
 * get all the Competencys
 * This returns all the Competencys of the system.  
 *
 * idRole Integer id of the Role with searched Competency
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns List
 **/
export async function getCompetencys(idRole: Number, xAuthToken: String) {
    try {
        let res = await Database.getInstance().query('CALL get_competencies(?)', [idRole], JABCResponse.COMPETENCY);

        return Competency.Competencys(res[0][0]);
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
export async function getRole(id: Number, xAuthToken: String) {
    try {
        let res = await Database.getInstance().query('CALL get_role(?)', [id], JABCResponse.ROLE);
        let role = new Role(res[0][0][0]);
        role.competencies = await getCompetencys(id, xAuthToken);

        return role;
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
export async function getRoles(xAuthToken: String) {
    try {
        let res = await Database.getInstance().query('CALL get_roles()', [], JABCResponse.ROLE);
        return Role.Roles(res[0][0]);
    } catch (error) {
        throw error;
    }
}


/**
 * updates the Competency
 * Will update an Competency with the provided data in body if the Competency matches the [id]
 *
 * id Integer id of the Competency to be updated
 * competency ICompetency Competency data
 * idRole Integer id of the Role with searched Competency
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
export async function updateCompetency(id: Number, competency: ICompetency, idRole: Number, xAuthToken: String) {
    try {
        competency = Competency.Prepare(competency);
        let res = await Database.getInstance().query('CALL update_competency(?,?,?)', [
            id,
            competency.name,
            competency.description
        ], JABCResponse.COMPETENCY);
        return new JABCSuccess(JABCResponse.ROLE, `The competency, ${competency.name}, was updated successfully.`);
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
export async function updateRole(id: Number, role: IRole, xAuthToken: String) {
    let db: IDatabaseClient;
    let conn: any;
    try {
        db = Database.getInstance();
        conn = await db.initConnection();
        await db.beginTransaction(conn);

        role = Role.Prepare(role);
        let res = await db.rawQuery(conn, 'CALL update_role(?,?,?)', [
            id,
            role.name,
            role.description
        ], JABCResponse.ROLE);

        await db.rawQuery(conn, 'CALL delete_competencies(?)', [id], JABCResponse.COMPETENCY);

        if(role.competencies != null){
            for (let competency of role.competencies) {
                competency = Competency.Prepare(competency);

                await db.rawQuery(conn, 'CALL create_competency(?,?,?)', [
                    id,
                    competency.name,
                    competency.description
                ], JABCResponse.COMPETENCY);
            }
        }

        await db.commit(conn);
        await db.closeConnection(conn);

        return new JABCSuccess(JABCResponse.ROLE, `The role, ${role.name}, was updated successfully`);
    } catch (error) {
		try {
			await db.rollback(conn);
        } catch (err) { }
		throw error;
	} finally {
        try {
            await db.rollback(conn);
        } catch (err) { }
        try {
            await db.closeConnection(conn);
        } catch (err) { }
    }
}
