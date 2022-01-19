import { initializeDBTable } from './databaseDummyData.js';
import DB from 'sqlite3';
class DatabaseHandler {
    constructor() {
        this.DatabaseConnection = null

        this.init();
    }

    async init() {
        const Database = await new DB.Database('database/db/lego-store.db', async (err) => {
            if (err) {
              return console.error(err.message);
            }
    
            Database.get("SELECT count(*) FROM sqlite_master WHERE type='table'AND name ='lego_items';", [], async (err, row) => {
                if (err) return console.error(err.message);
        
                if (!row['count(*)']) {
                    await Database.close();
                    return this.initTable();
                } 

                console.log('Connected to the in-memory SQlite database.');

                this.DatabaseConnection = Database;
              });
          });;
    }

    async query(sql, parameters) {
        await this.DatabaseConnection.get(sql, parameters, async (err, row) => {
            if (err) return console.error(err.message);
            console.log(sql);
            return row;
        });
    }

    
    async initTable(sql, parameters) {
        const Database = await new DB.Database('database/db/lego-store.db', async (err) => {
            console.log('Connected to the in-memory SQlite database.');

        });;

        this.DatabaseConnection = Database;
        await initializeDBTable();
    }

}

const DataHandler = new DatabaseHandler();
export default DataHandler