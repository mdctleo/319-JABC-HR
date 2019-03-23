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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResposne);

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
            workplan.createdDate = "2025-01-01";
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

    describe("/performance/review/{id} tests", () => {

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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResposne);

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


    describe("/performance/review/{id}/comment + /performance/review{id}/comment/{idComment} tests", () => {
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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResposne);

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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResposne);
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
                    .put(`${BASE_PATH}/review/88`)
                    .set(HEADERS)
                    .send(review);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResposne);
                expect(response.body.length).to.be.equal(2);

            }
        });


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
                expect(response.body.date).to.not.equal("2025-01-01");
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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResposne);

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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResposne);

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
                expect(response.statusCode).to.be.within(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResposne);

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
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResposne);

            }
        });

    });

});