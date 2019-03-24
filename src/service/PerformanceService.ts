'use strict';
import { Comment, IComment, IPerformancePlan, IPerformanceReview, IPerformanceSection, PerformancePlan, PerformanceReview, PerformanceSection, IEmployee } from '../model/models'
import { JABCError, JABCSuccess, JABCResponse } from '../utils/ResponseManager'
import { Auth, getManagersByEmployee } from '../service/EmployeeService'
import Database from '../database/Database';

/**
 * creates a new Comment for the PerformanceReview with [id]
 * Will create a new Comment with the provided data in body, to the PerformanceReview with [id]
 *
 * @param {Number} id Integer id of the PerformanceReview to be commented
 * @param {IComment} comment IComment Comment data
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function createComment(id: Number, comment: IComment, xAuthToken: string) {
    try {
        const client = (await Auth(xAuthToken)).employee
        let res = await Database.getInstance().query('CALL create_performance_review_comment(?,?,?,?)', [
            id,
            comment.comment,
            comment.date,
            client.id,
        ], JABCResponse.PERFORMANCE)
		return new JABCSuccess(JABCResponse.PERFORMANCE, `The comment was created successfully`)
    } catch (error) {
        throw error;
    }
}


/**
 * deletes Comment
 * Will delete an Comment if the Comment matches the [idComment]
 *
 * @param {Number} id Integer id of the PerformanceReview with comments
 * @param {Number} idComment Integer idComment of the Comment to be deleted
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deleteComment(id: Number, idComment: Number, xAuthToken: string) {
    try {
        let res = await Database.getInstance().query('CALL delete_performance_comment(?)', [
            idComment
        ], JABCResponse.PERFORMANCE)
		return new JABCSuccess(JABCResponse.PERFORMANCE, `The comment was deleted successfully`)
    } catch (error) {
        throw error;
    }
}


/**
 * deletes PerformancePlan
 * Will delete the PerformancePlan that matches with the provided [id] from  the Employee with [id]
 *
 * @param {Number} id Integer id of the searched PerformancePlan
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deletePerformancePlan(id: Number, xAuthToken: string) {
    try {
		await Database.getInstance().query('CALL delete_performance_plan(?)', [id], JABCResponse.PERFORMANCE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, 'The performance plan was successfully deleted')
	} catch (error) {
		throw error;
	}
}


/**
 * deletes PerformanceReview
 * Will delete the PerformanceReview that matches with the provided [id] from  the Employee with [id]
 *
 * @param {Number} id Integer id of the searched PerformanceReview
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deletePerformanceReview(id: Number, xAuthToken: string) {
    try {
		await Database.getInstance().query('CALL delete_performance_review(?)', [id], JABCResponse.PERFORMANCE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, 'The performance review was successfully deleted')
	} catch (error) {
		throw error;
	}
}


/**
 * gets an specific Comment
 * Will return the Comment that matches with the provided [idComment]
 *
 * @param {Number} id Integer id of the PerformanceReview with comments
 * @param {Number} idComment Integer idComment of the searched Comment
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IComment>}
 **/
export async function getComment(id: Number, idComment: Number, xAuthToken: string) {
    try {
        let res = await Database.getInstance().query('CALL get_comment(?)', [idComment], JABCResponse.PERFORMANCE)
		return new Comment(res[0][0][0])
    } catch (error) {
        throw error;
    }
}


/**
 * get all the Comments from a PerformanceReview with [id]
 * This returns all the Comments of the PerformanceReview with [id].
 *
 * @param {Number} id Integer id of the PerformanceReview with comments
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<Array<IComment>>}
 **/
export async function getComments(id: Number, xAuthToken: string) {
    try {
        let res = await Database.getInstance().query('CALL get_performance_review_comments(?)', [id], JABCResponse.PERFORMANCE)
		return Comment.Comments(res[0][0])
    } catch (error) {
        throw error;
    }
}


/**
 * gets an specific PerformancePlan
 * Will return the PerformancePlan that matches with the provided [id] from  the Employee with [id]
 *
 * @param {Number} id Integer id of the searched PerformancePlan
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IPerformancePlan>}
 **/
export async function getPerformancePlan(id: Number, xAuthToken: string) {
    try {
        let res = await Database.getInstance().query('CALL get_performance_plan(?)', [id], JABCResponse.PERFORMANCE)
        let performancePlan = new PerformancePlan(res[0][0][0])
        performancePlan.sections = PerformanceSection.PerformanceSections(res[0][1])
        performancePlan.comments = Comment.Comments(res[0][2])
        return performancePlan
    } catch (error) {
        throw error;
    }
}


/**
 * gets an specific PerformanceReview
 * Will return the PerformanceReview that matches with the provided [id] from  the Employee with [id]
 *
 * @param {Number} id Integer id of the searched PerformanceReview
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IPerformanceReview>}
 **/
