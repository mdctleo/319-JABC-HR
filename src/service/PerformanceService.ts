'use strict';
import { Comment, IComment, IPerformancePlan, IPerformanceReview, IPerformanceSection, PerformancePlan, PerformanceReview, PerformanceSection, IEmployee } from '../model/models'
import { JABCError, JABCSuccess, JABCResponse } from '../utils/ResponseManager'
import { Auth, getManagersByEmployee, isManagedBy } from '../service/EmployeeService'
import Database from '../database/Database';
import IDatabaseClient from '../database/IDatabaseClient';

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
        const performanceReview = await getPerformanceReview(id, xAuthToken)
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
        const comment_ = await getComment(id, idComment, xAuthToken)
        const client = (await Auth(xAuthToken)).employee
        if(comment_.fkCommenter != client.id && client.adminLevel != IEmployee.adminLevelEnum.HR_ADMIN){
            throw new JABCError(JABCResponse.EMPLOYEE, 'Can not edit a comment that is not yours.')
        }
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
        const performancePlan = await getPerformancePlan(id, xAuthToken)
        const client = (await Auth(xAuthToken)).employee
        if (client.adminLevel === IEmployee.adminLevelEnum.STAFF) {
            throw new JABCError(JABCResponse.EMPLOYEE, 'An employee with STAFF admin level can not delete performance plan');
        }
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
        const performanceReview = await getPerformanceReview(id, xAuthToken)
        const client = (await Auth(xAuthToken)).employee
        if (client.id == performanceReview.fkEmployee && client.adminLevel != IEmployee.adminLevelEnum.HR_ADMIN) {
            throw new JABCError(JABCResponse.EMPLOYEE, 'Can not delete your own performance review')
        }
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
        const performanceReview = await getPerformanceReview(id, xAuthToken)
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
        const performanceReview = await getPerformanceReview(id, xAuthToken)
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
        const client = (await Auth(xAuthToken)).employee
        let res = await Database.getInstance().query('CALL get_performance_plan(?)', [id], JABCResponse.PERFORMANCE)
        let performancePlan = new PerformancePlan(res[0][0][0])
        if (client.id !== performancePlan.fkEmployee) {
            if (client.adminLevel == IEmployee.adminLevelEnum.MANAGER) {
                await isManagedBy(performancePlan.fkEmployee, client.id)
            } else if (client.adminLevel == IEmployee.adminLevelEnum.STAFF) {
                throw new JABCError(JABCResponse.EMPLOYEE, 'An employee with STAFF admin level can not manage other employee\'s performance plan.')
            }
        }
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
        const client = (await Auth(xAuthToken)).employee
        let res = await Database.getInstance().query('CALL get_performance_review(?)', [id], JABCResponse.PERFORMANCE)
        let performanceReview = new PerformanceReview(res[0][0][0])
        if (client.adminLevel == IEmployee.adminLevelEnum.MANAGER && client.id !== performanceReview.fkEmployee) {
			await isManagedBy(performanceReview.fkEmployee, client.id)
		}else if(client.adminLevel == IEmployee.adminLevelEnum.STAFF && client.id != performanceReview.fkEmployee){
            throw new JABCError(JABCResponse.EMPLOYEE, 'An employee with STAFF admin level can not manage other employee\'s performance review.')
        }

        if (performanceReview.status == 0 && performanceReview.fkEmployee === client.id && client.adminLevel !== IEmployee.adminLevelEnum.HR_ADMIN) {
            throw new JABCError(JABCResponse.EMPLOYEE,'An employee can not see its own performance review when unpublished' )
        }

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
        const comment_ = await getComment(id, idComment, xAuthToken)
        const client = (await Auth(xAuthToken)).employee
        if(comment_.fkCommenter != client.id && client.adminLevel != IEmployee.adminLevelEnum.HR_ADMIN){
            throw new JABCError(JABCResponse.EMPLOYEE, 'Can not edit a comment that is not yours.')
        }
        let res = await Database.getInstance().query('CALL update_comment(?,?,?,?)', [
            idComment,
            comment.comment,
            comment.date,
            client.id
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
    let db: IDatabaseClient;
    let conn: any;
	try {
		const performancePlan_ = await getPerformancePlan(id, xAuthToken)
        db = Database.getInstance();
        conn = await db.initConnection();
        await db.beginTransaction(conn);

		let res = await db.rawQuery(conn, 'CALL update_performance_plan(?,?,?,?,?)', [
			id,
			performancePlan.startYear,
            performancePlan.endYear,
            performancePlan.createDate,
			performancePlan.status
        ], JABCResponse.PERFORMANCE);

		await db.rawQuery(conn, 'CALL delete_plan_sections(?)', [id], JABCResponse.PERFORMANCE);

        if (performancePlan.sections != null){
            for (let section of performancePlan.sections) {
                await db.rawQuery(conn, 'CALL create_employee_performance_plan_section(?,?,?)', [
                    id,
                    section.data,
                    section.sectionName
                ], JABCResponse.PERFORMANCE);
            }
        }

        await db.commit(conn);
		return new JABCSuccess(JABCResponse.PERFORMANCE, `The performance plan was updated successfully`);
	} catch (error) {
		try {
			await db.rollback(conn)
		} catch (err) { }
		throw error;
	} finally {
        try {
			await db.closeConnection(conn);
        } catch (err) { }
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
    let db: IDatabaseClient;
    let conn: any;
	try {
        const performanceReview_ = await getPerformanceReview(id, xAuthToken)
        const client = (await Auth(xAuthToken)).employee
        if (client.id == performanceReview_.fkEmployee && client.adminLevel != IEmployee.adminLevelEnum.HR_ADMIN) {
            throw new JABCError(JABCResponse.EMPLOYEE, 'Can not update your own performance review')
        }

        db = Database.getInstance();
        conn = await db.initConnection();
        await db.beginTransaction(conn);

		let res = await db.rawQuery(conn, 'CALL update_performance_review(?,?,?)', [
            id,
            performanceReview.createDate,
			performanceReview.status
        ], JABCResponse.PERFORMANCE);

        await db.rawQuery(conn, 'CALL delete_review_sections(?)', [id], JABCResponse.PERFORMANCE);

        if (performanceReview.sections != null){
            for (let section of performanceReview.sections) {
                await db.rawQuery(conn, 'CALL create_employee_performance_review_section(?,?,?)', [
                    id,
                    section.data,
                    section.sectionName
                ], JABCResponse.PERFORMANCE);
            }
        }

        await db.commit(conn);
		return new JABCSuccess(JABCResponse.PERFORMANCE, `The performance review was updated successfully`);
	} catch (error) {
		try {
			await db.rollback(conn)
		} catch (err) { }
		throw error;
	} finally {
        try {
			await db.closeConnection(conn);
        } catch (err) { }
    }
}
