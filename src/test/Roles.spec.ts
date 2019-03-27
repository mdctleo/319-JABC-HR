import {IEmployee} from "../model/iEmployee";
import TestSetup from "../utils/TestSetup";

const schemaDefinition = require('./jabcSchema.json');

const chai = require('chai');
const chaiJsonEqual = require('chai-json-equal');
import chaiExclude = require("chai-exclude");
import chaiHttp = require("chai-http");
import {ICompetency} from "../model/iCompetency";

const jsf = require('json-schema-faker');

const SERVER = "http://localhost:8080";
const BASE_PATH = "/JABC/1.0.0/role";
const URI = `${SERVER}${BASE_PATH}`;

chai.use(chaiHttp);
chai.use(chaiJsonEqual);
chai.use(chaiExclude);
chai.use(require('chai-json-schema'));

chai.tv4.addSchema(URI, schemaDefinition);
let expect = chai.expect;
const schema = chai.tv4.getSchema(`${URI}`);


jsf.extend('faker', () => require('faker'));

describe("RoleService tests", () => {

    describe("/role tests with admin credential", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should be return 3 roles ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((role: any) => {
                   expect(role).to.be.jsonSchema(schema.definitions.IRole);
                });
                expect(response.body.length).to.be.equal(3);
                expect(response.body[1].name).to.be.equal("Sales");
            }
        });

        it("Should not be able to create a new role, malformed data", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
                fixedProbabilities: true
            });
            let role = jsf.generate(schema.definitions.IRole);
            role.name = null;
            role.id = "3333";
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(role);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be create a new role with no competency", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
                fixedProbabilities: true
            });
            let role = jsf.generate(schema.definitions.IRole);
            role.name = "CEO";
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}`)
                    .set(HEADERS)
                    .send(role);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should be able to return 4 roles", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                response.body.forEach((role: any) => {
                    expect(role).to.be.jsonSchema(schema.definitions.IRole);
                });
                expect(response.body.length).to.be.equal(4);
                expect(response.body[3].name).to.be.equal("CEO");
            }
        });
    });

    describe("/role/{id} tests with admin credential", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should not return a non-existent role ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/100`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });


        it("Should return a role ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IRole);
                expect(response.body.name).to.be.equal("Sales");
            }
        });
        // REVIEW: This is passing, but is not accomplishing its purpose, it fails because there is not data sent
        it("Should not update a non-existent role ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/88`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });
        // REVIEW: This is passing, but is not accomplishing its purpose, it fails because there is not data sent
        it("Should not update a role with malformed data ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0
            });
            let role = jsf.generate(schema.definitions.IRole);
            role.description = 3333;
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should update a role ", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
                fixedProbabilities: true
            });
            let role = jsf.generate(schema.definitions.IRole);
            role.name = "Updated role name";
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/2`)
                    .set(HEADERS)
                    .send(role)
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should see the update ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IRole);
                expect(response.body.name).to.be.equal("Updated role name");
            }
        });

        it("Should not delete a non-existent role ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/100`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.within(400, 500);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        // REVIEW: I changed the stored procedure to set to NULL the role of all HR_RECORDs that have
        // assigned this role, but we should be careful with this on the frontend because its dangerous.
        it("Should delete a role ", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should return two roles after the deletion", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
               expect(response.statusCode).to.be.equal(200);
               response.body.forEach((role: any) => {
                   expect(role).to.be.jsonSchema(schema.definitions.IRole);
               });
               expect(response.body.length).equal(2);
               expect(response.body[1].name).equal('Marketing');
            }
        });
    });


    describe("/role/{idRole}/competency tests with admin credentials", () => {

        let HEADERS: any = null;
        before(async () => {
            TestSetup.resetDb();
            HEADERS = await TestSetup.login("admin");
            return HEADERS;
        });

        it("Should display no competency", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/1/competency`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(0);
            }
        });

        it("Should create one competency for role 1", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
                fixedProbabilities: true
            });
            let competency = jsf.generate(schema.definitions.ICompetency);
            competency.fkRole = 1;
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/1/competency`)
                    .set(HEADERS)
                    .send(competency);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should create one competency for role 1", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
                fixedProbabilities: true
            });
            let competency = jsf.generate(schema.definitions.ICompetency);
            competency.name = "communications";
            try {
                response = await chai.request(SERVER)
                    .post(`${BASE_PATH}/1/competency`)
                    .set(HEADERS)
                    .send(competency);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should display two competencies under role 1", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/1/competency`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(2);
                response.body.forEach((competency: any) => {
                    expect(competency).to.be.jsonSchema(schema.definitions.ICompetency);
                });
                expect(response.body[1].name).to.be.equal("communications");
            }
        });

        it("Should be able to see one specific competency", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/1/competency/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.ICompetency);
                expect(response.body.name).to.be.equal("communications");
            }
        });

        it("Should be able to update that competency", async () => {
            let response: any;
            jsf.option({
                optionalsProbability: 1.0,
                fixedProbabilities: true
            });
            let competency = jsf.generate(schema.definitions.ICompetency);
            competency.name = "excel";
            try {
                response = await chai.request(SERVER)
                    .put(`${BASE_PATH}/1/competency/2`)
                    .set(HEADERS)
                    .send(competency);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to see the update for that competency", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/1/competency/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.ICompetency);
                expect(response.body.name).to.be.equal("excel");
            }
        });

        it("Should be able to delete a competency", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .delete(`${BASE_PATH}/1/competency/2`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
            }
        });

        it("Should be able to see the delete", async () => {
            let response: any;
            try {
                response = await chai.request(SERVER)
                    .get(`${BASE_PATH}/1/competency`)
                    .set(HEADERS);
            }
            catch (e) {
                console.log(e);
            } finally {
                expect(response.statusCode).to.be.equal(200);
                expect(response.body.length).to.be.equal(1);
                expect(response.body[0]).to.be.jsonSchema(schema.definitions.ICompetency);
            }
        });

    });

});