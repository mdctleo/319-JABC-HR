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
		let res = await Database.getInstance().query('CALL create_doc_type(?,?,?)', [
			documentType.name,
			documentType.file,
			documentType.description,
		], JABCResponse.DOCUMENT)
		return new JABCSuccess(JABCResponse.DOCUMENT, `The document template was saved successfully`)
	}catch(error){
		throw error;
	}
}

/**
 * creates a new FAQ
 * Will create a new FAQ with the provided data in body
 *
 * faq IFAQ FAQ data
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
export async function createFAQ(faq : IFAQ, xAuthToken : String) {
 	try{
	   // JATJ: Implement
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
		let res = await Database.getInstance().query('CALL delete_doc_type(?)', [id], JABCResponse.DOCUMENT)
		return new JABCSuccess(JABCResponse.DOCUMENT, `The document template was deleted successfuly`)
	}catch(error){
		throw error;
	}
}


/**
 * deletes FAQ
 * Will delete an FAQ if the FAQ matches the [id]
 *
 * id Integer id of the FAQ to be deleted
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
export async function deleteFAQ(id : Number,  xAuthToken : String) {
	try{
	   // JATJ: Implement
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
		let res = await Database.getInstance().query('CALL delete_support_doc(?)', [id], JABCResponse.DOCUMENT)
		return new JABCSuccess(JABCResponse.DOCUMENT, `The document was deleted successfuly`)
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
		let res = await Database.getInstance().query('CALL get_doc_type(?)', [id], JABCResponse.DOCUMENT)
		return new DocumentType(res[0][0][0])
	}catch(error){
		throw error;
	}
}


/**
 * gets an specific DocumentType file
 * Will return the DocumentType File that matches with the provided [id] 
 *
 * id Integer id of the searched DocumentType
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns File
 **/
export async function getDocumentTypeFile(id: Number, xAuthToken: string) {
	try{
	   // JATJ: Implement
		throw 'NOT IMPLEMENTED'
   	}catch(error){
	   throw error;
   	}
¡}


/**
 * get all the DocumentTypes
 * This returns all the DocumentTypes of the system. 
 *
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<[]>}
 **/
export async function getDocumentTypes(xAuthToken : String) {
    try{
		let res = await Database.getInstance().query('CALL get_all_doc_types()', [], JABCResponse.DOCUMENT)
		return DocumentType.DocumentTypes(res[0][0])
	}catch(error){
		throw error;
	}
}


/**
 * gets an specific FAQ
 * Will return the FAQ that matches with the provided [id]
 *
 * id Integer id of the searched FAQ
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IFAQ
 **/
export async function getFAQ(id : Number,  xAuthToken : String) {
	try{
	   // JATJ: Implement
		throw 'NOT IMPLEMENTED'
   	}catch(error){
	   throw error;
   	}
}


/**
 * get all the FAQs
 * This returns all the FAQs of the system. 
 *
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns List
 **/
export async function getFAQs(xAuthToken : String) {
	try{
	   // JATJ: Implement
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
		let res = await Database.getInstance().query('CALL get_support_doc(?)', [id], JABCResponse.DOCUMENT)
		return new OnboardingTask(res[0][0][0])
	}catch(error){
		throw error;
	}
}


/**
 * gets an specific OnboardingTask file
 * Will return the OnboardingTask File that matches with the provided [id] 
 *
 * id Integer id of the searched OnboardingTask
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns File
 **/
export async function getOnboardingTaskFile(id: Number, xAuthToken: string) {
	try{
	   // JATJ: Implement
		throw 'NOT IMPLEMENTED'
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
        let res = await Database.getInstance().query('CALL update_doc_type(?,?,?,?)', 
        [
            id,
            documentType.name,
            documentType.description,
            documentType.file,
        ], JABCResponse.DOCUMENT)
		return new JABCSuccess(JABCResponse.DOCUMENT, `The document template was updated successfuly`)
	}catch(error){
		throw error;
	}
}


/**
 * updates the FAQ
 * Will update an FAQ with the provided data in body if the FAQ matches the [id]
 *
 * id Integer id of the FAQ to be updated
 * faq IFAQ FAQ data
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
export async function updateFAQ(id : Number, faq : IFAQ, xAuthToken : String) {
	try{
	   // JATJ: Implement
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
        let res = await Database.getInstance().query('CALL update_support_doc(?,?,?,?,?,?,?,?)', 
        [
            id,
            onboardingTask.fkEmployee,
            onboardingTask.fkDocumentType,
            onboardingTask.createdDate,
            onboardingTask.dueDate,
            onboardingTask.expiryDate,
            onboardingTask.file,
            onboardingTask.description,
        ], JABCResponse.DOCUMENT)
		return new JABCSuccess(JABCResponse.DOCUMENT, `The support document was updated successfuly`)
	}catch(error){
		throw error;
	}
}


/**
 * uploads the template to the DocumentType
 * Will update an DocumentType with the provided file as a template if the DocumentType matches the [id]
 *
 * id Integer id of the DocumentType to be updated
 * xAuthToken String Auth Token that grants access to the system (optional)
 * document File The document file to be used as a template (optional)
 * returns IApiResponse
 **/
export async function uploadTemplateDocumentType(id : Number, xAuthToken : String,  document : any) {
	try{
	   // JATJ: Implement
		throw 'NOT IMPLEMENTED'
   	}catch(error){
	   throw error;
   	}
}

