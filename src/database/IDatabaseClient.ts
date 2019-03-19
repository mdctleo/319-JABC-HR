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

export interface IDatabaseQuery{
    query: string;
    params?: Array<any>
}

export default interface IDatabaseClient {


    /**
     * Performs a database write
     *
     * @param query
     *
     * If a failure occurs, throw DatabaseWriteError
     */
    write(query: any, params: any[], responseType?: JABCResponseType): Promise<void>;

    /**
     * Performs a query on the database
     *
     * @param query
     *
     * @return any
     *
     * Retrieves data which matches the given query
     *
     * If a failure occurs, throw DatabaseQueryError
     *
     */
    query(query: any, params: any[], responseType?: JABCResponseType): Promise<any>;

    /**
     * Opens a connection to a database service
     *
     * @return void
     *
     * If a failure occurs, throw DatabaseConnectionError
     */
    initConnection(config: any): Promise<void>;

    /**
     * Closes a connection to a database service
     *
     * @return void
     *
     * If a failure occurs, throw DatabaseConnectionError
     */
    closeConnection(): Promise<void>;
}
