import IDatabaseClient, {DatabaseQueryError, DatabaseWriteError} from "./IDatabaseClient";
import Log from "../../util/Log";
import * as config from "../database/dbConfig.json";
import { JABCResponseType } from "../utils/ResponseManager";


export default class Database implements IDatabaseClient {

    private static instance: IDatabaseClient = null;
    private mysql: any;
    private pool: any;

    public static getInstance(): IDatabaseClient {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new Database();
        }
        return this.instance;
    }

    private constructor() {
        this.mysql = require('mysql2/promise');
        this.pool = this.mysql.createPool(config);
    }

    public async query(query: any, params: any[], responseType?: JABCResponseType): Promise<any> {
        let response;
        let conn;
        try {
            conn = await this.pool.getConnection();
            response = conn.execute(query, params);
            conn.release();
            return response;
        } catch (err) {
            const errMsg: string = `Database::Failed to perform query: ${query}, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async rawQuery(query: any, params: any[], responseType?: JABCResponseType): Promise<any> {
        let response;
        let conn;
        try {
            conn = await this.pool.getConnection();
            response = await conn.execute(query, params);
            conn.release();
            return response;
        } catch (err) {
            const errMsg: string = `Database::Failed to perform query: ${query}, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async beginTransaction(responseType?: JABCResponseType): Promise<any>{
        let conn;
        try {
            conn = await this.pool.getConnection();
            await conn.query('START TRANSACTION;');
            conn.release();
            return
        } catch (err) {
            const errMsg: string = `Database::Failed to initialize transaction, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async commit(responseType?: JABCResponseType): Promise<any>{
        let conn;
        try {
            conn = await this.pool.getConnection();
            await conn.query('COMMIT;');
            conn.release();
        } catch (err) {
            const errMsg: string = `Database::Failed to commit transaction, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async rollback(responseType?: JABCResponseType): Promise<any>{
        let conn;
        try {
            conn = await this.pool.getConnection();
            await conn.query('ROLLBACK;');
            conn.release();
        } catch (err) {
            const errMsg: string = `Database::Failed to rollback transaction, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async write(query: any, params: any[], responseType?: JABCResponseType): Promise<void> {
        let response;
        let conn;
        try {
            conn = await this.pool.getConnection();
            response = await conn.execute(query, params);
            conn.release();
            return response;
        } catch (err) {
            const errMsg: string = `Database::Failed to perform query: ${query}, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseWriteError(responseType, err, errMsg);
        }
    }
}