import IDatabaseClient, {DatabaseConnectionError, DatabaseQueryError} from "./IDatabaseClient";
import Log from "../../util/Log";
import * as config from "../database/dbConfig.json";

export default class Database implements IDatabaseClient {

    private static instance: IDatabaseClient = null;
    private readonly mysql: any;
    private connection: any;

    public static getInstance(): IDatabaseClient {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new Database();
        }
        return this.instance;
    }

    private constructor() {
        this.mysql = require('mysql2/promise');
    }

    public async query(query: any): Promise<any> {
        let response: any;
        try {
            await this.initConnection(config);
            response = await this.connection.query(query);
            await this.closeConnection();
            return response;
        } catch (err) {
            const errMsg: string = `Database::Failed to perform query: ${query}, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(errMsg);
        }
    }

    public async closeConnection(): Promise<void> {
        try {
            await this.connection.close();
        } catch (err) {
            const errMsg: string = `Database::failed to close connection: ${err}`;
            Log.error(errMsg);
            throw new DatabaseConnectionError(errMsg);
        }
    }

    public async initConnection(config: any): Promise<void> {
        try {
            this.connection = await this.mysql.createConnection(config);
        } catch (err) {
            const errMsg: string = `Database::Failed to initialize DB connection: ${err}`;
            Log.error(errMsg);
            throw new DatabaseConnectionError(errMsg);
        }
    }

    public async write(query: any): Promise<void> {
        // TODO
        return Promise.reject(`Not implemented`);
    }


}