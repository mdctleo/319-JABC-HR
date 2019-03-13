import {IEmployee} from "../model/iEmployee";

const schemaDefinition = require('./jabcSchema.json');
import Log from "../../util/Log";

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
    let HEADERS = {
        'X-APP-ID': 'test-id',
        'X-API-Key': 'API-KEY',
        'X-Auth-Token': '',
    };

    before(async () => {
        try {
            let loginBody = {
                email: "hr@jabc.com",
                password: "hrtest"
            };
            let loginResponse = await chai.request(SERVER)
                .post(`${BASE_PATH}/token`)
                .send(loginBody);
            HEADERS['X-Auth-Token'] = loginResponse.body.token;
        } catch (err) {
            Log.error(`PerformanceService Tests: ${err}`);
        } finally {
        }
    });

    describe("/employee tests", () => {
        it("Should get all employees, currently only our stock HR employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(1);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IEmployee);
                expect(response.body[0].firstname).to.be.equal("HR");
                expect(response.body[0].lastname).to.be.equal("test");
            }


        });

        it("Should create an Employee with all fields filled", async () => {
            jsf.option({
                alwaysFakeOptionals: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            employeeRecord.id = 6;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                console.log(response.body);
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
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord2);
            } catch (e) {
                console.log(e);
            } finally {
                console.log(response.body);
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not create an Employee missing required fields", async () => {
            jsf.option({
                alwaysFakeOptionals: false
            });
            let employeeRecord2 = jsf.generate(schema.definitions.IEmployee);
            employeeRecord2.id = null;
            employeeRecord2.status = null;
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(employeeRecord2);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(400);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not create an Employee required fields with wrong types", async () => {
            jsf.option({
                alwaysFakeOptionals: false
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            employeeRecord.id = "333";
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

        it("Should return six employees", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(6);
                response.body.forEach((employee: IEmployee) => {
                    expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
                });
                expect(response.body[0].id).to.be.equal(1);
                expect(response.body[1].id).to.be.equal(2);
                expect(response.body[2].id).to.be.equal(3);
                expect(response.body[2].salary).to.be.instanceof(undefined);
            }
        });
    });


    describe("/employee/{id} tests", () => {
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
                expect(response.body.password).to.be.instanceof(undefined);
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
                expect(response.statusCode).to.be.equal(410);
                console.log(response.body);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not update an employee, wrong format", async () => {
            let response: any;
            let employeeRecord = await chai.request(SERVER)
                .get(`${BASE_PATH}/2`)
                .set(HEADERS);
            employeeRecord.fkRole = "3";
            employeeRecord.salary = 3000.00;
            employeeRecord.firstname = "Big Tuna";
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/2`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiresponse);
            }
        });

        it("Should not update an employee, setting required fields to null", async () => {
            let response: any;
            let employeeRecord = await chai.request(SERVER)
                .get(`${BASE_PATH}/2`)
                .set(HEADERS);
            employeeRecord.id = null;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/2`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiresponse);
            }
        });

        it("Should not update a non-existing employee", async () => {
            let response: any;
            let employeeRecord = await chai.request(SERVER)
                .get(`${BASE_PATH}/2`)
                .set(HEADERS);
            employeeRecord.fkRole = 3;
            employeeRecord.salary = 3000.00;
            employeeRecord.firstname = "Big Tuna";
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/66`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiresponse);
            }
        });


        it("Should update an employee", async () => {
            let response: any;
            let employeeRecord = await chai.request(SERVER)
                .get(`${BASE_PATH}/2`)
                .set(HEADERS);
            employeeRecord.fkRole = 3;
            employeeRecord.salary = 3000.00;
            employeeRecord.firstname = "Big Tuna";
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/2`)
                    .set(HEADERS)
                    .send(employeeRecord);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiresponse);
            }
        });


        it("Should see the update", async() => {
           let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/2`)
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

        it("Should not delete non-existent employee", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/66`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should delete employee", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/4`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


    });


    describe("/employee/{id}/manager/{idManager} tests", () => {
        it("Should not be able to link a non-existent employee with a manager", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/88/manager/2`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to link an employee with a non-existent manager", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/3/manager/88`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to link an employee to an employee", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/4/manager/3`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to link a manager to an employee", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/2/manager/3`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to link a manager to itself", async() => {
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

        it("Should be able to link a manager to manager", async() => {
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

        it("Should be able to link an employee with a manager", async() => {
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

        it("Should be able to link an employee to an HR", async() => {
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

        it("Should be able to link a hr to a hr", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/1/manager/1`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to link a manager to an hr", async() => {
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

        it("Should not be able to unlink an employee with someone that they have no relation", async() => {
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

        it("Should not be able unlink an employee with a manage, order switched", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/2/manager/3`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should be able unlink an employee with a manager", async() => {
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

        it("Should be able unlink an employee with a hr", async() => {
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

        it("Should be able unlink a manager with itself", async() => {
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

        it("Should be able unlink a hr with itself", async() => {
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

        it("Should be able unlink a manager with manager", async() => {
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

        it("Should be able unlink a manager with hr", async() => {
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


    });

    describe("employee/manager/{idManager}", async() => {
        it("Should return error for non existent id", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/manager/88`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should return error for id admin level employee", async() => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/manager/3`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able return 2 records for manager", async() => {
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

        it("Should be able return 1 record for manager", async() => {
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


    });
});



/**
 * /employee/manager/{idManager}
 **/


/**
 *  /employee/{id}/history
 **/


/**
 *  /employee/{id}/document
 **/


/**
 *  /employee/{id}/performance
 **/


/**
 *  /employee/{id}/vacation
 **/


/**
 *  /employee/token
 **/