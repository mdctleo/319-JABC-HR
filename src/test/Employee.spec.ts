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




describe("PerformanceService Tests", () => {
    let HEADERS = {
        'X-APP-ID': 'test-id',
        'X-API-Key': 'API-KEY',
        'X-Auth-Token': 'test-token',
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

    it("Should get all employees, currently only our stock HR employee", async() => {
        let response: any;
        try {
            response = await chai.request(SERVER)
                .get(`${BASE_PATH}`)
                .set(HEADERS);
        } catch (e) {
            console.log(e);
        } finally {
            expect(response.statusCode).to.be.equal(200);
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
            expect(response.body).to.be.jsonSchema(schema.definitions.SuccessfulResponse);
        }
    });



});