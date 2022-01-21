import DatabaseHandler from '../database/databaseManager.js'

class Item {
    constructor (id) {
        this.id = id;
        this.name = null;
        this.image = null;
        this.price = null;
        this.stock = null;
        this.slug = null;
        this.description = null;
        this.schema = null;

        this.prepareItem()
    }

    async prepareItem () {
        const ItemRow = await DatabaseHandler.query("SELECT * FROM lego_items where unique_id=?", [this.id]);

        this.name = ItemRow['name'];
        this.image = ItemRow['image'];
        this.price = ItemRow['price'];
        this.stock = ItemRow['stock'];
        this.slug = ItemRow['slug'];
        this.description = ItemRow['description'];
        this.schema = ItemRow['description'];

        console.log(this.name);
    }

    returnAsJson () {
        return [this.id, this.name, this.image, this.price, this.stock, this.slug, this.description, this.schema];
    }
}

export default Item;