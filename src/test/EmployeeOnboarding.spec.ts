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
const fs = require('fs');

chai.use(chaiHttp);
chai.use(chaiJsonEqual);
chai.use(chaiExclude);
chai.use(require('chai-json-schema'));

chai.tv4.addSchema(URI, schemaDefinition);
let expect = chai.expect;
const schema = chai.tv4.getSchema(`${URI}`);


jsf.extend('faker', () => require('faker'));

describe("test related to /employee and onboarding", () => {
    // /employee/{id}/task
    // /employee/{id}/task/{idOnboardingTask}
    describe("walk through an onboarding process of an employee", async () => {
        let HEADERS: any = null;
        let onBoardingEmployeeCredentials: any = {
            email: "",
            password: ""
        };
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            // create an onboarding employee
            jsf.option({
                alwaysFakeOptionals: true,
                ignoreProperties: ["role"]
            });
            let employeeRecord = jsf.generate(schema.definitions.IEmployee);
            employeeRecord.birthdate = "1997-11-30";
            employeeRecord.dateJoined = "2012-01-01";
            employeeRecord.sin = 99999999;
            // set the employee to onboarding status
            employeeRecord.status = 2;

            await chai.request(SERVER)
                .post(`${BASE_PATH}`)
                .set(HEADERS)
                .send(employeeRecord);
            onBoardingEmployeeCredentials.email = employeeRecord.email;
            onBoardingEmployeeCredentials.password = employeeRecord.password;
            return HEADERS;
        });

        it("Should be able to display no onboarding task for this employee", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/6/task`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(0);
            }
        });

        it("Should not be able to create onboarding taks for this employee, due date in the past", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                ignoreProperties: ["type"]
            });
            let task = jsf.generate(schema.definitions.IOnboardingTask);
            task.dueDate = "1997-11-30";
            task.fkEmployee = 6;
            task.createdDate = "2019-02-02";
            task.fkDocumentType = 1;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/6/task`)
                    .set(HEADERS)
                    .send(task);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to create onboarding taks for this employee, do not require doc", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                ignoreProperties: ["type"]
            });
            let task = jsf.generate(schema.definitions.IOnboardingTask);
            task.dueDate = "2019-03-04";
            task.fkEmployee = 6;
            task.createdDate = "2019-02-02";
            task.status = 0;
            task.requireDoc = 0;
            task.fkDocumentType = 1;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/6/task`)
                    .set(HEADERS)
                    .send(task);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to create onboarding taks for this employee, require doc", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                ignoreProperties: ["type"]

            });
            let task = jsf.generate(schema.definitions.IOnboardingTask);
            task.dueDate = "2019-03-04";
            task.fkEmployee = 6;
            task.createdDate = "2019-02-02";
            task.status = 0;
            task.requireDoc = 1;
            task.fkDocumentType = 1;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/6/task`)
                    .set(HEADERS)
                    .send(task);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to display two onboarding tasks for this employee", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
            });
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/6/task`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((task: any) => {
                    expect(task).to.be.jsonSchema(schema.definitions.IOnboardingTask);
                });
            }
        });

        it("Should not be able to complete other employee's onboarding tasks", async () => {
            let employeeHeader = await TestSetup.login("employee");
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
            });
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/6/task/1`)
                    .type('Content-Type', 'multipart/form-data')
                    .set(employeeHeader)
                    .attach('document', fs.readFileSync('src/utils/resources/young_obi_wan.jpg'), 'young_obi_wan.jpg');
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to see other employee's onboarding tasks", async () => {
            let employeeHeader = await TestSetup.login("employee");
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
            });
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/6/task`)
                    .type('Content-Type', 'multipart/form-data')
                    .set(employeeHeader)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to complete an onboarding task", async () => {
            let response: any;
            let employeeHeader = {
                'X-APP-ID': 'test-id',
                'X-API-Key': 'API-KEY',
                'X-Auth-Token': '',
            };
            let loginResponse = await chai.request(SERVER)
                .post(`${BASE_PATH}/token`)
                .send(onBoardingEmployeeCredentials);
            employeeHeader['X-Auth-Token'] = loginResponse.body.token;
            jsf.option({
                alwaysFakeOptionals: true,
            });
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/6/task/2`)
                    .type('Content-Type', 'multipart/form-data')
                    .set(employeeHeader)
                    .attach('document', fs.readFileSync('src/utils/resources/young_obi_wan.jpg'), 'young_obi_wan.jpg');
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to see the task completed", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
            });
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/6/task`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IOnboardingTask);
                expect(response.body[0].status).to.be.equal(1);
            }
        });


    });

    after( () => {
       TestSetup.resetDb();
    });
});