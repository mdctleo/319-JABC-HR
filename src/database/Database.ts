import IDatabaseClient, {DatabaseConnectionError, DatabaseQueryError, DatabaseWriteError} from "./IDatabaseClient";
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
            response = await conn.execute(query, params);
            conn.release();
            return response;
        } catch (err) {
            const errMsg: string = `Database::Failed to perform query: ${query}, with err: ${err}`;
            Log.error(errMsg);
            try{
                conn.release();
            }catch(e){}
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async rawQuery(conn: any, query: any, params: any[], responseType?: JABCResponseType): Promise<any> {
        try {
            return await conn.execute(query, params);
        } catch (err) {
            const errMsg: string = `Database::Failed to perform query: ${query}, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async beginTransaction(conn: any, responseType?: JABCResponseType): Promise<any>{
        try {
            await conn.query('START TRANSACTION;');
            return;
        } catch (err) {
            const errMsg: string = `Database::Failed to initialize transaction, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async commit(conn: any, responseType?: JABCResponseType): Promise<any>{
        try {
            await conn.query('COMMIT;');
            return;
        } catch (err) {
            const errMsg: string = `Database::Failed to commit transaction, with err: ${err}`;
            Log.error(errMsg);
            throw new DatabaseQueryError(responseType, err, errMsg);
        }
    }

    public async rollback(conn: any, responseType?: JABCResponseType): Promise<any>{
        try {
            await conn.query('ROLLBACK;');
            return;
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
            try{
                conn.release();
            }catch(e){}
            throw new DatabaseWriteError(responseType, err, errMsg);
        }
    }

    public async initConnection(responseType?: JABCResponseType): Promise<any> {
        try {
            return await this.pool.getConnection();
        } catch (err) {
            const errMsg: string = `Database::Failed to open connection: ${err}`;
            Log.error(errMsg);
            throw new DatabaseWriteError(responseType, err, errMsg);
        }
    }

    public async closeConnection(conn: any): Promise<void> {
        try {
            await conn.release();
        } catch (err) {
            const errMsg: string = `Database::failed to close connection: ${err}`;
            Log.error(errMsg);
            throw new DatabaseConnectionError(errMsg);
        }
    }

}