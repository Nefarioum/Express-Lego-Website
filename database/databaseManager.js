import { initializeDBTable } from './databaseDummyData.js';
import DB from 'sqlite3';
class DatabaseHandler {
    constructor() {
        this.DatabaseConnection = null
        this.Database = null

        this.init();
    }

    async init() {
        const DatabaseRow = await this.query("SELECT count(*) FROM sqlite_master WHERE type='table'AND name ='lego_items';", []);

        if (!DatabaseRow['count(*)']) {
            return this.initTable();
        };
    }

    async connection() {
        return new Promise(resolve => {
            const Database = new DB.Database('database/db/lego-store.db', (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log('Connected to the in-memory SQlite database.');

                this.DatabaseConnection = Database;

                resolve(Database);
            });;
        });
    }

    async close() {
        await this.DatabaseConnection.close((err) => {
            if (err) {
              console.error(err.message);
            }

            console.log('Closed the database connection.');
        });
    }


    async query(sql, parameters) {
        this.DatabaseConnection = await this.connection();

        return new Promise(resolve => {
            this.DatabaseConnection.get(sql, parameters, (err, row) => {
                if (err) console.error(`${sql}- ${err.message}`);
                this.close();

                console.log('Single Query has executed successfully.')

                resolve(row);
            });
        });
    }

    async multipleQueries(queriesParameter) {
        this.DatabaseConnection = await this.connection();
        let promises = [];

        this.DatabaseConnection.serialize(() => {
            queriesParameter.forEach((e) => {
                promises.push(
                    new Promise(resolve => {
                        this.DatabaseConnection.get(e[0], e[1], (err, row) => {
                            if (err) console.error(`${e[0]} - ${err.message}`);

                            resolve(row);
                        })
                    })
                );
            })
        });
        
        return Promise.all(promises).then(() => {
            this.close()
            console.log('Multiple Queries have all executed successfully.')
        });
    }
    
    async initTable() {       
        await initializeDBTable();
    }
}

const DataHandler = new DatabaseHandler();
export default DataHandler