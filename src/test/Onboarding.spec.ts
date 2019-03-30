import {IEmployee} from "../model/iEmployee";
import TestSetup from "../utils/TestSetup";

const schemaDefinition = require('./jabcSchema.json');

const chai = require('chai');
const chaiJsonEqual = require('chai-json-equal');
const chaiFiles = require('chai-files');

import chaiExclude = require("chai-exclude");
import chaiHttp = require("chai-http");

const jsf = require('json-schema-faker');

const SERVER = "http://localhost:8080";
const BASE_PATH = "/JABC/1.0.0/onboarding";
const URI = `${SERVER}${BASE_PATH}`;
const fs = require('fs');

chai.use(chaiHttp);
chai.use(chaiJsonEqual);
chai.use(chaiExclude);
chai.use(require('chai-json-schema'));
chai.use(chaiFiles);
const file = chaiFiles.file;


chai.tv4.addSchema(URI, schemaDefinition);
let expect = chai.expect;
const schema = chai.tv4.getSchema(`${URI}`);


jsf.extend('faker', () => require('faker'));

describe("test related /onboarding", () => {
    // /employee/{id}/task
    // /employee/{id}/task/{idOnboardingTask}
    describe("/onboarding/task + /onboarding/task{id}", async () => {
        let HEADERS: any = null;

        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            // creates two tasks
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["type"]
            });
            let task0 = jsf.generate(schema.definitions.IOnboardingTask);
            task0.dueDate = "2019-03-04";
            task0.createdDate = "2019-02-02";
            task0.fkEmployee = 3;
            task0.fkDocumentType = 1;
            task0.requireDoc = 1;
            task0.status = 0;
            let task1 = jsf.generate(schema.definitions.IOnboardingTask);
            task1.dueDate = "2019-03-04";
            task1.createdDate = "2019-02-02";
            task1.fkEmployee = 4;
            task1.fkDocumentType = 2;
            task1.requireDoc = 1;
            task1.status = 0;


            await chai.request(SERVER)
                .post(`/JABC/1.0.0/employee/3/task`)
                .set(HEADERS)
                .send(task0);
            await chai.request(SERVER)
                .post(`/JABC/1.0.0/employee/4/task`)
                .set(HEADERS)
                .send(task1);


            return HEADERS;
        });

        it("Should be able to display 2 onboarding tasks", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((task: any) => {
                    expect(task).to.be.jsonSchema(schema.definitions.IOnboardingTask);
                });
                expect(response.body.length).to.be.equal(2);
            }
        });

        it("Should return error for getting non existent onboarding task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/88`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to get a specific onboarding task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IOnboardingTask);
                expect(response.body.fkEmployee).to.be.equal(4);
            }
        });

        it("Should return error for updating non-existent onboarding Task", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["type"]
            });
            let task0 = jsf.generate(schema.definitions.IOnboardingTask);
            task0.dueDate = "2019-03-04";
            task0.createdDate = "2019-02-03";
            task0.fkEmployee = 3;
            task0.fkDocumentType = 1;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/task/88`)
                    .set(HEADERS)
                    .send(task0);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to update an onboarding task", async () => {
            let response: any;
            let task0 = jsf.generate(schema.definitions.IOnboardingTask);
            task0.dueDate = "2019-03-04";
            task0.createdDate = "2019-02-03";
            task0.fkEmployee = 3;
            task0.fkDocumentType = 1;
            task0.status = 0;
            task0.requireDoc = 1;

            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/task/1`)
                    .set(HEADERS)
                    .send(task0);
            }
            catch (e) {
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
                    .get(`${BASE_PATH}/task/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IOnboardingTask);
                expect(response.body.createdDate).to.be.equal("2019-02-03");
            }
        });

        it("Should not be able to get file of no exist task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/88/file`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should not be able to get file of task, before it is uploaded/completed", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/1/file`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to get file of task, after it is completed", async () => {
            let response: any;
            let tempBuf = fs.readFileSync('src/utils/resources/young_obi_wan.jpg');

             let employeeHeader = await TestSetup.login("employee");
             await chai.request(SERVER)
                .put(`/JABC/1.0.0/employee/3/task/1`)
                .type('form-data')
                .set(employeeHeader)
                .attach('document', tempBuf,
                    'young_obi_wan.jpg');

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/1/file`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.deep.equal(tempBuf);
            }
        });

        it("Should not be able to delete non existing task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/task/88`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to delete task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/task/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to delete already deleted task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/task/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to display 1 onboarding tasks", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((task: any) => {
                    expect(task).to.be.jsonSchema(schema.definitions.IOnboardingTask);
                });
                expect(response.body.length).to.be.equal(1);
            }
        });

    });

    describe("/onboarding/task + /onboarding/task{id}", async () => {
        let HEADERS: any = null;

        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("manager");
            // creates two tasks
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["type"]
            });
            let task0 = jsf.generate(schema.definitions.IOnboardingTask);
            task0.dueDate = "2019-03-04";
            task0.createdDate = "2019-02-02";
            task0.fkEmployee = 2;
            task0.fkDocumentType = 1;
            task0.requireDoc = 1;
            task0.status = 0;
            let task1 = jsf.generate(schema.definitions.IOnboardingTask);
            task1.dueDate = "2019-03-04";
            task1.createdDate = "2019-02-02";
            task1.fkEmployee = 3;
            task1.fkDocumentType = 2;
            task1.requireDoc = 1;
            task1.status = 0;
            let task2 = jsf.generate(schema.definitions.IOnboardingTask);
            task1.dueDate = "2019-03-04";
            task1.createdDate = "2019-02-02";
            task1.fkEmployee = 4;
            task1.fkDocumentType = 2;
            task1.requireDoc = 1;
            task1.status = 0;


            await chai.request(SERVER)
                .post(`/JABC/1.0.0/employee/2/task`)
                .set(HEADERS)
                .send(task0);
            await chai.request(SERVER)
                .post(`/JABC/1.0.0/employee/3/task`)
                .set(HEADERS)
                .send(task1);
            await chai.request(SERVER)
                .post(`/JABC/1.0.0/employee/4/task`)
                .set(HEADERS)
                .send(task2);
            await chai.request(SERVER)
                .post(`/JABC/1.0.0/employee/3/manager/2`)
                .set(HEADERS);


            return HEADERS;
        });

        it("Should return error for getting non existent onboarding task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/88`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should return error for getting an employee they manage's onboarding task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should return error for getting an employee they dont manage's onboarding task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/3`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to get own onboarding task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IOnboardingTask);
                expect(response.body.fkEmployee).to.be.equal(4);
            }
        });

        it("Should return error for updating non-existent onboarding Task", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["type"]
            });
            let task0 = jsf.generate(schema.definitions.IOnboardingTask);
            task0.dueDate = "2019-03-04";
            task0.createdDate = "2019-02-03";
            task0.fkEmployee = 3;
            task0.fkDocumentType = 1;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/task/88`)
                    .set(HEADERS)
                    .send(task0);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should return error for updating own Task", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["type"]
            });
            let task0 = jsf.generate(schema.definitions.IOnboardingTask);
            task0.dueDate = "2019-03-04";
            task0.createdDate = "2019-02-03";
            task0.fkEmployee = 3;
            task0.fkDocumentType = 1;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/task/1`)
                    .set(HEADERS)
                    .send(task0);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });



        it("Should return error for updating managed employee's Task", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
                ignoreProperties: ["type"]
            });
            let task0 = jsf.generate(schema.definitions.IOnboardingTask);
            task0.dueDate = "2019-03-04";
            task0.createdDate = "2019-02-03";
            task0.fkEmployee = 3;
            task0.fkDocumentType = 1;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/task/2`)
                    .set(HEADERS)
                    .send(task0);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to complete own onboarding task, ie changing status", async () => {
            let response: any;
            let task0 = jsf.generate(schema.definitions.IOnboardingTask);
            task0.status = 1;


            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/task/1`)
                    .set(HEADERS)
                    .send(task0);
            }
            catch (e) {
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
                    .get(`${BASE_PATH}/task/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IOnboardingTask);
                expect(response.body.status).to.be.equal(1);
            }
        });

        it("Should not be able to get file of non existent task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/88/file`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should not be able to get file of task, before it is uploaded/completed", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/1/file`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to get file of own task, after it is completed", async () => {
            let response: any;
            let tempBuf = fs.readFileSync('src/utils/resources/young_obi_wan.jpg');

            await chai.request(SERVER)
                .put(`/JABC/1.0.0/employee/2/task/1`)
                .type('form-data')
                .set(HEADERS)
                .attach('document', tempBuf,
                    'young_obi_wan.jpg');

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/1/file`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.deep.equal(tempBuf);
            }
        });

        it("Should not be able to get uploaded file of managed employee, after it is completed", async () => {
            let response: any;
            let tempBuf = fs.readFileSync('src/utils/resources/young_obi_wan.jpg');

            let employeeHeader = await TestSetup.login("employee");
            await chai.request(SERVER)
                .put(`/JABC/1.0.0/employee/3/task/2`)
                .type('form-data')
                .set(employeeHeader)
                .attach('document', tempBuf,
                    'young_obi_wan.jpg');

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/task/1/file`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to delete non existing task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/task/88`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to delete own task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/task/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to delete managed employees task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/task/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to delete non managed employees task", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/task/3`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

    });

    describe("/onboarding/documentType", async () => {
        let HEADERS: any = null;

        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");


            return HEADERS;
        });

        it("Should be able to display 3 documentTypes", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/documentType`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((documentType: any) => {
                    expect(documentType).to.be.jsonSchema(schema.definitions.IDocumentType);
                });
                expect(response.body.length).to.be.equal(3);
                expect(response.body[1].name).to.be.equal("adult_obi_wan");
            }
        });

        it("Should not be able to get non existing document type", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/documentType/88`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to get a specific document type", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/documentType/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IDocumentType);
                expect(response.body.name).to.be.equal("adult_obi_wan");
            }
        });

        it("Should be able to create a new documentType", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true
            });

            let documentType = jsf.generate(schema.definitions.IDocumentType);

            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/documentType`)
                    .set(HEADERS)
                    .send(documentType);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be to upload a file template to the newly created document type", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/documentType/4`)
                    .type('multipart/form-data')
                    .set(HEADERS)
                    .attach('document', fs.readFileSync('src/utils/resources/young_obi_wan.jpg'), 'young_obi_wan.jpg');

            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be to see the new created documentType", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/documentType/4`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IDocumentType);
            }
        });

        it("Should be to get the file attached to the newly created template", async () => {
            let response: any;
            let tempBuf = fs.readFileSync('src/utils/resources/young_obi_wan.jpg');

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/documentType/4/file`)
                    .set(HEADERS)

            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.deep.equal(tempBuf);
            }
        });

        it("Should not be able to update non existing documentType", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true
            });
            let documentType = jsf.generate(schema.definitions.IDocumentType);

            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/documentType/88`)
                    .set(HEADERS)
                    .send(documentType);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to update documentType", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true
            });
            let documentType = jsf.generate(schema.definitions.IDocumentType);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/documentType/4`)
                    .set(HEADERS)
                    .send(documentType);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to delete non existing documentType", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/documentType/88`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);


            }
        });

        it("Should be able to delete documentType", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/documentType/4`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should not be able to delete an already deleted documentType", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/documentType/4`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);


            }
        });

        it("Should be able to see the deletion of documentType", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/documentType`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((task: any) => {
                    expect(task).to.be.jsonSchema(schema.definitions.IDocumentType);
                });
                expect(response.body.length).to.be.equal(3);
            }
        });

    });

    describe("/onboarding/faq", async () => {

        let HEADERS: any = null;

        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");

            return HEADERS;
        });

        it("Should be able to create a FAQ", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
            });
            let faq = jsf.generate(schema.definitions.IFAQ);

            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/faq`)
                    .set(HEADERS)
                    .send(faq);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to create a FAQ", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
            });
            let faq = jsf.generate(schema.definitions.IFAQ);

            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/faq`)
                    .set(HEADERS)
                    .send(faq);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to display two FAQs", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/faq`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((task: any) => {
                    expect(task).to.be.jsonSchema(schema.definitions.IFAQ);
                });
                expect(response.body.length).to.be.equal(2);
            }
        });

        it("Should not be to get non existing FAQ", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/faq/88`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to get a specific FAQ", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/faq/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IFAQ);
            }
        });

        it("Should not be able to update a non-existing FAQ", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
            });
            let faq = jsf.generate(schema.definitions.IFAQ);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/faq/88`)
                    .set(HEADERS)
                    .send(faq)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to update a FAQ", async () => {
            let response: any;
            jsf.option({
                alwaysFakeOptionals: true,
                fixedProbabilities: true,
            });
            let faq = jsf.generate(schema.definitions.IFAQ);
            faq.question = "test question";
            faq.answer = "test answer";
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/faq/2`)
                    .set(HEADERS)
                    .send(faq)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to see the updated FAQ", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/faq/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IFAQ);
                expect(response.body.quesiton).to.be.equal("test question");
                expect(response.body.answer).to.be.equal("test answer");
            }
        });

        it("Should not be able to delete a non-existing FAQ", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/faq/88`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to get delete a FAQ", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/faq/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to delete an already deleted FAQ", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/faq/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be display one FAQ", async () => {
            let response: any;

            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/faq`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(1);
                expect(response.body[0].question).to.be.equal("test question");
            }
        });

    });

    after(() => {
        TestSetup.resetDb();
    });
});