import { createDummyData } from './databaseDummyData.js';
import DatabaseHandler from 'better-sqlite3';

const initializeDB = async () => {
    const Database = await new DatabaseHandler('database/db/lego-store.db');

    const ItemsTable = Database.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name ='lego_items';").get();

    if (!ItemsTable['count(*)']) await createDBTable(Database);

    return Database;
};


const createDBTable = async (Database) => {
    await Database.prepare("CREATE TABLE lego_items (unique_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, image TEXT, price INTEGER, stock INTEGER, slug TEXT, description TEXT, schema TEXT);").run();
    await Database.prepare("CREATE UNIQUE INDEX idx_lego_items_id ON lego_items (unique_id);").run();
    Database.pragma("synchronous = 1");
    Database.pragma("journal_mode = wal");

    createDummyData(Database)
};


const Database = initializeDB();


