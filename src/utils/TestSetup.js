"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Log_1 = require("../../util/Log");
const shell = require('shelljs');
const SERVER = "http://localhost:8080";
const BASE_PATH = "/JABC/1.0.0/employee";
const URI = `${SERVER}${BASE_PATH}`;
const chai = require('chai');
const util_1 = require("util");
const fs = require('fs');
class TestSetup {
    constructor() {
    }
    static initTestsuite(adminLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.resetDb()
                .then(() => {
                return this.login(adminLevel);
            })
                .catch((err) => {
                console.log(err);
            });
        });
    }
    static resetDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                shell.cd('db');
                shell.exec('./resetdb.sh');
                shell.cd('..');
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    ;
    static login(adminLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            let HEADERS = {
                'X-APP-ID': 'test-id',
                'X-API-Key': 'API-KEY',
                'X-Auth-Token': '',
            };
            try {
                let loginBody = {
                    email: "",
                    password: ""
                };
                if (adminLevel === 'admin') {
                    loginBody.email = "tflenderson@jabc.com";
                    loginBody.password = "hrtest";
                }
                else if (adminLevel === 'manager') {
                    loginBody.email = "mscott@jabc.com";
                    loginBody.password = "managertest";
                }
                else {
                    loginBody.email = "jhalpert@jabc.com";
                    loginBody.password = "employeetest";
                }
                let loginResponse = yield chai.request(SERVER)
                    .post(`${BASE_PATH}/token`)
                    .send(loginBody);
                HEADERS['X-Auth-Token'] = loginResponse.body.token;
                return HEADERS;
            }
            catch (err) {
                Log_1.default.error(`PerformanceService Tests: ${err}`);
            }
        });
    }
    ;
    static readDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            let documentPromises = [];
            let documents64 = [];
            let readFile = util_1.promisify(fs.readFile);
            documentPromises.push(readFile('src/utils/resources/youngObiWan.jpg'));
            documentPromises.push(readFile('src/utils/resources/adult_obi_wan.jpg'));
            documentPromises.push(readFile('src/utils/resources/old_obi_wan.jpg'));
            return Promise.all(documentPromises)
                .then((documents) => {
                documents.forEach((document) => {
                    documents64.push(Buffer.from(document).toString('base64'));
                });
                return documents64;
            }).catch((err) => {
                console.log(err);
            });
        });
    }
}
exports.default = TestSetup;
//# sourceMappingURL=TestSetup.js.map