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
let shell = require('shelljs');


jsf.extend('faker', () => require('faker'));

function resetDb() {
    shell.cd('db');
    shell.exec('./resetDb.sh');
}


describe("EmployeeService tests", () => {
    let HEADERS = {
        'X-APP-ID': 'test-id',
        'X-API-Key': 'API-KEY',
        'X-Auth-Token': '',
    };

    before(async () => {
        try {
            resetDb();
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
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            employeeRecord.fkRole = "3";
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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiresponse);
            }
        });

        it("Should not update an employee, setting required fields to null", async () => {
            let response: any;
            let employeeRecord = await chai.request(SERVER)
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
            employeeRecord.id = null;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/3`)
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
                .get(`${BASE_PATH}/3`)
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
                .get(`${BASE_PATH}/3`)
                .set(HEADERS);
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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiresponse);
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
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should delete employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/4`)
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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
                expect(response.body.length).to.be.equal(3);
            }
        });


    });


    describe("/employee/{id}/manager/{idManager} and /employee/manager/{idManager} tests", () => {
        it("Should not be able to link a non-existent employee with a manager", async () => {
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

        it("Should not be able to link an employee with a non-existent manager", async () => {
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

        it("Should not be able to link an employee to an employee", async () => {
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

        it("Should not be able to link a manager to an employee", async () => {
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
                    .get(`${BASE_PATH}/manager/2`)
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
                    .get(`${BASE_PATH}/1/manager/1`)
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
                expect(response.statusCode).to.be.equal(410);
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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
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
                expect(response.statusCode).to.be.equal(410);
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
                expect(response.statusCode).to.be.equal(410);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });
    });

    describe("/employee/{id}/history tests", () => {

        it("Should not display antying, non-existent employee", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/88/history`)
                    .set(HEADERS);
            } catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(410);
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
                    expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
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
                        expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
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
                        expect(employee).to.be.jsonSchema(schema.definitions.IEmployee);
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

    describe("/employee/{id}/document")
});

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