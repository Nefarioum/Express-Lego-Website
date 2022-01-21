import DatabaseHandler from './databaseManager.js'

export const initializeDBTable = async () => {
    await DatabaseHandler.multipleQueries([
        ["CREATE TABLE lego_items (unique_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, image TEXT, price INTEGER, stock INTEGER, slug TEXT, description TEXT, schema TEXT);", []],
        ["CREATE UNIQUE INDEX idx_lego_items_id ON lego_items (unique_id);", []],
    ]);
    await createDummyData()
};

export const createDummyData = async () => {
    await DatabaseHandler.multipleQueries([
        ["INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (?, ?, ?, ?, ?, ?, ?);", ['Lego Piece (Blue)', 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', 5, 100, 'blue-brick-1', 'A blue lego brick for all your lego needs!', 'brick']],
        ["INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (?, ?, ?, ?, ?, ?, ?);", ['Lego Piece (Yellow)', 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', 5, 100, 'yellow-brick-1', 'A yellow lego brick for all your lego needs!', 'brick']],
        ["INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (?, ?, ?, ?, ?, ?, ?);", ['Lego Piece (Green)', 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', 5, 100, 'green-brick-1', 'A green lego brick for all your lego needs!', 'brick']],
        ["INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (?, ?, ?, ?, ?, ?, ?);", ['Lego Piece (Orange)', 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', 5, 100, 'orange-brick-1', 'A orange lego brick for all your lego needs!', 'brick']],
        ["INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (?, ?, ?, ?, ?, ?, ?);", ['Lego Piece (Black)', 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', 5, 100, 'black-brick-1', 'A black lego brick for all your lego needs!', 'brick']],
        ["INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (?, ?, ?, ?, ?, ?, ?);", ['Lego Piece (Purple)', 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', 5, 100, 'purple-brick-1', 'A purple lego brick for all your lego needs!', 'brick']],
    ])
};
