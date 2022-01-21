import DatabaseHandler from '../database/databaseManager.js'

class Item {
    constructor (id, name = null, image = null, price = null, stock= null, slug= null, description= null, schema= null) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.slug = slug;
        this.description = description;
        this.schema = schema;

        if (this.name == null) prepareItem();
    }

    async prepareItem () {
        const ItemRow = await DatabaseHandler.query("SELECT * FROM lego_items where unique_id=?", [this.id]);

        this.name = ItemRow[0]['name'];
        this.image = ItemRow[0]['image'];
        this.price = ItemRow[0]['price'];
        this.stock = ItemRow[0]['stock'];
        this.slug = ItemRow[0]['slug'];
        this.description = ItemRow[0]['description'];
        this.schema = ItemRow[0]['description'];

    }

    returnAsJson () {
        return {'ID': this.id, 'Name': this.name, 'Image': this.image, 'Price': this.price, 'Stock': this.stock, 'Slug': this.slug, 'Description': this.description, 'Schema': this.schema};
    }
}

export default Item;