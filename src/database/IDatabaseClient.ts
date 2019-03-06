export class DatabaseConnectionError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export class DatabaseWriteError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export class DatabaseQueryError extends Error {
    constructor(...args: any[]) {
        super(...args);
    }
}

export default interface IDatabaseClient {


    /**
     * Performs a database write
     *
     * @param query
     *
     * If a failure occurs, throw DatabaseWriteError
     */
    write(query: any): Promise<void>;

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
    query(query: any): Promise<any>;

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
