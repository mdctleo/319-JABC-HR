'use strict';
import {Document, IDocument, DocumentType, IDocumentType} from '../model/models'
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
			documentType.path,
			documentType.description,
		], JABCResponse.DOCUMENT)
		return new JABCSuccess(JABCResponse.DOCUMENT, `The document template was saved successfully`)
	}catch(error){
		throw error;
	}
}


/**
 * deletes Document
 * Will delete the Document that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched Document
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function deleteDocument(id : Number,  xAuthToken : String) {
    try{
		let res = await Database.getInstance().query('CALL delete_support_doc(?)', [id], JABCResponse.DOCUMENT)
		return new JABCSuccess(JABCResponse.DOCUMENT, `The document was deleted successfuly`)
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
 * gets an specific Document
 * Will return the Document that matches with the provided [id] from  the Employee with [id] 
 *
 * @param {Number} id of the searched Document
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IDocument>}
 **/
export async function getDocument(id : Number,  xAuthToken : String) {
    try{
		let res = await Database.getInstance().query('CALL get_support_doc(?)', [id], JABCResponse.DOCUMENT)
		return new Document(res[0][0][0])
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
 * updates the Document
 * Will update an Document with the provided data in body  if the Document matches the [id] 
 *
 * @param {Number} id of the searched Document
 * @param {IDocument} document Document data
 * @param {String} xAuthToken Auth Token that grants access to the system (optional)
 * @returns {Promise<IApiResponse>}
 **/
export async function updateDocument(id : Number, document : IDocument, xAuthToken : String) {
    try{
        let res = await Database.getInstance().query('CALL update_support_doc(?,?,?,?,?,?,?,?)', 
        [
            id,
            document.fkEmployee,
            document.fkDocumentType,
            document.createdDate,
            document.dueDate,
            document.expiryDate,
            document.path,
            document.description,
        ], JABCResponse.DOCUMENT)
		return new JABCSuccess(JABCResponse.DOCUMENT, `The support document was updated successfuly`)
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
            documentType.path,
        ], JABCResponse.DOCUMENT)
		return new JABCSuccess(JABCResponse.DOCUMENT, `The document template was updated successfuly`)
	}catch(error){
		throw error;
	}
}

