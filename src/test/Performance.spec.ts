
const schemaDefinition = require('./jabcSchema.json');
import Log from "../../util/Log";
const chai = require('chai');
import {expect} from "chai";
const chaiJsonEqual = require('chai-json-equal');
import chaiExclude = require("chai-exclude");
import chaiHttp = require("chai-http");
const jsf = require('json-schema-faker');

const SERVER = "http://localhost:8080";
const BASE_PATH = "/JABC/1.0.0/performance";
const URI = `${SERVER}${BASE_PATH}`;

chai.use(chaiHttp);
chai.use(chaiJsonEqual);
chai.use(chaiExclude);
chai.use(require('chai-json-schema'));

chai.tv4.addSchema(URI, schemaDefinition);
const schema = chai.tv4.getSchema(`${URI}`);



describe("PerformanceService Tests", () => {
    let HEADERS = {
        'X-APP-ID': 'test-id',
        'X-API-Key': 'API-KEY',
        'X-Auth-Token': 'test-token',
    };


    before(() => {
        try {
        } catch (err) {
            Log.error(`PerformanceService Tests: ${err}`);
        } finally {
        }
    });


    it("Should create a comment", async () => {
        let comment = jsf.generate(schema.definitions.IComment);
        let result: any;
        try {
            result = await chai.request(SERVER)
                .post(`${BASE_PATH}/1/comment`)
                .set(HEADERS)
                .send(comment);
        } catch (e) {
            console.log(e);
        } finally {
            result.responseCode.should.have.status(200);
            result.body.should.be.jsonSchema(schema.definitionsIApiResponse);
        }
    });



});