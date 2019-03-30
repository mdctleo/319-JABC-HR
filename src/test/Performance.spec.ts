import {IEmployee} from "../model/iEmployee";
import TestSetup from "../utils/TestSetup";

const schemaDefinition = require('./jabcSchema.json');

const chai = require('chai');
const chaiJsonEqual = require('chai-json-equal');
import chaiExclude = require("chai-exclude");
import chaiHttp = require("chai-http");
import {ICompetency} from "../model/iCompetency";
import {IPerformanceReview} from "../model/iPerformanceReview";
import {IPerformanceSection} from "../model/iPerformanceSection";

const jsf = require('json-schema-faker');

const SERVER = "http://localhost:8080";
const BASE_PATH = "/JABC/1.0.0/performance";
const EMPLOYEE_BASE_PATH = "/JABC/1.0.0/employee";
const URI = `${SERVER}${BASE_PATH}`;

chai.use(chaiHttp);
chai.use(chaiJsonEqual);
chai.use(chaiExclude);
chai.use(require('chai-json-schema'));

chai.tv4.addSchema(URI, schemaDefinition);
let expect = chai.expect;
const schema = chai.tv4.getSchema(`${URI}`);


jsf.extend('faker', () => require('faker'));

describe("PerformanceService tests", () => {

    describe("/performance/plan/{id} tests with admin credential", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should return an error for putting a specific non-existent workplan ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.fkEmployee = 3;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/plan/88`)
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

        it("Should return an error for deleting a specific non-existent workplan ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/plan/88`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to return a specific workplan ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IPerformancePlan);
                expect(response.body.sections.length).to.be.equal(3);
            }
        });

        it("Should be able to update a specific workplan, created date in the future ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.fkEmployee = 3;
            workplan.createDate = "2025-01-01";
            workplan.comments = [];
            workplan.sections = [];
            let section = jsf.generate(schema.definitions.IPerformanceSection);
            section.data = '{"pid": 102, "name": "name2"}';
            workplan.sections.push(section);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/plan/1`)
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

        it("Should be able to see the update, created date should not be a future date ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IPerformancePlan);
                expect(response.body.sections.length).to.be.equal(1);
                expect(response.body.sections[0].data).to.deep.equal({pid: 102, name: "name2"});
                expect(response.body.createdDate).to.not.equal("2025-01-01");
            }
        });

        it("Should be able to delete a specific workplan ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should return an error for getting a specific non-existent workplan ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

    });

    describe("/performance/plan/{id} tests with manager credential, employee not linked", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("manager");
            return HEADERS;
        });

        it("Should not be able to return a specific workplan for employee not under this manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to update a specific workplan, for employee not under this manager ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.fkEmployee = 3;
            workplan.createDate = "2025-01-01";
            workplan.comments = [];
            workplan.sections = [];
            let section = jsf.generate(schema.definitions.IPerformanceSection);
            section.data = '{"pid": 102, "name": "name2"}';
            workplan.sections.push(section);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/plan/1`)
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

        it("Should not be able to delete a specific workplan, employee not under this manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

    });


    describe("/performance/plan/{id} tests with manager credential, employee linked", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            let hrHeaders = await TestSetup.login("admin");
            await chai.request(SERVER)
                .post(`${EMPLOYEE_BASE_PATH}/3/manager/2`)
                .set(hrHeaders);
            HEADERS = await TestSetup.login("manager");
            return HEADERS;
        });

        it("Should be able to get a specific workplan, employee under this manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IPerformancePlan);
                expect(response.body.sections.length).to.be.equal(3);
                expect(response.body.sections[0].data).to.deep.equal({pid: 101, name: "name1"});
            }
        });

        it("Should be able to update a specific workplan, for employee not under this manager ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.fkEmployee = 3;
            workplan.createDate = "2025-01-01";
            workplan.comments = [];
            workplan.sections = [];
            let section = jsf.generate(schema.definitions.IPerformanceSection);
            section.data = '{"pid": 102, "name": "name2"}';
            workplan.sections.push(section);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/plan/1`)
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

        it("Should be able to see the update, created date should not be a future date ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IPerformancePlan);
                expect(response.body.sections.length).to.be.equal(1);
                expect(response.body.sections[0].data).to.deep.equal({pid: 102, name: "name2"});
                expect(response.body.createdDate).to.not.equal("2025-01-01");
            }
        });


        it("Should be able to delete a specific workplan, employee under this manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });
    });

    describe("/performance/plan/{id} tests with employee credential", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("employee");
            return HEADERS;
        });

        it("Should not be able to return someone else's workplan", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/plan/3`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should be able to return employee's own workplan ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IPerformancePlan);
            }
        });

        it("Should be able to update employee's own workplan ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.fkEmployee = 3;
            workplan.createDate = "2025-01-01";
            workplan.comments = [];
            workplan.sections = [];
            let section = jsf.generate(schema.definitions.IPerformanceSection);
            section.data = '{"pid": 102, "name": "name2"}';
            workplan.sections.push(section);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/plan/1`)
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

        it("Should not be able to update other employee's workplan ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let workplan = jsf.generate(schema.definitions.IPerformancePlan);
            workplan.fkEmployee = 3;
            workplan.createDate = "2025-01-01";
            workplan.comments = [];
            workplan.sections = [];
            let section = jsf.generate(schema.definitions.IPerformanceSection);
            section.data = '{"pid": 102, "name": "name2"}';
            workplan.sections.push(section);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/plan/3`)
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

        it("Should not be able to delete a specific workplan ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });
    });


    describe("/performance/review/{id} tests admin credential", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should return an error for putting a specific non-existent review ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let review = jsf.generate(schema.definitions.IPerformanceReview);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/88`)
                    .set(HEADERS)
                    .send(review);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should return an error for deleting a specific non-existent rewview ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/review/88`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to return a specific review ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/plan/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IPerformancePlan);
                expect(response.body.sections.length).to.be.equal(3);
            }
        });

        it("Should be able to update a specific review, created date in the future ", async () => {
            let response: any;
            jsf.option({
                fixedProbabilities: true,
                optionalsProbability: 1.0
            });
            let review = jsf.generate(schema.definitions.IPerformanceReview);
            review.createdDate = "2025-01-01";
            review.sections = [];
            review.comments = [];
            review.fkEmployee = 3;
            let section = jsf.generate(schema.definitions.IPerformanceSection);
            section.data = '{"pid": 102, "name": "name2"}';
            review.sections.push(section);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1`)
                    .set(HEADERS)
                    .send(review);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to see the update, created date should not be a future date ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IPerformanceReview);
                expect(response.body.sections.length).to.be.equal(1);
                expect(response.body.sections[0].data).to.deep.equal({pid: 102, name: "name2"});
                expect(response.body.createdDate).to.not.equal("2025-01-01");
            }
        });

        it("Should be able to delete a specific review ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/review/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should return an error for getting a specific non-existent workplan ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });
    });

    describe("/performance/review/{id} tests manager credential, employee not linked", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("manager");
            return HEADERS;
        });

        it("Should return an error for putting a specific review, employee not under manager ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let review = jsf.generate(schema.definitions.IPerformanceReview);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1`)
                    .set(HEADERS)
                    .send(review);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should return an error for deleting a specific review, employee not under manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/review/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to return a specific review, employee not under manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

    });

    describe("/performance/review/{id} tests manager credential, employee linked", () => {

        let HEADERS: any = null;
        before(async () => {
            let hrHeaders = await TestSetup.login("admin");
            await chai.request(SERVER)
                .post(`${EMPLOYEE_BASE_PATH}/3/manager/2`)
                .set(hrHeaders);
            HEADERS = await TestSetup.login("manager");
            return HEADERS;
        });

        it("Should be able to put a specific review, employee not under manager ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let review = jsf.generate(schema.definitions.IPerformanceReview);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1`)
                    .set(HEADERS)
                    .send(review);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should be able to return a specific review, employee under manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IPerformanceReview);
            }
        });

        it("Should be able to delete a specific review, employee under manager ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/review/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

    });


    describe("/performance/review/{id} tests employee credential", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("employee");
            return HEADERS;
        });

        it("Should be able to get its own published review ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IPerformanceReview);

            }
        });

        // REVIEW: I think he should be able to get un published reviews, if not let me know and uncomment this and I will support that feature
        it("Should not be able to get its own unpublished review ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should not be able to get other people's review ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/3`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        // REVIEW: I think he should be able to update his review as I know we are no sure about who filled this stuffed, 
        // we shoud not limit them to do this, if not let me know and uncomment this and I will support that feature
        it("Should not be able to update reviews ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let review = jsf.generate(schema.definitions.IPerformanceReview);
            review.createdDate = "2025-01-01";
            review.sections = [];
            review.comments = [];
            let section = jsf.generate(schema.definitions.IPerformanceSection);
            section.data = '{"pid": 102, "name": "name2"}';
            review.sections.push(section);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1`)
                    .set(HEADERS)
                    .send(review);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should not be able to delete reviews ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/review/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });
    });


    describe("/performance/review/{id}/comment + /performance/review{id}/comment/{idComment} tests admin credential", () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should display no comments ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(0);

            }
        });


        it("Should be able to create one comment ", async () => {

            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });


        it("Should be able to create one comment ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            comment.date = "2025-01-01";
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should be able to display two comments ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let review = jsf.generate(schema.definitions.IPerformanceReview);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1`)
                    .set(HEADERS)
                    .send(review);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        // REVIEW: Why the date should be different, commented last expect
        it("Should be able to get a specific comment ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IComment);
                expect(response.body.fkCommenter).to.be.equal(1);
                // expect(response.body.date).to.not.equal("2025-01-01");
            }
        });


        it("Should not be able to update a non-existent comment ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1/comment/88`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should not be able to update a comment as another user, manager has no relation to this employee ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            let otherUser = await TestSetup.login("manager");
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1/comment/2`)
                    .set(otherUser)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });


        it("Should be able to update a specific comment ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            comment.comment = "updated comment";
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1/comment/2`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });


        it("Should be able to see that update ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IComment);
                expect(response.body.fkCommenter).to.be.equal(1);
                expect(response.body.comment).to.be.equal("updated comment");
            }
        });


        it("Should be able to delete a comment ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/review/1/comment/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });


        it("Should return error for getting non-existent comment ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let review = jsf.generate(schema.definitions.IPerformanceReview);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1/comment/2`)
                    .set(HEADERS)
                    .send(review);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

    });

    describe("/performance/review/{id}/comment + /performance/review{id}/comment/{idComment} tests manager credential, not linked", () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            let hrHeaders = await TestSetup.login("admin");
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            await chai.request(SERVER)
                .post(`${BASE_PATH}/review/1/comment`)
                .set(hrHeaders)
                .send(comment);

            HEADERS = await TestSetup.login("manager");
            return HEADERS;
        });

        it("Should return error for trying to get comments for employees not linked ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });


        it("Should not be able to create comment for unlinked employee ", async () => {

            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should not be able to get specific comment of unlinked employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should not be able to update specific comment of unlinked employee ", async () => {

            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1/comment/1`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should not be able to delete specific comment of unlinked employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/review/1/comment/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

    });


    describe("/performance/review/{id}/comment + /performance/review{id}/comment/{idComment} tests manager credential, linked", () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            let hrHeaders = await TestSetup.login("admin");
            await chai.request(SERVER)
                .post(`${EMPLOYEE_BASE_PATH}/3/manager/2`)
                .set(hrHeaders);
            HEADERS = await TestSetup.login("manager");
            return HEADERS;
        });

        it("Should be able to get comments for linked employees ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(0);

            }
        });


        it("Should be able to create comment for linked employees ", async () => {

            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should be able to get specific comments for linked employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IComment);

            }
        });

        it("Should be able to update specific comments for linked employee ", async () => {

            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1/comment/1`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should be able to delete specific comments for linked employee ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/review/1/comment/1`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

    });


    describe("/performance/review/{id}/comment + /performance/review{id}/comment/{idComment} tests manager credential, employee", () => {
        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            let hrHeaders = await TestSetup.login("admin");
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            await chai.request(SERVER)
                .post(`${BASE_PATH}/review/1/comment`)
                .set(hrHeaders)
                .send(comment);
            HEADERS = await TestSetup.login("employee");
            return HEADERS;
        });

        it("Should not be able to create comments for other employee's reviews ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/3/comment`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should be able to create comments employee's own reviews ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should not be able to get comments on other employee's reviews ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/3/comment`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });


        it("Should be able to get comments on own reviews ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(2);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.IComment);

            }
        });

        it("Should be able to get comment on own reviews that are not theirs ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IComment);

            }
        });

        it("Should be able to get comments on own reviews that are theirs ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((comment: any) => {
                    expect(comment).to.be.jsonSchema(schema.definitions.IComment);
                });

            }
        });

        it("Should not be able to update other people's comments on the review ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1/comment/1`)
                    .set(HEADERS)
                    .send(comment);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should be able to update own comment on review ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let comment = jsf.generate(schema.definitions.IComment);
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/review/1/comment/2`)
                    .set(HEADERS)
                    .send(comment)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should not be able to delete other people's comments on the review ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/review/1/comment/1`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);

            }
        });

        it("Should be able to delete own comments on the review ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/review/1/comment/2`)
                    .set(HEADERS)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IComment);

            }
        });

    });

});