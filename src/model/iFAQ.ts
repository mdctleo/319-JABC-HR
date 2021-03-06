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
 * A FAQ contains a question and answer, to help the employee while onboarding 
 */
export interface IFAQ { 
    /**
     * The unique identifier of the FAQ
     */
    id: number;
    question: string;
    answer: string;
}

export class FAQ implements IFAQ{
    /**
     * The unique identifier of the FAQ
     */
    id: number;
    question: string;
    answer: string;

    constructor(rawFAQ: any){
        this.id = rawFAQ.FAQ_ID;
        this.question = rawFAQ.QUESTION;
        this.answer = rawFAQ.ANSWER;
    }

    static FAQs(rawFAQs: any[]){
        let FAQs: IFAQ[] = [];
        for(let rawFAQ of rawFAQs){
            FAQs.push(new FAQ(rawFAQ))
        }
        return FAQs
    }
}