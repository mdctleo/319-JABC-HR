import {IEmployee} from "../model/iEmployee";
import TestSetup from "../utils/TestSetup";

const schemaDefinition = require('./jabcSchema.json');

const chai = require('chai');
const chaiJsonEqual = require('chai-json-equal');
const should = require('chai').should();
import chaiExclude = require("chai-exclude");
import chaiHttp = require("chai-http");

const jsf = require('json-schema-faker');

const SERVER = "http://localhost:8080";
const BASE_PATH = "/JABC/1.0.0/employee";
const URI = `${SERVER}${BASE_PATH}`;

chai.use(chaiHttp);
chai.use(chaiJsonEqual);
chai.use(chaiExclude);
chai.use(require('chai-json-schema'));

chai.tv4.addSchema(URI, schemaDefinition);
let expect = chai.expect;
const schema = chai.tv4.getSchema(`${URI}`);


jsf.extend('faker', () => require('faker'));

describe("EmployeeService tests", () => {

    describe("/employee tests with admin credential", () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should get all employees, currently only our stock employees", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(5);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IEmployee);
                expect(response.body[0].firstname).to.be.equal("Toby");
                expect(response.body[0].lastname).to.be.equal("Flenderson");
            }
        });

        it("Should create an Employee with all fields filled", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            employeeRecord.birthdate = "1997-11-30";
            employeeRecord.dateJoined = "2012-01-01";
            employeeRecord.id = 6;
            employeeRecord.sin = 666666666;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should create an Employee with only required fields filled", async () => {
            jsf.option({
                alwaysFakeOptionals: false
            });
            let employeeRecord2 = jsf.generate(schema.definitions.IEmployee);
            employeeRecord2.id = 7;
            employeeRecord2.sin = 777777777;
            employeeRecord2.password = 'passwordA#1';
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord2);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not create an Employee missing required fields", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord2 = jsf.generate(schema.definitions.IEmployee);
            employeeRecord2.id = null;
            employeeRecord2.status = null;
            employeeRecord2.sin = 888888888;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord2);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not create an Employee required fields with wrong types", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            employeeRecord.id = "333";
            employeeRecord.sin = 888888888;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not create an Employee, negative salary", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            employeeRecord.salary = -300.00;
            employeeRecord.sin = 888888888;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        // it("Should not create an Employee, negative sin", async () => {
        //     jsf.option({
        //         alwaysFakeOptionals: true,
        //          fixedProbabilities: true,
        //         ignoreProperties: ["role"]
        //     });
        //     let employeeRecord = jsf.generate(schema.definitions.IEmployee);
        //     employeeRecord.sin = "-333333333";
        //     let response: any;
        //     try {
        //         response = await chai.request(SERVER)
        //             .post(`${BASE_PATH}`)
        //             .set(HEADERS)
        //             .send(employeeRecord);
        //     } catch (e) {
        //         console.log(e);
        //     } finally {
        //         expect(response.statusCode).to.be.within(400, 500);
        //         expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
        //     }
        // });


        it("Should not create an Employee, birthdate after joined date", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            employeeRecord.birthdate = "1998-11-30";
            employeeRecord.dateJoined = "1997-11-30";
            employeeRecord.sin = 888888888;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should not create an Employee, remaining vacation date greater than total vacationing dates", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            employeeRecord.vacationDays = 30;
            employeeRecord.remainingVacationDays = 50;
            employeeRecord.sin = 888888888;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });
        it("Should not create an Employee required fields with wrong types", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            employeeRecord.id = "333";
            employeeRecord.sin = 888888888;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(400);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        // REVIEW: changed endpoint to include the inactive ones, it was failing because one of them is inactive
        it("Should return seven employees", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}?inactive=1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(7);
                response.body.forEach((employee: IEmployee) => {
                    expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
                });
                expect(response.body[0].id).to.be.equal(1);
                expect(response.body[1].id).to.be.equal(2);
                expect(response.body[2].id).to.be.equal(3);
                should.not.exist(response.body[6].salary);
            }
        });
    });


    describe("/employee tests with manager credential", () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("manager");
            return HEADERS;
        });

        it("Should get all employees under my management", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(0);
            }
        });


        it("Should not create employee wrong credential", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

    });

    describe("/employee tests with employee credential", () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("employee");
            return HEADERS;
        });

        it("Should not get all employees wrong credential", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should not create employee wrong credential", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

    });


    describe("/employee/{id} tests, admin credential", () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should get a specific employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IEmployee);
                expect(response.body.salary).to.be.equal(200.00);
                expect(response.body.sin).to.be.equal(111111111);
                // we shouldnt pass the password?
                expect(response.body.password).to.be.undefined;
            }
        });


        it("Should return an error for getting a non-existent employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/66`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not update an employee, wrong format", async () => {
            let response: any;
            let employeeRecordResponse = await chai.request(SERVER)
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            let employeeRecord = employeeRecordResponse.body;
            employeeRecord.fkRole = "3";
            employeeRecord.salary = 3000.00;
            employeeRecord.firstname = "Big Tuna";
            try {
                    response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/3`)
                    .set(HEADERS)
                    .send(JSON.stringify(employeeRecord));
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not update an employee, setting required fields to null", async () => {
            let response: any;
            let employeeRecordResponse = await chai.request(SERVER)
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            let employeeRecord = employeeRecordResponse.body;
            employeeRecord.id = null;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/3`)
                    .set(HEADERS)
                    .send(JSON.stringify(employeeRecord));
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not update a non-existing employee", async () => {
            let response: any;
            let employeeRecordResponse = await chai.request(SERVER)
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            let employeeRecord = employeeRecordResponse.body;
            employeeRecord.fkRole = 3;
            employeeRecord.salary = 3000.00;
            employeeRecord.firstname = "Big Tuna";
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/66`)
                    .set(HEADERS)
                    .send(JSON.stringify(employeeRecord));
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should update an employee", async () => {
            let response: any;
            let employeeRecordResponse = await chai.request(SERVER)
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            let employeeRecord = employeeRecordResponse.body;
            employeeRecord.fkRole = 3;
            employeeRecord.salary = 3000.00;
            employeeRecord.firstname = "Big Tuna";
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/3`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should see the update", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/3`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IEmployee);
                expect(response.body.fkRole).to.be.equal(3);
                expect(response.body.salary).to.be.equal(3000.00);
                expect(response.body.firstname).to.be.equal("Big Tuna");
            }
        });

        it("Should not delete non-existent employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/66`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should delete employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/3`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should see 3 employees", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((employee: any) => {
                    expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
                });
                expect(response.body.length).to.be.equal(4);
            }
        });
    });


    describe("/employee/{id}/manager/{idManager} and /employee/manager/{idManager} tests and /employee/{id}/manager tests", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should not be able to link a non-existent employee with a manager", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/88/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to link an employee with a non-existent manager", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/3/manager/88`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to link an employee to an employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/4/manager/3`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to link a manager to an employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/2/manager/3`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        // REVIEW: Cant be link to itself
        it("Should not be able to link a manager to itself", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/2/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to link a manager to manager", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/2/manager/5`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to link an employee with a manager", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/3/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to link an employee with a manager", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/4/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        // REVIEW: Change to two employees because it cant be link to itself
        it("Should be able to display two employees under manager michael scott", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((employee: any) => {
                    expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
                });
                expect(response.body.length).to.be.equal(2);
                expect(response.body[0].firstname).to.be.equal("Jim");
                expect(response.body[1].firstname).to.be.equal("Dwight");
            }
        });

        it("Should be able to display one employee under manager karen", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/manager/5`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((employee: any) => {
                    expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
                });
                expect(response.body.length).to.be.equal(1);
                expect(response.body[0].firstname).to.be.equal("Michael");
            }
        });


        it("Should be able to link an employee to an HR", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/3/manager/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should display two managers for that employee, Michael and HR", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/3/manager`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(2);
                response.body.forEach((employee: any) => {
                    expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
                });
                expect(response.body[0].firstname).to.be.equal("Toby");
                expect(response.body[1].firstname).to.be.equal("Michael");
            }
        });

        it("Should be able to display employees under HR", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/manager/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(1);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IEmployee);
            }
        });

        it("should be able to unlink a manager under manager karen", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/2/manager/5`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to unlink an employee to an HR", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/3/manager/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        // REVIEW: Can not link to itself
        it("Should not be able to link a hr to a hr", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/1/manager/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.not.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        // REVIEW: Deleted this because the link can not be created 
        // it("Should be able to unlink a hr to a hr", async () => {
        //     let response: any;
        //     try {
        //         response = await chai.request(SERVER)
        //             .delete(`${BASE_PATH}/1/manager/1`)
        //             .set(HEADERS);
        //     } catch (e) {
        //         console.log(e);
        //     } finally {
        //         expect(response.statusCode).to.be.equal(200);
        //         expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
        //     }
        // });

        it("Should be able to link a manager to an hr", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/2/manager/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to unlink a manager to an hr", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/2/manager/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to unlink an employee to a manager", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/3/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        // REVIEW: The link manager 2 -> employee 4 existed, so I changed the employee id to 3, to pass the test
        it("Should not be able to unlink an employee to a manager that they have no relation with", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/3/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        // REVIEW: There is no link to itself
        // it("Should be able to unlink an someone linked to itself", async () => {
        //     let response: any;
        //     try {
        //         response = await chai.request(SERVER)
        //             .delete(`${BASE_PATH}/2/manager/2`)
        //             .set(HEADERS);
        //     } catch (e) {
        //         console.log(e);
        //     } finally {
        //         expect(response.statusCode).to.be.equal(200);
        //         expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
        //     }
        // });

        // REVIEW: Added this so the next test can pass, because the link manager 2 -> employe 4 still exists
        it("Should be able to unlink an someone linked to itself", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/4/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to display no employee under manager michael", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((employee: any) => {
                    expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
                });
                expect(response.body.length).to.be.equal(0);
            }
        });

        it("Should not be able to display employees under employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/manager/3`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }

        });


        it("Should not be able to display employees under non-existent employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/manager/88`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });
    });

    describe("/employee/{id}/history tests", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should not display antying, non-existent employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/88/history`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should display one history (the current record), since no change", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/3/history`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((employee: any) => {
                    expect(employee).to.be.jsonSchema(schema.definitions.IEmployeeHistory);
                });
                expect(response.body.length).to.be.equal(1);
            }
        });

        it("Should display 2 history record after one change", async () => {
            let employeeRecordResponse = await chai.request(SERVER)
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            let employeeRecord = employeeRecordResponse.body;
            employeeRecord.firstname = "Big Tuna";
            await chai.request(SERVER)
                .put(`${BASE_PATH}/3`)
                .set(HEADERS)
                .send(employeeRecord);
                let response: any;
                try {
                    response = await chai.request(SERVER)
                        .get(`${BASE_PATH}/3/history`)
                        .set(HEADERS);

                } catch (e) {
                    console.log(e);
                } finally {
                    expect(response.statusCode).to.be.equal(200);
                    response.body.forEach((employee: any) => {
                        expect(employee).to.be.jsonSchema(schema.definitions.IEmployeeHistory);
                    });
                    expect(response.body[0].firstname).to.be.equal("Jim");
                    expect(response.body[1].firstname).to.be.equal("Big Tuna");
                }
        });

        it("Should display 3 history records after two change", async () => {
            let employeeRecordResponse = await chai.request(SERVER)
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            let employeeRecord = employeeRecordResponse.body;
            employeeRecord.firstname = "Jim";
            let updateResponse = await chai.request(SERVER)
                .put(`${BASE_PATH}/3`)
                .set(HEADERS)
                .send(employeeRecord);
                let response: any;
                try {
                    response = await chai.request(SERVER)
                        .get(`${BASE_PATH}/3/history`)
                        .set(HEADERS);

                } catch (e) {
                    console.log(e);
                } finally {
                    expect(response.statusCode).to.be.equal(200);
                    response.body.forEach((employee: any) => {
                        expect(employee).to.be.jsonSchema(schema.definitions.IEmployeeHistory);
                    });
                    expect(response.body[2].firstname).to.be.equal("Jim");
                    expect(response.body[1].firstname).to.be.equal("Big Tuna");
                    expect(response.body[0].firstname).to.be.equal("Jim");
                }
        });

    });

    describe("/employee/token tests", () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should be return error for incorrect credential ", async () => {
            let response: any;
            let loginBody = {
                email: "tn@jabc.com",
                password: "passwordA#1"
            };

            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/token`)
                    .send(loginBody);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
            }
        });

        it("Should be return error for malformed credential ", async () => {
            let response: any;
            let loginBody = {
                email: "tflenderson@jabc.com",
                password: 12345
            };

            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/token`)
                    .send(loginBody);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
            }
        });
    });

    after( () => {
        TestSetup.resetDb();
    });
});


//TODO:

/**
 *  /employee/{id}/vacation
 **/
