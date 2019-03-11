'use strict';
import { Employee, Performance, Document, Vacation, IDocument, IEmployee, IPerformance, IVacation, EmployeeHistory } from '../model/models'
import { JABCError, JABCSuccess, JABCResponse } from '../utils/ResponseManager'
import * as jwt from 'jsonwebtoken';
import { ILogin } from '../model/iLogin';
import { ILoginResponse } from '../model/iLoginResponse';
import Database from '../database/Database';

// TODO: SAVE KEY ON .ENV FILE
const KEY = 'JABC IS SUPER SECURE';

/**
 * creates a new Document for the employee with [id]
 * Will create a new Document with the provided data in body
 *
 * @param {Number} id of the searched Employee
 * @param {IDocument} document Document data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function createDocument (id: Number, document: IDocument, xAuthToken: String) {
	try{
		let res = await Database.getInstance().query('CALL create_support_doc(?,?,?,?,?,?,?,?)', [
			id,
			document.fkDocumentType,
			document.createdDate,
			document.dueDate,
			document.expiryDate,
			document.path,
			document.description,
		], JABCResponse.EMPLOYEE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, `The document was saved successfully`)
	}catch(error){
		throw error;
	}
}


/**
 * creates a new Employee
 * Will create a new Employee with the provided data in body
 *
 * @param {IEmployee} employee Employee data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function createEmployee (employee: IEmployee, xAuthToken: String) {
	try{
		employee = Employee.Prepare(employee)
		let res = await Database.getInstance().query('CALL create_employee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
			null,
			employee.role,
			employee.sin,
			employee.email,
			employee.firstname,
			employee.lastname,
			employee.address,
			employee.birthdate,
			employee.vacationDays,
			employee.remainingVacationDays,
			employee.fte,
			employee.status,
			employee.password,
			employee.salary,
			employee.dateJoined,
			employee.adminLevel,
			employee.phoneNumber,
		], JABCResponse.EMPLOYEE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, `The employee, ${employee.firstname} ${employee.lastname}, was registered successfully`)
	}catch(error){
		throw error;
	}
}


/**
 * creates a new Performance for the employee with [id]
 * Will create a new Performance with the provided data in body
 *
 * @param {Number} id of the searched Employee
 * @param {IPerformance} performance Performance data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function createPerformance (id: Number, performance: IPerformance, xAuthToken: String) {
	try{
		let res = await Database.getInstance().query('CALL create_employee_performance(?,?,?)', [
			id,
			performance.date,
			performance.status,
		], JABCResponse.EMPLOYEE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, `The performance review was successfully created`)
	}catch(error){
		throw error;
	}
}


/**
 * creates a new Vacation for the employee with [id]
 * Will create a new Vacation with the provided data in body
 *
 * @param {Number} id of the searched Employee
 * @param {IVacation} vacation Vacation data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function createVacation (id: Number, vacation: IVacation, xAuthToken: String) {
	try{
		let res = await Database.getInstance().query('CALL create_employee_vacation(?,?,?,?,?)', [
			id,
			vacation.fkApprover,
			vacation.requestedDays,
			vacation.requestedStatus,
			vacation.date
		], JABCResponse.EMPLOYEE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, `The vacation request was successfully created, wait for a manager to approve it`)
	}catch(error){
		throw error;
	}
}


/**
 * deletes Employee
 * Will delete (deactivate) an Employee if the Employee matches the [id]
 *
 * @param {Number} id of the Employee to be deleted
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {Number} idAdmin Who is deleting the employee (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deleteEmployee (id: Number, xAuthToken: String, idAdmin: Number) {
	try{
		throw new JABCError(JABCResponse.EMPLOYEE, 'MISSING STORED PROCEDURE FOR ENTRY POINT deleteEmployee')
	}catch(error){
		throw error;
	}
}


/**
 * get all the Documents of the employee with [id]
 * This returns all the Documents of the system.  If [term] is provided this returns the Documents of the Employee that match with the [term].  
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {String} term Search term for filter the data (optional)
 * @returns {Promise<[]>}
 **/
