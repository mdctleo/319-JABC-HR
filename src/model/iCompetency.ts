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
 * A Competency contains info of competencies and objectives that each role need to fulfill 
 */
export interface ICompetency { 
    /**
     * The unique identifier of the Competency
     */
    id: number;
    /**
     * Foreign key of the role
     */
    fkRole: number;
    name?: string;
    description?: string;
}

export class Competency implements ICompetency{
    /**
     * The unique identifier of the Competency
     */
    id: number;
    /**
     * Foreign key of the role
     */
    fkRole: number;
    name?: string;
    description?: string;

    constructor(rawCompetency: any){
        this.id = rawCompetency.COMMENT_ID;
        this.fkRole = rawCompetency.ROLE_ID;
        this.name = rawCompetency.COMPETENCY_NAME;
        this.description = rawCompetency.DESCRIPTION;
    }

    static Competencys(rawCompetencys: any[]){
        let Competencys: ICompetency[] = [];
        for(let rawCompetency of rawCompetencys){
            Competencys.push(new Competency(rawCompetency))
        }
        return Competencys
    }

    static Prepare(rawCompetency: ICompetency) {
        rawCompetency.name = (rawCompetency.name) ? rawCompetency.name : null;
        rawCompetency.description = (rawCompetency.description) ? rawCompetency.description : null;
        return rawCompetency;
    }
}
