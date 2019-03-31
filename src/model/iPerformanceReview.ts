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
 * PerformanceReview contains info of the sections of a work plan of an employee 
 */
export interface IPerformanceReview { 
    /**
     * The unique identifier of the Performance
     */
    id: number;
    /**
     * Foreign key of the employee with this performance review
     */
    fkEmployee: number;
    /**
     * Foreign key of the work plan
     */
    fkPerformancePlan: number;
    createDate: string;

    status: number;
    /**
     * Contains all the IPerformanceSections Related to this IPerformanceReview
     */
    sections?: Array<IPerformanceSection>;
    /**
     * Contains all the comments of this performance review
     */
    comments?: Array<IComment>;
}

export class PerformanceReview implements IPerformanceReview{
    /**
     * The unique identifier of the Performance
     */
    id: number;
    /**
     * Foreign key of the employee with this performance review
     */
    fkEmployee: number;
    /**
     * Foreign key of the work plan
     */
    fkPerformancePlan: number;
    createDate: string;

    status: number;
    /**
     * Contains all the IPerformanceSections Related to this IPerformanceReview
     */
    sections?: Array<IPerformanceSection>;
    /**
     * Contains all the comments of this performance review
     */
    comments?: Array<IComment>;

    constructor(rawPerformanceReview: any){
        this.id = rawPerformanceReview.PERFORMANCE_REVIEW_ID;
        this.fkEmployee = rawPerformanceReview.EMPLOYEE_ID;
        this.fkPerformancePlan = rawPerformanceReview.WORK_PLAN_ID;
        this.createDate = rawPerformanceReview.CREATE_DATE;
        this.status = rawPerformanceReview.STATUS;
    }

    static PerformanceReviews(rawPerformanceReviews: any[]){
        let documents: IPerformanceReview[] = [];
        for(let rawPerformanceReview of rawPerformanceReviews){
            documents.push(new PerformanceReview(rawPerformanceReview))
        }
        return documents
    }
}