export async function getPerformanceReview(id: Number, xAuthToken: string) {
    try {
        let res = await Database.getInstance().query('CALL get_performance_review(?)', [id], JABCResponse.PERFORMANCE)
        let performanceReview = new PerformanceReview(res[0][0][0])
        performanceReview.sections = PerformanceSection.PerformanceSections(res[0][1])
        performanceReview.comments = Comment.Comments(res[0][2])
        return performanceReview
    } catch (error) {
        throw error;
    }
}


/**
 * updates the Comment
 * Will update an Comment with the provided data in body if the Comment matches the [idComment]
 *
 * @param {Number} id Integer id of the PerformanceReview with comments
 * @param {Number} idComment Integer idComment of the Comment to be updated
 * @param {IComment} comment IComment Comment data
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function updateComment(id: Number, idComment: Number, comment: IComment, xAuthToken: string) {
    try {
        let res = await Database.getInstance().query('CALL update_comment(?,?,?,?)', [
            idComment,
            comment.comment,
            comment.date,
            comment.fkCommenter,
        ], JABCResponse.PERFORMANCE)
		return new JABCSuccess(JABCResponse.PERFORMANCE, `The comment was edited successfully`)
    } catch (error) {
        throw error;
    }
}


/**
 * updates the PerformancePlan
 * Will update an PerformancePlan with the provided data in body  if the PerformancePlan matches the [id]
 *
 * @param {Number} id Integer id of the searched PerformancePlan
 * @param {IPerformancePlan} performancePlan IPerformancePlan PerformancePlan data
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function updatePerformancePlan(id: Number, performancePlan: IPerformancePlan, xAuthToken: string) {
    let db;
	try {
		const client = (await Auth(xAuthToken)).employee
		if(client.adminLevel == IEmployee.adminLevelEnum.MANAGER){
			let managed = false;
			let managersOfEmployee = await getManagersByEmployee(id, xAuthToken)
			for(let manager of managersOfEmployee){
				if(manager.id === client.id){
					managed = true;
					break;
				}
			}
			if(!managed){
				throw new JABCError(JABCResponse.EMPLOYEE, 'The employee is not under the managed employees of the manager.')
			}
		}else if(client.adminLevel == IEmployee.adminLevelEnum.STAFF && client.id !== id){
			throw new JABCError(JABCResponse.EMPLOYEE, 'An employee with STAFF level, can not update a performance plan of other employee.')
		}
		db = Database.getInstance();
        await db.beginTransaction();

		let res = await db.rawQuery('CALL update_performance_plan(?,?,?)', [
			id,
			performancePlan.date,
			performancePlan.status
        ], JABCResponse.PERFORMANCE);

		await db.rawQuery('CALL delete_plan_sections(?)', [id], JABCResponse.PERFORMANCE);

        for (let section of performancePlan.sections) {
            await db.rawQuery('CALL create_employee_performance_plan_section(?,?,?)', [
                id,
                section.data,
                section.sectionName
            ], JABCResponse.PERFORMANCE);
        }

        await db.commit();
		await db.closeConnection();
		return new JABCSuccess(JABCResponse.PERFORMANCE, `The performance plan was updated successfully`);
	} catch (error) {
		try {
			await db.rollback();
			await db.closeConnection();
		} catch (err) { }
		throw error;
	}
}


/**
 * updates the PerformanceReview
 * Will update an PerformanceReview with the provided data in body  if the PerformanceReview matches the [id]
 *
 * @param {Number} id Integer id of the searched PerformanceReview
 * @param {IPerformanceReview} performanceReview IPerformanceReview PerformanceReview data
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function updatePerformanceReview(id: Number, performanceReview: IPerformanceReview, xAuthToken: string) {
    let db;
	try {
		const client = (await Auth(xAuthToken)).employee
		if(client.adminLevel == IEmployee.adminLevelEnum.MANAGER){
			let managed = false;
			let managersOfEmployee = await getManagersByEmployee(id, xAuthToken)
			for(let manager of managersOfEmployee){
				if(manager.id === client.id){
					managed = true;
					break;
				}
			}
			if(!managed){
				throw new JABCError(JABCResponse.EMPLOYEE, 'The employee is not under the managed employees of the manager.')
			}
		}else if(client.adminLevel == IEmployee.adminLevelEnum.STAFF && client.id !== id){
			throw new JABCError(JABCResponse.EMPLOYEE, 'An employee with STAFF level, can not update a performance review of other employee.')
		}
		db = Database.getInstance();
        await db.beginTransaction();

		let res = await db.rawQuery('CALL update_performance_review(?,?,?)', [
			id,
			performanceReview.date,
			performanceReview.status
        ], JABCResponse.PERFORMANCE);

        await db.rawQuery('CALL delete_review_sections(?)', [id], JABCResponse.PERFORMANCE);

        for (let section of performanceReview.sections) {
            await db.rawQuery('CALL create_employee_performance_review_section(?,?,?)', [
                id,
                section.data,
                section.sectionName
            ], JABCResponse.PERFORMANCE);
        }

        await db.commit();
		await db.closeConnection();
		return new JABCSuccess(JABCResponse.PERFORMANCE, `The performance review was updated successfully`);
	} catch (error) {
		try {
			await db.rollback();
			await db.closeConnection();
		} catch (err) { }
		throw error;
	}
}
