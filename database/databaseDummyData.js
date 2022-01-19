export const createDummyData = async (DatabaseManager) => {
    await DatabaseManager.prepare("INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (@name, @image, @price, @stock, @slug, @description, @schema);").run({name:'Lego Piece (Blue)', image: 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', price: 5, stock:100, slug:'blue-brick-1', description:'A blue lego brick for all your lego needs!', schema:'brick'});
    await DatabaseManager.prepare("INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (@name, @image, @price, @stock, @slug, @description, @schema);").run({name:'Lego Piece (Red)', image: 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', price: 5, stock:100, slug:'red-brick-1', description:'A red lego brick for all your lego needs!', schema:'brick'});
    await DatabaseManager.prepare("INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (@name, @image, @price, @stock, @slug, @description, @schema);").run({name:'Lego Piece (Yellow)', image: 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', price: 5, stock:100, slug:'yellow-brick-1', description:'A yellow lego brick for all your lego needs!', schema:'brick'});
    await DatabaseManager.prepare("INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (@name, @image, @price, @stock, @slug, @description, @schema);").run({name:'Lego Piece (Green)', image: 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', price: 5, stock:100, slug:'green-brick-1', description:'A green lego brick for all your lego needs!', schema:'brick'});
    await DatabaseManager.prepare("INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (@name, @image, @price, @stock, @slug, @description, @schema);").run({name:'Lego Piece (Orange)', image: 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', price: 5, stock:100, slug:'orange-brick-1', description:'A orange lego brick for all your lego needs!', schema:'brick'});
    await DatabaseManager.prepare("INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (@name, @image, @price, @stock, @slug, @description, @schema);").run({name:'Lego Piece (Black)', image: 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', price: 5, stock:100, slug:'black-brick-1', description:'A black lego brick for all your lego needs!', schema:'brick'});
    await DatabaseManager.prepare("INSERT INTO `lego_items` (name, image, price, stock, slug, description, schema) VALUES (@name, @image, @price, @stock, @slug, @description, @schema);").run({name:'Lego Piece (Purple)', image: 'https://www.kindpng.com/picc/m/390-3908027_blue-lego-brick-transparent-hd-png-download.png', price: 5, stock:100, slug:'purple-brick-1', description:'A purple lego brick for all your lego needs!', schema:'brick'});
};