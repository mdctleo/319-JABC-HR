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
 * A DevelopmentGoal contains what another employee thinks about the performance record of another employee 
 */
export interface IDevelopmentGoal { 
    /**
     * The unique identifier of the DevelopmentGoal
     */
    id: number;
    /**
     * Foreign key of Performance that has this DevelopmentGoal
     */
    fkPerformance: number;
    goal?: string;
    keyActivities?: string;
    rating?: string;
}
