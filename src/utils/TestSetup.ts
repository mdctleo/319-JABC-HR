import Log from "../../util/Log";
const shell = require('shelljs');
const SERVER = "http://localhost:8080";
const BASE_PATH = "/JABC/1.0.0/employee";
const URI = `${SERVER}${BASE_PATH}`;
const chai = require('chai');
import {promisify} from 'util';
const fs = require('fs');

export default class TestSetup {
    constructor() {

    }


   public static resetDb() {
        try {
            shell.cd('db');
            shell.exec('./resetdb.sh');
            shell.cd('..');
        } catch (e) {
            console.log(e);
        }
    };

    public static async login(adminLevel: string): Promise<any> {
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
               loginBody.email = "hradmin@jabc.com";
               loginBody.password = "HRadmin1*";
           } else if (adminLevel === 'manager') {
               loginBody.email = "manager@jabc.com";
               loginBody.password = "Manager1*";
           } else {
               loginBody.email = "employee1@jabc.com";
               loginBody.password = "Employee1*";
           }

            let loginResponse = await chai.request(SERVER)
                .post(`${BASE_PATH}/token`)
                .send(loginBody);
            HEADERS['X-Auth-Token'] = loginResponse.body.token;
            return HEADERS;
        } catch (err) {
            Log.error(`PerformanceService Tests: ${err}`);
        }
    };

    public static async readDocuments(): Promise<any> {
        let documentPromises: Array<Promise<Buffer>> =[];
        let documents64: Array<String> = [];
        let readFile = promisify(fs.readFile);
        documentPromises.push(readFile('src/utils/resources/youngObiWan.jpg'));
        documentPromises.push(readFile('src/utils/resources/adult_obi_wan.jpg'));
        documentPromises.push(readFile('src/utils/resources/old_obi_wan.jpg'));

      return Promise.all(documentPromises)
            .then((documents) => {
                documents.forEach((document: Buffer) => {
                   documents64.push(Buffer.from(document).toString('base64'));
                });
                return documents64;
            }).catch((err) => {
                console.log(err);
        })

    }
}