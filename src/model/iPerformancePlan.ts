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
import { Comment, IComment } from './iComment';
import { PerformanceSection, IPerformanceSection } from './iPerformanceSection';


/**
 * PerformancePlan contains info of the sections of a work plan of an employee 
 */
export interface IPerformancePlan { 
    /**
     * The unique identifier of the Performance
     */
    id: number;
    /**
     * Foreign key of the employee with this work plan
     */
    fkEmployee: number;
    /**
     * The start and end years of this plan
     */
    startYear: number;
    endYear: number;
    createDate: string;

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
     * The start and end years of this plan
     */
    startYear: number;
    endYear: number;
    createDate: string;

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
        this.id = rawPerformancePlan.PERFORMANCE_PLAN_ID;
        this.fkEmployee = rawPerformancePlan.EMPLOYEE_ID;
        this.startYear = rawPerformancePlan.START_YEAR;
        this.endYear = rawPerformancePlan.END_YEAR;
        this.createDate = rawPerformancePlan.CREATE_DATE;
        this.status = rawPerformancePlan.STATUS;
    }

    static PerformancePlans(rawPerformancePlans: any[]){
        let documents: IPerformancePlan[] = [];
        for(let rawPerformancePlan of rawPerformancePlans){
            documents.push(new PerformancePlan(rawPerformancePlan))
        }
        return documents
    }
}