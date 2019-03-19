'use strict';
import {OnboardingTask, IOnboardingTask, DocumentType, IDocumentType, IFAQ} from '../model/models'
import { JABCError, JABCSuccess, JABCResponse } from '../utils/ResponseManager'
import Database from '../database/Database';

/**
 * creates a new DocumentType
 * Will create a new DocumentType with the provided data in body
 *
 * @param {IDocumentType} documentType DocumentType data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function createDocumentType(documentType : IDocumentType, xAuthToken : String) {
  try{
		let res = await Database.getInstance().query('CALL create_doc_type(?,?)', [
			documentType.name,
			documentType.description,
		], JABCResponse.ONBOARDING)
		return new JABCSuccess(JABCResponse.ONBOARDING, `The document template was saved successfully`)
	}catch(error){
		throw error;
	}
}

/**
 * creates a new FAQ
 * Will create a new FAQ with the provided data in body
 *
 * faq IFAQ FAQ data
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function createFAQ(faq : IFAQ, xAuthToken : String) {
 	try{
	   // STRETCH: Implement
		throw 'NOT IMPLEMENTED'
   	}catch(error){
	   throw error;
   	}
}


/**
 * deletes DocumentType
 * Will delete an DocumentType if the DocumentType matches the [id]
 *
 * @param {Number} id of the DocumentType to be deleted
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deleteDocumentType(id : Number,  xAuthToken : String) {
    try{
		let res = await Database.getInstance().query('CALL delete_doc_type(?)', [id], JABCResponse.ONBOARDING)
		return new JABCSuccess(JABCResponse.ONBOARDING, `The document template was deleted successfuly`)
	}catch(error){
		throw error;
	}
}


/**
 * deletes FAQ
 * Will delete an FAQ if the FAQ matches the [id]
 *
 * @param {Number} id Integer id of the FAQ to be deleted
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deleteFAQ(id : Number,  xAuthToken : String) {
	try{
	   // STRETCH: Implement
		throw 'NOT IMPLEMENTED'
   	}catch(error){
	   throw error;
   	}
}


/**
 * deletes OnboardingTask
 * Will delete the OnboardingTask that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched OnboardingTask
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deleteOnboardingTask(id : Number,  xAuthToken : String) {
    try{
		let res = await Database.getInstance().query('CALL delete_onboarding_task(?)', [id], JABCResponse.ONBOARDING)
		return new JABCSuccess(JABCResponse.ONBOARDING, `The document was deleted successfuly`)
	}catch(error){
		throw error;
	}
}


/**
 * gets all the OnboardingTasks
 * Will return all the OnboardingTasks on the system. If [start] and [end] are provided, it will return all OnboardingTasks with a due date between those dates If [status] is provided, it will return the onboarding tasks that matches that status (0:active, 1:done) 
 *
 * xAuthToken String Auth Token that grants access to the system (optional)
 * start date Search onboarding tasks with a due date after this date, if this isn't provided there won't be any filtering (optional)
 * end date Search onboarding tasks with a due date before this date, if this isn't provided there won't be any filtering (optional)
 * status Integer If provided will return the onboarding tasks that matches that status (0:active, 1:done) (optional)
 * returns IOnboardingTask
 **/
exports.getAllOnboardingTasks = function(xAuthToken: String, start: String, end: String, status: String) {
	try{
		// TODO: Implement
		throw 'NOT IMPLEMENTED'
	}catch(error){
		throw error;
	}
}


/**
 * gets an specific DocumentType
 * Will return the DocumentType that matches with the provided [id]
 *
 * @param {Number} id of the searched DocumentType
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IDocumentType>}
 **/
export async function getDocumentType(id : Number,  xAuthToken : String) {
    try{
		let res = await Database.getInstance().query('CALL get_doc_type(?)', [id], JABCResponse.ONBOARDING)
		return new DocumentType(res[0][0][0])
	}catch(error){
		throw error;
	}
}


/**
 * gets an specific DocumentType file
 * Will return the DocumentType File that matches with the provided [id] 
 *
 * @param {Number} id Integer id of the searched DocumentType
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<File>}
 **/
export async function getDocumentTypeFile(id: Number, xAuthToken: string) {
	try{
		let documentType = (await Database.getInstance().query('CALL get_doc_type(?)', [id], JABCResponse.ONBOARDING))[0][0][0]
		if(documentType.TEMPLATE_FILE == null || documentType.STATUS == 0) 
			throw new JABCError(JABCResponse.ONBOARDING, 'The file doesn\'t exists')
		return {
			buffer: documentType.TEMPLATE_FILE,
			mimetype: documentType.MIME_TYPE,
		}
   	}catch(error){
	   throw error;
   	}
}


/**
 * get all the DocumentTypes
 * This returns all the DocumentTypes of the system. 
 *
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<[]>}
 **/
export async function getDocumentTypes(xAuthToken : String) {
    try{
		let res = await Database.getInstance().query('CALL get_all_doc_types()', [], JABCResponse.ONBOARDING)
		return DocumentType.DocumentTypes(res[0][0])
	}catch(error){
		throw error;
	}
}


