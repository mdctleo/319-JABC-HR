import {IEmployee} from "../model/iEmployee";
import TestSetup from "../utils/TestSetup";

const schemaDefinition = require('./jabcSchema.json');

const chai = require('chai');
const chaiJsonEqual = require('chai-json-equal');
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
            HEADERS = await TestSetup.initTestsuite("admin");
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


        it("Should not create an Employee, birthdate before joined date", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
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

        it("Should return seven employees", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
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
                expect(response.body[2].salary).to.be(undefined);
            }
        });
    });


    describe("/employee tests with manager credential", () => {
        let HEADERS: any = null;
        before(async () => {
            HEADERS = await TestSetup.initTestsuite("manager");
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
            HEADERS = await TestSetup.initTestsuite("employee");
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
            HEADERS = await TestSetup.initTestsuite("admin");
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
                expect(response.body.sin).to.be.equal(11111111);
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


    describe("/employee/{id}/manager/{idManager} and /employee/manager/{idManager} tests", () => {

        let HEADERS: any = null;
        before(async () => {
            HEADERS = await TestSetup.initTestsuite("admin");
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

        it("Should be able to link a manager to itself", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/2/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
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

        it("Should be able to display three employees under manager michael scott", async () => {
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
                expect(response.body.length).to.be.equal(3);
                expect(response.body[0].firstname).to.be.equal("Michael");
                expect(response.body[1].firstname).to.be.equal("Jim");
                expect(response.body[2].firstname).to.be.equal("Dwight");
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

        it("Should be able to link a hr to a hr", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/1/manager/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to unlink a hr to a hr", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/1/manager/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

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


        it("Should not be able to unlink an employee to a manager that they have no relation with", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/4/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to unlink an someone linked to itself", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/2/manager/2`)
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
            HEADERS = await TestSetup.initTestsuite("admin");
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

        it("Should display no history, since no change", async () => {
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
                expect(response.body.length).to.be.equal(0);
            }
        });

        it("Should display one history record after one change", async () => {
            let employeeRecord = await chai.request(SERVER)
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            employeeRecord.firstname = "Big Tuna";
            let updateResponse = await chai.request(SERVER)
                .put(`${BASE_PATH}/3`)
                .set(HEADERS)
                .send(employeeRecord);
            updateResponse.then(async () => {
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
            }).catch((err: any) => {
                console.log(err);
            })
        });

        it("Should display two history records after two change", async () => {
            let employeeRecord = await chai.request(SERVER)
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            employeeRecord.firstname = "Jim";
            let updateResponse = await chai.request(SERVER)
                .put(`${BASE_PATH}/3`)
                .set(HEADERS)
                .send(employeeRecord);
            updateResponse.then(async () => {
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
                    expect(response.body[2].firstname).to.be.equal("Jim");
                }
            }).catch((err: any) => {
                console.log(err);
            })
        });


    });

    describe("/employee/{id}/document", () => {
        let HEADERS: any = null;
        let documents: Array<string> = [];
        before(async () => {
            return Promise.all([TestSetup.initTestsuite("admin"), TestSetup.readDocuments()])
                .then((result) => {
                    HEADERS = result[0];
                    return documents = result[1];
                }).catch((err) => {
                    console.log(err);
                })

        });

        it("Should throw an error, non-existent employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/88/document`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not display anything, no documents added for this employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/2/document`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(0);
            }
        });

        it("Should throw an error, adding a malformed document", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
            });
            let document = jsf.generate(schema.definitions.IDocument);
            document.fkEmployee = 888;
            document.fkDocumentType = 88;
            document.createdDate = 19;
            document.dueDate = null;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/3/document`)
                    .set(HEADERS)
                    .send();
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(400);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to add a document ", async () => {
            let response: any;
            try {
                // young obiwan
                let document64 = documents[0];

                let sendDocument = jsf.generate(schema.definitions.IDocument);
                sendDocument.fkDocumentType = 1;
                sendDocument.fkEmployee = 3;
                sendDocument.path = document64;

                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/3/document`)
                    .set(HEADERS)
                    .send(sendDocument);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should be able to add a document ", async () => {
            let response: any;
            try {
                // adult obiwan
                let document64 = documents[1];

                let sendDocument = jsf.generate(schema.definitions.IDocument);
                sendDocument.fkDocumentType = 1;
                sendDocument.fkEmployee = 3;
                sendDocument.path = document64;

                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/3/document`)
                    .set(HEADERS)
                    .send(sendDocument);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to display two documents under an employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/3/document`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((document: any) => {
                    expect(document).to.be.jsonSchema(schema.definitions.IDocument);
                });
                expect(response.body[0].path).to.be.equal(documents[0]);
                expect(response.body[1].path).to.be.equal(documents[1]);
            }
        });
    });

    describe("/employee/token tests", () => {
        let HEADERS: any = null;
        before(async () => {
            HEADERS = await TestSetup.initTestsuite("admin");
            return HEADERS;
        });

        it("Should be return error for incorrect credential ", async () => {
            let response: any;
            let loginBody = {
                email: "tn@jabc.com",
                password: "hrtest"
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


    describe("/employee/token tests", () => {
        let HEADERS: any = null;
        before(async () => {
            HEADERS = await TestSetup.initTestsuite("admin");
            return HEADERS;
        });

        it("Should be return error for incorrect credential ", async () => {
            let response: any;
            let loginBody = {
                email: "tn@jabc.com",
                password: "hrtest"
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

    describe("/employee/{id}/performance tests with admin credential", async() => {
        let HEADERS: any = null;
        before(async () => {
            HEADERS = await TestSetup.initTestsuite("admin");
            return HEADERS;
        });

        it("Should not be able to get performance for non-existent employees ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/{88}/performance`)
                    .set(HEADERS);

            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to get work plan for an employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/{3}/performance/plan`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(2);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IPerformancePlan);
                expect(response.body[0].date).to.be.equal('2018-01-01');
            }
        });

        it("Should be able to get performance review for an employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/{3}/performance/review`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(2);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IPerformanceReview);
                expect(response.body[0].sections.length).to.be.equal(3);
                expect(response.body[0].fkPerformancePlan).to.be.equal(1);
            }
        });



        it("Should not be able to create workplan for non-existent employees", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/{88}/performance/plan`)
                    .set(HEADERS)
                    .send(workplan);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to create workplan for an employee", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.id = 3;
            workplan.fkEmployee = 2;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/{2}/performance/plan`)
                    .set(HEADERS)
                    .send(workplan);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to create performance for an employee", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
            });
            let workplan = jsf.generate(schema.definitions.IPerformanceReview);
            workplan.id = 3;
            workplan.fkEmployee = 2;
            workplan.fkPerformancePlan = 3;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/{2}/performance/review`)
                    .set(HEADERS)
                    .send(workplan);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to get work plan for an employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/{2}/performance/plan`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(1);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IPerformancePlan);

            }
        });

        it("Should be able to get performance review for an employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/{2}/performance/review`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(1);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IPerformanceReview);
            }
        });

    });

    // clears database
    TestSetup.initTestsuite("admin");
});


//TODO:

/**
 *  /employee/{id}/vacation
 **/