export async function getDocuments (id: Number, xAuthToken: String, term: String) {
	try{
		let res = await Database.getInstance().query('CALL get_employee_docs(?)', [id], JABCResponse.EMPLOYEE)
		return Document.Documents(res[0][0])
	}catch(error){
		throw error;
	}
}


/**
 * gets an specific Employee
 * Will return the Employee that matches with the provided [id]
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IEmployee>}
 **/
export async function getEmployee (id: Number, xAuthToken: String) {
	try{
		let res = await Database.getInstance().query('CALL get_employee(?)', [id], JABCResponse.EMPLOYEE)
		return new Employee(res[0][0][0])
	}catch(error){
		throw error;
	}
}


/**
 * get all the history of the employee with [id]
 * This returns all the history data of the employee with [id].  
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<[]>}
 **/
export async function getEmployeeHistory (id: Number, xAuthToken: String) {
	try{
		let res = await Database.getInstance().query('CALL get_employee_history(?)', [id], JABCResponse.EMPLOYEE)
		return EmployeeHistory.Employees(res[0][0])
	}catch(error){
		throw error;
	}
}


/**
 * get all the Employees
 * This returns all the Employees of the system.  If [term] is provided this returns the Employees of the system that match with the [term]. 
 *
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {String} term Search term for filter the data (optional)
 * @returns {Promise<[]>}
 **/
export async function getEmployees (xAuthToken: String, term: String) {
	try{
		let res = await Database.getInstance().query('CALL get_all_employees()', [], JABCResponse.EMPLOYEE)
		return Employee.Employees(res[0][0])
	}catch(error){
		throw error;
	}
}


/**
 * get all the Employees that are managed by employee with [idManager]
 * This returns all the Employees that are managed by employee with [idManager]. 
 *
 * @param {Number} idManager Employee that will manage the employee with [id]
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<[]>}
 **/
export async function getEmployeesByManager (idManager: Number, xAuthToken: String) {
	try{
		let res = await Database.getInstance().query('CALL get_manager_employees(?)', [idManager], JABCResponse.EMPLOYEE)
		return Employee.Employees(res[0][0])
	}catch(error){
		throw error;
	}
}


/**
 * get all the Performances of the employee with [id]
 * This returns all the Performances of the system. If [term] is provided this returns the Performances of the Employee that match with the [term].  
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {String} term Search term for filter the data (optional)
 * @returns {Promise<[]>}
 **/
export async function getPerformances (id: Number, xAuthToken: String, term: String) {
	try{
		let res = await Database.getInstance().query('CALL get_performance_reviews(?)', [id], JABCResponse.EMPLOYEE)
		return Performance.Performances(res[0][0])
	}catch(error){
		throw error;
	}
}


/**
 * get all the Vacations of the employee with [id]
 * This returns all the Vacations of the system.  If [term] is provided this returns the Vacations of the Employee that match with the [term].  
 *
 * @param {Number} id of the searched Employee
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {String} term Search term for filter the data (optional)
 * @returns {Promise<[]>}
 **/
export async function getVacations (id: Number, xAuthToken: String, term: String) {
	try{
		let res = await Database.getInstance().query('CALL get_employee_vacation(?)', [id], JABCResponse.EMPLOYEE)
		return Vacation.Vacations(res[0][0])
	}catch(error){
		throw error;
	}
}


/**
 * Links employee to his manager
 * Sets the employee with [id] to be managed by the employee with [idManager]
 *
 * @param {Number} id Employee to be managed by another
 * @param {Number} idManager Employee that will manage the employee with [id]
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function linkEmployeeManager (id: Number, idManager: Number, xAuthToken: String) {
	try{
		let res = await Database.getInstance().query('CALL link_employee_manager(?,?)', [id, idManager], JABCResponse.EMPLOYEE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, `The employee, was assigned to the manager`)
	}catch(error){
		throw error;
	}
}

/**
 * sign in the employee into the system
 *
 * @param {ILogin} body ILogin Employee login data
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<ILoginResponse>}
 **/
