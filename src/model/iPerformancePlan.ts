/**
 * JABC
 * This API provides all the functions needed to manage  the JABC HR system. 
 *
 * OpenAPI spec version: 1.0.0
 * Contact: jabraham9719@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { IComment } from './iComment';
import { IPerformanceSection } from './iPerformanceSection';


/**
 * PerformancePlan contains info of the sections of a performance plan of an employee 
 */
export interface IPerformancePlan { 
    /**
     * The unique identifier of the Performance
     */
    id: number;
    /**
     * Foreign key of the employee with this performance review
     */
    fkEmployee: number;
    /**
     * The date the performance review was created
     */
    date: string;
    status: number;
    /**
     * Contains all the IPerformanceSections Related to this IPerformancePlan
     */
    sections?: Array<IPerformanceSection>;
    /**
     * Contains all the comments of this performance review
     */
    comments?: Array<IComment>;
}

export class PerformancePlan implements IPerformancePlan{
    /**
     * The unique identifier of the Performance
     */
    id: number;
    /**
     * Foreign key of the employee with this performance review
     */
    fkEmployee: number;
    /**
     * The date the performance review was created
     */
    date: string;
    status: number;
    /**
     * Contains all the IPerformanceSections Related to this IPerformancePlan
     */
    sections?: Array<IPerformanceSection>;
    /**
     * Contains all the comments of this performance review
     */
    comments?: Array<IComment>;

    constructor(rawPerformancePlan: any){
        this.id = rawPerformancePlan.SUPPORT_DOC_ID;
        this.fkEmployee = rawPerformancePlan.EMPLOYEE_ID;
        this.date = rawPerformancePlan.CREATED_DATE;
        this.status = rawPerformancePlan.STATUS;
        this.sections = [];
        this.comments = [];
    }

    static PerformancePlans(rawPerformancePlans: any[]){
        let documents: IPerformancePlan[] = [];
        for(let rawPerformancePlan of rawPerformancePlans){
            documents.push(new PerformancePlan(rawPerformancePlan))
        }
        return documents
    }
}