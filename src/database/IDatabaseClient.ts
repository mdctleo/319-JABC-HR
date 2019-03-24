import {JABCResponse, JABCError, JABCResponseType} from '../utils/ResponseManager'

export class DatabaseConnectionError extends JABCError {
    constructor(...args: any[]) {
        super(JABCResponse.UNHANDLED_ERROR, args);
    }
}

export class DatabaseWriteError extends JABCError {
    constructor(service: JABCResponseType, error: any, log: string) {
        if(error.sqlState == '45000'){
            super(service, error.message);
        }else{
            super(JABCResponse.UNHANDLED_ERROR, log);
        }
    }
}

export class DatabaseQueryError extends JABCError {
    constructor(service: JABCResponseType, error: any, log: string) {
        if(error.sqlState == '45000'){
            super(service, error.message);
        }else{
            super(JABCResponse.UNHANDLED_ERROR, log);
        }
    }
}

export default interface IDatabaseClient {


    /**
     * Performs a database write
     *
     * @param query
     *
     * If a failure occurs, throw DatabaseWriteError
     * @param params
     * @param responseType
     */
    write(query: any, params: any[], responseType?: JABCResponseType): Promise<void>;

    /**
     * Performs a query on the database
     *
     * @param query
     *
     * @param params
     * @param responseType
     * @return any
     *
     * Retrieves data which matches the given query
     *
     * If a failure occurs, throw DatabaseQueryError
     *
     */
    query(query: any, params: any[], responseType?: JABCResponseType): Promise<any>;

    /**
     * Performs a query on an already opened connection without closing it
     *
     * @param query
     * @param params
     * @param {JABCResponseType} [responseType] JABC service that requested the transaction
     * @returns {Promise<any>}
     * @memberof IDatabaseClient
     */
    rawQuery(query: any, params: any[], responseType?: JABCResponseType): Promise<any>;

    /**
     * Initializes the connection and begins a transaction
     * Note: when using transactions after commit or rollback the database 
     * has to be close manually calling closeConnection
     *
     * @param {JABCResponseType} [responseType] JABC service that requested the transaction
     * @returns {Promise<any>}
     * @memberof IDatabaseClient
     */
    beginTransaction(responseType?: JABCResponseType): Promise<any>;

    /**
     * Commits the transaction
     *
     * @param {JABCResponseType} [responseType] JABC service that requested the transaction
     * @returns {Promise<any>}
     * @memberof IDatabaseClient
     */
    commit(responseType?: JABCResponseType): Promise<any>;

    /**
     * Rollback a transaction
     *
     * @param {JABCResponseType} [responseType] JABC service that requested the transaction
     * @returns {Promise<any>}
     * @memberof IDatabaseClient
     */
    rollback(responseType?: JABCResponseType): Promise<any>;
}
