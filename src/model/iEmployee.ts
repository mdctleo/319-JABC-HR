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
import { IRole } from './iRole';


/**
 * An Employee contains all the current information of a current or onboarding employee 
 */
export interface IEmployee { 
    /**
     * The unique identifier of the Employee
     */
    id: number;
    sin: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    fte: number;
    status: number;
    adminLevel: number;
    salary?: number;
    address?: string;
    /**
     * The unix timestamp of the birthdate of the employee
     */
    birthdate?: number;
    /**
     * The unix timestamp of the date joined of the employee
     */
    dateJoined?: number;
    /**
     * The number of vacation days allowed to the employee per year
     */
    vacationDays?: number;
    /**
     * The number of vacation days allowed to the employee on the current year
     */
    remainingVacationDays?: number;
    /**
     * Foreign key of the role
     */
    fkRole?: number;
    phoneNumber?: string;
    role?: IRole;
}

export class Employee implements IEmployee{
    /**
     * The unique identifier of the Employee
     */
    id: number;
    sin: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    fte: number;
    status: number;
    adminLevel: number;
    salary?: number;
    address?: string;
    /**
     * The unix timestamp of the birthdate of the employee
     */
    birthdate?: number;
    /**
     * The unix timestamp of the date joined of the employee
     */
    dateJoined?: number;
    /**
     * The number of vacation days allowed to the employee per year
     */
    vacationDays?: number;
    /**
     * The number of vacation days allowed to the employee on the current year
     */
    remainingVacationDays?: number;
    /**
     * Foreign key of the role
     */
    fkRole?: number;
    phoneNumber?: string;
    role?: IRole;

    constructor(rawEmployee: any){
        this.id = rawEmployee.EMPLOYEE_ID;
        this.sin = rawEmployee.SIN;
        this.email = rawEmployee.EMAIL;
        this.password = rawEmployee.PASSWORD;
        this.firstname = rawEmployee.FIRST_NAME;
        this.lastname = rawEmployee.LAST_NAME;
        this.fte = rawEmployee.FTE;
        this.status = rawEmployee.STATUS;
        this.adminLevel = rawEmployee.ADMIN_LEVEL;
        this.salary = rawEmployee.SALARY;
        this.address = rawEmployee.ADDRESS;
        this.birthdate = rawEmployee.BIRTHDATE;
        this.dateJoined = rawEmployee.DATE_JOINED;
        this.vacationDays = rawEmployee.VACATION_DAYS;
        this.remainingVacationDays = rawEmployee.REMAINING_VACATION_DAYS;
        this.fkRole = rawEmployee.ROLE;
        this.phoneNumber = rawEmployee.PHONE_NUMBER;
    }
}