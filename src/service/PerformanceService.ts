'use strict';
import { IComment, IPerformancePlan, IPerformanceReview, IPerformanceSection } from '../model/models'

/**
 * creates a new Comment for the PerformanceReview with [id]
 * Will create a new Comment with the provided data in body, to the PerformanceReview with [id]
 *
 * id Integer id of the PerformanceReview to be commented
 * comment IComment Comment data
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
exports.createComment = function (id: Number, comment: IComment, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * deletes Comment
 * Will delete an Comment if the Comment matches the [idComment]
 *
 * id Integer id of the PerformanceReview with comments
 * idComment Integer idComment of the Comment to be deleted
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
exports.deleteComment = function (id: Number, idComment: Number, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * deletes PerformancePlan
 * Will delete the PerformancePlan that matches with the provided [id] from  the Employee with [id] 
 *
 * id Integer id of the searched PerformancePlan
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
exports.deletePerformancePlan = function (id: Number, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * deletes PerformanceReview
 * Will delete the PerformanceReview that matches with the provided [id] from  the Employee with [id] 
 *
 * id Integer id of the searched PerformanceReview
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
exports.deletePerformanceReview = function (id: Number, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * gets an specific Comment
 * Will return the Comment that matches with the provided [idComment]
 *
 * id Integer id of the PerformanceReview with comments
 * idComment Integer idComment of the searched Comment
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IComment
 **/
exports.getComment = function (id: Number, idComment: Number, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * get all the Comments from a PerformanceReview with [id]
 * This returns all the Comments of the PerformanceReview with [id]. 
 *
 * id Integer id of the PerformanceReview with comments
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns List
 **/
exports.getComments = function (id: Number, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * gets an specific PerformancePlan
 * Will return the PerformancePlan that matches with the provided [id] from  the Employee with [id] 
 *
 * id Integer id of the searched PerformancePlan
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IPerformancePlan
 **/
exports.getPerformancePlan = function (id: Number, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * gets an specific PerformanceReview
 * Will return the PerformanceReview that matches with the provided [id] from  the Employee with [id] 
 *
 * id Integer id of the searched PerformanceReview
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IPerformanceReview
 **/
exports.getPerformanceReview = function (id: Number, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * updates the Comment
 * Will update an Comment with the provided data in body if the Comment matches the [idComment]
 *
 * id Integer id of the PerformanceReview with comments
 * idComment Integer idComment of the Comment to be updated
 * comment IComment Comment data
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
exports.updateComment = function (id: Number, idComment: Number, comment: IComment, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * updates the PerformancePlan
 * Will update an PerformancePlan with the provided data in body  if the PerformancePlan matches the [id] 
 *
 * id Integer id of the searched PerformancePlan
 * performancePlan IPerformancePlan PerformancePlan data
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
exports.updatePerformancePlan = function (id: Number, performancePlan: IPerformancePlan, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}


/**
 * updates the PerformanceReview
 * Will update an PerformanceReview with the provided data in body  if the PerformanceReview matches the [id] 
 *
 * id Integer id of the searched PerformanceReview
 * performanceReview IPerformanceReview PerformanceReview data
 * xAuthToken String Auth Token that grants access to the system (optional)
 * returns IApiResponse
 **/
exports.updatePerformanceReview = function (id: Number, performanceReview: IPerformanceReview, xAuthToken: string) {
    try {
        throw 'NOT IMPLEMENTED'
    } catch (error) {
        throw error;
    }
}

