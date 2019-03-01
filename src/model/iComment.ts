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


/**
 * A Comment contains what another employee thinks about the performance record of another employee 
 */
export interface IComment { 
    /**
     * The unique identifier of the Comment
     */
    id: number;
    /**
     * Foreign key of Performance that has this Comment
     */
    fkPerformance: number;
    /**
     * Foreign key of Employee that created the Comment
     */
    fkCommenter: number;
    comment: string;
    /**
     * The unix timestamp of the date when the Comment was created
     */
    date: number;
}
