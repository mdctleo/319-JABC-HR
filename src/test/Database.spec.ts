import IDatabaseClient, {DatabaseConnectionError, DatabaseQueryError} from "../database/IDatabaseClient";
import Database from "../database/Database";
import {expect} from "chai";
import Log from "../../util/Log";

describe("Database Tests", () => {

    let db: IDatabaseClient;

    before(() => {
        try {
            db = Database.getInstance();
        } catch (err) {
            Log.error(`Database Tests: ${err}`);
            db = err;
        } finally {
            expect(db).to.be.instanceOf(Database);
        }
    });

    it ("Should throw a DatabaseQueryError if a query is unable to be performed", async () => {
        const malformedQuery: string = "******";
        let result: any;
        try {
            result = await db.query(malformedQuery, ["s1", "s2"]);
        } catch (err) {
            result = err;
        } finally {
            expect(result).to.be.instanceOf(DatabaseQueryError);
        }
    });

    it ("Should throw a DatabaseConnectionError when a connection is unable to be opened", async () => {
        const config: any = "invalid config";
        let result: any;
        try {
            await db.initConnection(config);
        } catch (err) {
            result = err;
        } finally {
            expect(result).to.be.instanceOf(DatabaseConnectionError);
        }
    });


    it ("Should throw a DatabaseQueryError when a query is unable to be performed" , async () => {
        let queryResult: any;
        try {
            queryResult = await db.query("some invalid query", null);
        } catch (err) {
            queryResult = err;
        } finally {
            expect(queryResult).to.be.instanceOf(DatabaseQueryError);
        }
    });
});