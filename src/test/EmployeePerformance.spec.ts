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

describe("test related to /employee and performance", () => {
    describe("/employee/{id}/performance tests with admin credential", async () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });


        it("Should not be able to get performance for non-existent employees ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/88/performance/plan`)
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
                    .get(`${BASE_PATH}/3/performance/plan`)
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
                    .get(`${BASE_PATH}/3/performance/review`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(2);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IPerformanceReview);
                expect(response.body[0].fkPerformancePlan).to.be.equal(1);
            }
        });


        it("Should not be able to create workplan for non-existent employees", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/88/performance/plan`)
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
                optionalsProbability: 1.0,
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.id = 3;
            workplan.createdDate = "2025-01-01";
            let section1 = jsf.generate(schema.definitions.IPerformanceSection);
            let section2 = jsf.generate(schema.definitions.IPerformanceSection);
            workplan.sections = [section1, section2]
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/2/performance/plan`)
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
                optionalsProbability: 1.0,
            });
            let performance = jsf.generate(schema.definitions.IPerformanceReview);
            performance.id = 3;
            performance.fkEmployee = 2;
            performance.fkPerformancePlan = 2;
            performance.createdDate = "2025-01-01";
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/2/performance/review`)
                    .set(HEADERS)
                    .send(performance);
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
                    .get(`${BASE_PATH}/2/performance/plan`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(1);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IPerformancePlan);

                expect(response.body.createdDate).to.not.equal("2025-01-01");

            }
        });

        it("Should be able to get performance review for an employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/2/performance/review`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(1);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IPerformanceReview);

                expect(response.body.createdDate).to.not.equal("2025-01-01");

            }
        });
    });

    describe("/employee/{id}/performance tests with manager credential", async () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            let HRHEADERS = await TestSetup.login("admin");
            let response = await chai.request(SERVER)
                .post(`${BASE_PATH}/3/manager/2`)
                .set(HRHEADERS);
            HEADERS = await TestSetup.login("manager");
            return HEADERS;
        });



        it("Should be able to get work plan for an employee under this manager ", async () => {
            let response: any;
            await chai.request(SERVER)
                .post(`${BASE_PATH}/3/manager/2`)
                .set(HEADERS);
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/3/performance/plan`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(2);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IPerformancePlan);
            }
        });

        it("Should be able to get performance review for an employee under this manager ", async () => {
            let response: any;
            await chai.request(SERVER)
                .post(`${BASE_PATH}/3/manager/2`)
                .set(HEADERS);
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/3/performance/plan`)
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

        it("Should not be able to get a workplan for an employee not under this manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/4/performance/review`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to get performance plan for an employee not under this manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/4/performance/plan`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to create workplan for an employee under this manager", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
            });
            await chai.request(SERVER)
                .post(`${BASE_PATH}/3/manager/2`)
                .set(HEADERS);
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.id = 3;
            workplan.fkEmployee = 3;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/3/performance/plan`)
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

        it("Should be able to create performance for an employee under this manager", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
            });
            await chai.request(SERVER)
                .post(`${BASE_PATH}/3/manager/2`)
                .set(HEADERS);
            let performance = jsf.generate(schema.definitions.IPerformanceReview);
            performance.id = 3;
            performance.fkEmployee = 2;
            performance.fkPerformancePlan = 2;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/3/performance/review`)
                    .set(HEADERS)
                    .send(performance);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to create workplan for an employee not under this manager", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.id = 3;
            workplan.fkEmployee = 4;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/4/performance/plan`)
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

        it("Should not be able to create performance for an employee not under this manager", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
            });
            let performance = jsf.generate(schema.definitions.IPerformanceReview);
            performance.id = 3;
            performance.fkEmployee = 4;
            performance.fkPerformancePlan = 2;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/4/performance/review`)
                    .set(HEADERS)
                    .send(performance);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

    });

    after( () => {
        TestSetup.resetDb();
    });
});