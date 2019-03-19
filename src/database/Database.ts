import IDatabaseClient, {DatabaseConnectionError, DatabaseQueryError, DatabaseWriteError, IDatabaseQuery} from "./IDatabaseClient";
import Log from "../../util/Log";
import * as config from "../database/dbConfig.json";
import { JABCResponseType } from "../utils/ResponseManager";

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

    public async query(query: any, params: any[], responseType?: JABCResponseType): Promise<any> {
        let response: any;
        try {
            await this.initConnection(config);
            response = await this.connection.execute(query, params);
            await this.closeConnection();
            return response;
        } catch (err) {
            const errMsg: string = `Database::Failed to perform query: ${query}, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async transaction(queries: Array<IDatabaseQuery>, responseType?: JABCResponseType): Promise<any> {
        let response: any;
        try {
            await this.initConnection(config);
            await this.connection.query('START TRANSACTION');
            let responses = []
            for(let query of queries){
                responses.push(await this.connection.execute(query.query, query.params));
            }
            await this.connection.query('COMMIT');
            await this.closeConnection();
            return response;
        } catch (err) {
            const errMsg: string = `Database::Failed to perform transaction, with err: ${err}`;
            Log.error(errMsg);
            try{
                await this.connection.query('ROLLBACK');
            }catch(err2){
                const err2Msg: string = `Database::Failed to perform rollback, with err: ${err}`;
                Log.error(err2Msg);
            }
            throw new DatabaseQueryError(responseType, err, errMsg);
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

    public async write(query: any, params: any[], responseType?: JABCResponseType): Promise<void> {
        let response: any;
        try {
            await this.initConnection(config);
            response = await this.connection.execute(query, params);
            await this.closeConnection();
            return response;
        } catch (err) {
            const errMsg: string = `Database::Failed to perform query: ${query}, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseWriteError(responseType, err, errMsg);
        }
    }
}