/**
 * gets an specific FAQ
 * Will return the FAQ that matches with the provided [id]
 *
 * @param {Number} id Integer id of the searched FAQ
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IFAQ>}
 **/
export async function getFAQ(id : Number,  xAuthToken : String) {
	try{
	   // STRETCH: Implement
		throw 'NOT IMPLEMENTED'
   	}catch(error){
	   throw error;
   	}
}


/**
 * get all the FAQs
 * This returns all the FAQs of the system. 
 *
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<List>}
 **/
export async function getFAQs(xAuthToken : String) {
	try{
	   // STRETCH: Implement
		throw 'NOT IMPLEMENTED'
   	}catch(error){
	   throw error;
   	}
}


/**
 * gets an specific OnboardingTask
 * Will return the OnboardingTask that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched OnboardingTask
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IOnboardingTask>}
 **/
export async function getOnboardingTask(id : Number,  xAuthToken : String) {
    try{
		let res = await Database.getInstance().query('CALL get_onboarding_task(?)', [id], JABCResponse.ONBOARDING)
		return new OnboardingTask(res[0][0][0])
	}catch(error){
		throw error;
	}
}


/**
 * gets an specific OnboardingTask file
 * Will return the OnboardingTask File that matches with the provided [id] 
 *
 * @param {Number} id Integer id of the searched OnboardingTask
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<File>}
 **/
export async function getOnboardingTaskFile(id: Number, xAuthToken: string) {
	try{
		let onboardingTask = (await Database.getInstance().query('CALL get_onboarding_task(?)', [id], JABCResponse.ONBOARDING))[0][0][0]
		if(onboardingTask.ACTUAL_FILE == null || onboardingTask.STATUS == 0) 
			throw new JABCError(JABCResponse.ONBOARDING, 'The file doesn\'t exists')
		return {
			buffer: onboardingTask.ACTUAL_FILE,
			mimetype: onboardingTask.MIME_TYPE,
		}
   	}catch(error){
	   throw error;
   	}
}


/**
 * updates the DocumentType
 * Will update an DocumentType with the provided data in body if the DocumentType matches the [id]
 *
 * @param {Number} id of the DocumentType to be updated
 * @param {IDocumentType} documentType DocumentType data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function updateDocumentType(id : Number, documentType : IDocumentType, xAuthToken : String) {
    try{
        let res = await Database.getInstance().query('CALL update_doc_type(?,?,?)', 
        [
            id,
            documentType.name,
            documentType.description,
        ], JABCResponse.ONBOARDING)
		return new JABCSuccess(JABCResponse.ONBOARDING, `The document template was updated successfuly`)
	}catch(error){
		throw error;
	}
}


/**
 * updates the FAQ
 * Will update an FAQ with the provided data in body if the FAQ matches the [id]
 *
 * @param {Number} id Integer id of the FAQ to be updated
 * faq IFAQ FAQ data
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function updateFAQ(id : Number, faq : IFAQ, xAuthToken : String) {
	try{
	   // STRETCH: Implement
		throw 'NOT IMPLEMENTED'
   	}catch(error){
	   throw error;
   	}	
}


/**
 * updates the OnboardingTask
 * Will update an OnboardingTask with the provided data in body  if the OnboardingTask matches the [id] 
 *
 * @param {Number} id of the searched OnboardingTask
 * @param {IOnboardingTask} onboardingTask OnboardingTask data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function updateOnboardingTask(id : Number, onboardingTask : IOnboardingTask, xAuthToken : String) {
    try{
		onboardingTask = OnboardingTask.Prepare(onboardingTask)
        let res = await Database.getInstance().query('CALL update_onboarding_task(?,?,?,?,?,?,?,?)', 
        [
            id,
            onboardingTask.fkEmployee,
            onboardingTask.fkDocumentType,
            onboardingTask.createdDate,
            onboardingTask.dueDate,
            onboardingTask.expiryDate,
			onboardingTask.description,
			onboardingTask.requireDoc,
        ], JABCResponse.ONBOARDING)
		return new JABCSuccess(JABCResponse.ONBOARDING, `The onboarding task was updated successfuly`)
	}catch(error){
		throw error;
	}
}


/**
 * uploads the template to the DocumentType
 * Will update an DocumentType with the provided file as a template if the DocumentType matches the [id]
 *
 * @param {Number} id Integer id of the DocumentType to be updated
 * @param {string} xAuthToken String Auth Token that grants access to the system (optional)
 * @param {any} document File The document file to be used as a template (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function uploadTemplateDocumentType(id : Number, xAuthToken : String,  document : any) {
	try{
		if(document){
			if(document.buffer.length > process.env.MAX_FILE)
				throw new JABCError(JABCResponse.ONBOARDING, 'The file exceeded the size limit of 16 mb')
		}else{
			document = {buffer: null, mimetype: null};
		}
		let res = await Database.getInstance().query('CALL upload_doc_type(?,?,?)', [
			id,
			document.buffer,
			document.mimetype
		], JABCResponse.EMPLOYEE)
		return new JABCSuccess(JABCResponse.EMPLOYEE, `The onboarding task was saved successfully`)
	}catch(error){
		throw error;
	}
}

