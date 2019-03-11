'use strict';
import { IComment, IPerformance } from '../model/models'

export default class PerformanceService {

    constructor(){

    }

    /**
     * creates a new Comment for the Performance with [id]
     * Will create a new Comment with the provided data in body, to the Performance with [id]
     *
     * @param {Number} id of the Performance to be commented
     * @param {IComment} comment Comment data
     * @param {String} xAuthToken Auth Token that grants access to the system (optional)
     * @returns {Promise<IApiResponse>}
     **/
    public createComment (id: Number, comment: IComment, xAuthToken: String): Promise<any> {
        return new Promise(function (resolve, reject) {
            var examples = {
                "debugMessage": "This is a debug message",
                "type": "ERROR",
                "message": "Unauthorized access to the API",
                "responseCode": 0
            };
            resolve(examples);
        });
    };


    /**
     * deletes Comment
     * Will delete an Comment if the Comment matches the [idComment]
     *
     * @param {Number} id of the Performance with comments
     * @param {Number} idComment idComment of the Comment to be deleted
     * @param {String} xAuthToken Auth Token that grants access to the system (optional)
     * @returns {Promise<IApiResponse>}
     **/
    public deleteComment(id: Number, idComment: Number, xAuthToken: String): Promise<any> {
        return new Promise(function (resolve, reject) {
            var examples = {
                "debugMessage": "This is a debug message",
                "type": "ERROR",
                "message": "Unauthorized access to the API",
                "responseCode": 0
            };
            resolve(examples);
        });
    };


    /**
     * deletes Performance
     * Will delete the Performance that matches with the provided [id] from  the Employee with [id]
     *
     * @param {Number} id of the searched Performance
     * @param {String} xAuthToken Auth Token that grants access to the system (optional)
     * @returns {Promise<IApiResponse>}
     **/
    public deletePerformance(id: Number, xAuthToken: String): Promise<any> {
        return new Promise(function (resolve, reject) {
            var examples = {
                "debugMessage": "This is a debug message",
                "type": "ERROR",
                "message": "Unauthorized access to the API",
                "responseCode": 0
            };
            resolve(examples);
        });
    };


    /**
     * gets an specific Comment
     * Will return the Comment that matches with the provided [idComment]
     *
     * @param {Number} id of the Performance with comments
     * @param {Number} idComment idComment of the searched Comment
     * @param {String} xAuthToken Auth Token that grants access to the system (optional)
     * @returns {Promise<IComment>}
     **/
    public getComment(id: Number, idComment: Number, xAuthToken: String): Promise<any> {
        return new Promise(function (resolve, reject) {
            var examples = {
                "fkCommenter": 1,
                "date": 1,
                "fkPerformance": 1,
                "comment": "comment",
                "id": 1
            };
            resolve(examples);
        });
    }


    /**
     * get all the Comments from a Performance with [id]
     * This returns all the Comments of the Performance with [id].
     *
     * @param {Number} id of the Performance with comments
     * @param {String} xAuthToken Auth Token that grants access to the system (optional)
     * @returns {Promise<[]>}
     **/
    public getComments(id: Number, xAuthToken: String): Promise<any> {
        return new Promise(function (resolve, reject) {
            var examples = [{
                "fkCommenter": 1,
                "date": 1,
                "fkPerformance": 1,
                "comment": "comment",
                "id": 1
            }, {
                "fkCommenter": 1,
                "date": 1,
                "fkPerformance": 1,
                "comment": "comment",
                "id": 1
            }];
            resolve(examples);
        });
    }


    /**
     * gets an specific Performance
     * Will return the Performance that matches with the provided [id] from  the Employee with [id]
     *
     * @param {Number} id of the searched Performance
     * @param {String} xAuthToken Auth Token that grants access to the system (optional)
     * @returns {Promise<IPerformance>}
     **/
    public getPerformance(id: Number, xAuthToken: String): Promise<any> {
        return new Promise(function (resolve, reject) {
            var examples = {
                "date": 0.80082819046101150206595775671303272247314453125,
                "personalTargets": [{
                    "rating": "rating",
                    "description": "description",
                    "fkPerformance": 1,
                    "id": 1
                }, {
                    "rating": "rating",
                    "description": "description",
                    "fkPerformance": 1,
                    "id": 1
                }],
                "comments": [{
                    "fkCommenter": 1,
                    "date": 1,
                    "fkPerformance": 1,
                    "comment": "comment",
                    "id": 1
                }, {
                    "fkCommenter": 1,
                    "date": 1,
                    "fkPerformance": 1,
                    "comment": "comment",
                    "id": 1
                }],
                "fkEmployee": 1,
                "objectives": [{
                    "q1": "q1",
                    "innovative": "innovative",
                    "q2": "q2",
                    "q3": "q3",
                    "q4": "q4",
                    "impact": "impact",
                    "fkPerformance": 1,
                    "id": 1,
                    "foundation": "foundation",
                    "volAlum": "volAlum",
                    "relevance": "relevance"
                }, {
                    "q1": "q1",
                    "innovative": "innovative",
                    "q2": "q2",
                    "q3": "q3",
                    "q4": "q4",
                    "impact": "impact",
                    "fkPerformance": 1,
                    "id": 1,
                    "foundation": "foundation",
                    "volAlum": "volAlum",
                    "relevance": "relevance"
                }],
                "id": 1,
                "jabcGoals": [{
                    "goal": "goal",
                    "name": "name",
                    "fkPerformance": 1,
                    "id": 1,
                    "previousYear": "previousYear"
                }, {
                    "goal": "goal",
                    "name": "name",
                    "fkPerformance": 1,
                    "id": 1,
                    "previousYear": "previousYear"
                }],
                "status": 6,
                "developmentGoals": [{
                    "goal": "goal",
                    "keyActivities": "keyActivities",
                    "rating": "rating",
                    "fkPerformance": 1,
                    "id": 1
                }, {
                    "goal": "goal",
                    "keyActivities": "keyActivities",
                    "rating": "rating",
                    "fkPerformance": 1,
                    "id": 1
                }]
            };
            resolve(examples);
        });
    }


    /**
     * updates the Comment
     * Will update an Comment with the provided data in body if the Comment matches the [idComment]
     *
     * @param {Number} id of the Performance with comments
     * @param {Number} idComment idComment of the Comment to be updated
     * @param {IComment} comment Comment data
     * @param {String} xAuthToken Auth Token that grants access to the system (optional)
     * @returns {Promise<IApiResponse>}
     **/
    public updateComment(id: Number, idComment: Number, comment: IComment, xAuthToken: String): Promise<any> {
        return new Promise(function (resolve, reject) {
            var examples = {
                "debugMessage": "This is a debug message",
                "type": "ERROR",
                "message": "Unauthorized access to the API",
                "responseCode": 0
            };
            resolve(examples);
        });
    }


    /**
     * updates the Performance
     * Will update an Performance with the provided data in body  if the Performance matches the [id]
     *
     * @param {Number} id of the searched Performance
     * performance IPerformance Performance data
     * @param {String} xAuthToken Auth Token that grants access to the system (optional)
     * @returns {Promise<IApiResponse>}
     **/
    public updatePerformance(id: Number, performance: IPerformance, xAuthToken: String): Promise<any> {
        return new Promise(function (resolve, reject) {
            var examples = {
                "debugMessage": "This is a debug message",
                "type": "ERROR",
                "message": "Unauthorized access to the API",
                "responseCode": 0
            };
            resolve(examples);
        });
    }
}