export async function login (body: ILogin, xAuthToken: string) {
	try{
		let res = await Database.getInstance().query('CALL login(?,?)', [body.email, body.password], JABCResponse.EMPLOYEE)
		var employee = new Employee(res[0][0][0]);
		var token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 8),
			employee: employee
		}, KEY);
		let response = new JABCSuccess(JABCResponse.EMPLOYEE, `Welcome ${employee.firstname} ${employee.lastname}`)
		var loginResponse: ILoginResponse = {
			message: response.message,
			type: response.type,
			responseCode: response.responseCode,
			token: token,
			employee: employee
		}
		return loginResponse;
	}catch(error){
		throw error;
	}
}


/**
 * Unlinks employee from his manager
 * Deletes the relation between employee with [id] and the employee with [idManager]
 *
 * @param {Number} id Employee to be unmanaged by another
 * @param {Number} idManager Employee that will stop managing the employee with [id]
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function unlinkEmployeeManager (id: Number, idManager: Number, xAuthToken: String) {
	try{
		let res = await Database.getInstance().query('CALL unlink_employee_manager(?,?)', [id, idManager], JABCResponse.EMPLOYEE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, `The employee, was unassigned from the manager`)
	}catch(error){
		throw error;
	}
}


/**
 * updates the Employee
 * Will update an Employee with the provided data in body if the Employee matches the [id]
 *
 * @param {Number} id of the Employee to be updated
 * @param {IEmployee} employee Employee data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @param {Number} idAdmin Who is updating the employee (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function updateEmployee (id: Number, employee: IEmployee, xAuthToken: String, idAdmin: Number) {
	try{
		employee = Employee.Prepare(employee)
		let res = await Database.getInstance().query('CALL update_employee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
			id,
			(idAdmin) ? idAdmin : null,
			employee.fkRole,
			employee.sin,
			employee.email,
			employee.firstname,
			employee.lastname,
			employee.address,
			employee.birthdate,
			employee.vacationDays,
			employee.remainingVacationDays,
			employee.fte,
			employee.status,
			employee.password,
			employee.salary,
			employee.dateJoined,
			employee.adminLevel,
			employee.phoneNumber,
		], JABCResponse.EMPLOYEE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, `The employee, ${employee.firstname} ${employee.lastname}, was updated successfully`)
	}catch(error){
		throw error;
	}
}

/**
 * Authorizes the employee with a jwt [token] string
 *
 * @export
 * @param {string} token JWT token to authorize
 * @returns {Promise<ILoginResponse>}
 */
export async function Auth(token: string): Promise<ILoginResponse> {
	try {
		if (token === undefined) {
			throw new JABCError(JABCResponse.UNAUTHORIZED)
		}
		return await this.JWTVerify(token, KEY)
	} catch (error) {
		throw error
	}
}

/**
 * Helper function to the JWT Auth function
 * It verifies the token and logs the user into the system
 *
 * @export
 * @param {string} token JWT token to authorize
 * @param {string} key Key to unlock the token
 * @returns {Promise<ILoginResponse>}
 */
export async function JWTVerify(token: string, key: string): Promise<ILoginResponse> {
	return new Promise((resolve, reject) => {
		// JWT authentication
		jwt.verify(token, key, (err: any, decoded: any) => {
			// Check error in JWT
			if (err) {
				reject(new JABCError(JABCResponse.UNAUTHORIZED))
				return;
			}
			// Check session expired
			let time = Math.round((new Date()).getTime() / 1000)
			if (decoded.exp < time) {
				reject(new JABCError(JABCResponse.UNAUTHORIZED))
				return;
			}
			// Verify if user is in system
			login({
				email: decoded.employee.email,
				password: decoded.employee.password,
			}, token).then((loginResponse: ILoginResponse) => {
				resolve(loginResponse)
			}).catch((error: any) => {
				reject(new JABCError(JABCResponse.UNAUTHORIZED))
			})
		})
	})
}