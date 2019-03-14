import Log from "../../util/Log";
const shell = require('shelljs');
const SERVER = "http://localhost:8080";
const BASE_PATH = "/JABC/1.0.0/employee";
const URI = `${SERVER}${BASE_PATH}`;
const chai = require('chai');
import chaiHttp = require("chai-http");


export default class TestSetup {
    constructor() {

    }

    public static async initTestsuite() {
        return this.resetDb()
            .then(()=> {
                return this.login();
            })
            .catch((err) => {
                console.log(err);
            })
    }

   private static async resetDb() {
        try {
            shell.cd('db');
            return await shell.exec('./resetdb.sh');
        } catch (e) {
            console.log(e);
        }
    };

    private static async login(): Promise<any> {
        let HEADERS = {
            'X-APP-ID': 'test-id',
            'X-API-Key': 'API-KEY',
            'X-Auth-Token': '',
        };

        try {
            let loginBody = {
                email: "tflenderson@jabc.com",
                password: "hrtest"
            };
            let loginResponse = await chai.request(SERVER)
                .post(`${BASE_PATH}/token`)
                .send(loginBody);
            HEADERS['X-Auth-Token'] = loginResponse.body.token;
            return HEADERS;
        } catch (err) {
            Log.error(`PerformanceService Tests: ${err}`);
        }
    };
}