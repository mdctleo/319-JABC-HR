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
    sin: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    fte: IEmployee.fteEnum;
    status: IEmployee.statusEnum;
    adminLevel: IEmployee.adminLevelEnum;
    salary?: number;
    address?: string;
    /**
     * The birthdate of the employee
     */
    birthdate?: string;
    /**
     * The date joined of the employee
     */
    dateJoined?: string;
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

export namespace IEmployee {
    export type fteEnum = 0 | 1 ;
    export const fteEnum = {
        PART_TIME: 0 as fteEnum,
        FULL_TIME: 1 as fteEnum,
    };

    export type statusEnum = 0 | 1 | 2 | 3;
    export const statusEnum = {
        INACTIVE: 0 as statusEnum,
        ACTIVE: 1 as statusEnum,
        ONBOARDING: 2 as statusEnum,
        PROBATION: 3 as statusEnum
    };

    export type adminLevelEnum = -1 | 0 | 1 | 2;
    export const adminLevelEnum = {
        PUBLIC: -1 as adminLevelEnum,
        STAFF: 0 as adminLevelEnum,
        MANAGER: 1 as adminLevelEnum,
        HR_ADMIN: 2 as adminLevelEnum
    };
}

export class Employee implements IEmployee{
    /**
     * The unique identifier of the Employee
     */
    id: number;
    sin: number;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    fte: IEmployee.fteEnum;
    status: IEmployee.statusEnum;
    adminLevel: IEmployee.adminLevelEnum;
    salary?: number;
    address?: string;
    /**
     * The birthdate of the employee
     */
    birthdate?: string;
    /**
     * The date joined of the employee
     */
    dateJoined?: string;
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

    constructor(rawEmployee: any, sensitive = true){
        this.id = rawEmployee.EMPLOYEE_ID;
        this.sin = (sensitive != undefined) ? rawEmployee.SIN : 100000000;
        this.email = rawEmployee.EMAIL;
        this.password = rawEmployee.PASSWORD;
        this.firstname = rawEmployee.FIRST_NAME;
        this.lastname = rawEmployee.LAST_NAME;
        this.fte = rawEmployee.FTE;
        this.status = rawEmployee.STATUS;
        this.adminLevel = rawEmployee.ADMIN_LEVEL;
        if(!sensitive) return;
        this.salary = parseFloat(rawEmployee.SALARY);
        this.address = rawEmployee.ADDRESS;
        this.birthdate = rawEmployee.BIRTHDATE;
        this.dateJoined = rawEmployee.DATE_JOINED;
        this.vacationDays = rawEmployee.VACATION_DAYS;
        this.remainingVacationDays = rawEmployee.REMAINING_VACATION_DAYS;
        this.fkRole = rawEmployee.ROLE;
        this.phoneNumber = rawEmployee.PHONE_NUMBER;
    }

    static Employees(rawEmployees: any[], sensitive = true){
        let employees: IEmployee[] = [];
        for(let rawEmployee of rawEmployees){
            employees.push(new Employee(rawEmployee, sensitive))
        }
        return employees
    }

    static Prepare(rawEmployee: IEmployee){
        rawEmployee.salary = (rawEmployee.salary != undefined) ? rawEmployee.salary : null;
        rawEmployee.address = (rawEmployee.address != undefined) ? rawEmployee.address : null;
        rawEmployee.birthdate = (rawEmployee.birthdate != undefined) ? rawEmployee.birthdate : null;
        rawEmployee.dateJoined = (rawEmployee.dateJoined != undefined) ? rawEmployee.dateJoined : null;
        rawEmployee.vacationDays = (rawEmployee.vacationDays != undefined) ? rawEmployee.vacationDays : null;
        rawEmployee.remainingVacationDays = (rawEmployee.remainingVacationDays != undefined) ? rawEmployee.remainingVacationDays : null;
        rawEmployee.fkRole = (rawEmployee.fkRole != undefined) ? rawEmployee.fkRole : null;
        rawEmployee.phoneNumber = (rawEmployee.phoneNumber != undefined) ? rawEmployee.phoneNumber : null;
        rawEmployee.role = (rawEmployee.role != undefined) ? rawEmployee.role : null;
        rawEmployee.password = (rawEmployee.password != undefined) ? rawEmployee.password : null;
        return rawEmployee
    }
}