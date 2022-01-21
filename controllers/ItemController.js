import DatabaseHandler from '../database/databaseManager.js'
import Item from '../models/Item.js'
class ItemController {
    constructor () {
        console.log('ItemController called from client')
    }

    async get(res) {
        const GrabIDs = await DatabaseHandler.query("SELECT * FROM lego_items", []);
        let allItemsArray = [];
        let promises = [];

        GrabIDs.forEach(e => {
            promises.push(
                new Promise(resolve => {
                    const Brick = new Item(e.unique_id, e.name, e.image, e.price, e.stock, e.slug, e.description, e.schema)
        
                    allItemsArray.push(Brick.returnAsJson());

                    resolve();
                })
            );

        })

        return Promise.all(promises).then(() => {
            return res.json(allItemsArray)
        });
    }
}

export default ItemController;