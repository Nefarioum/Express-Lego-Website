import DatabaseHandler from '../database/databaseManager.js'
import Item from '../models/Item.js'
class ItemController {
    constructor () {
        console.log('ItemController called from client')
    }
    async get(res, unique_id) {
        const GrabID = await DatabaseHandler.query("SELECT * FROM lego_items WHERE unique_id=?", [unique_id]);
        let allItemsArray = [];

        if (GrabID.length > 0) {
            new Promise(resolve => {
                const Brick = new Item(GrabID[0].unique_id, GrabID[0].name, GrabID[0].image, GrabID[0].price, GrabID[0].stock, GrabID[0].slug, GrabID[0].description, GrabID[0].schema)

                allItemsArray.push(Brick.returnAsJson());

                resolve();
            }).then(() => {
                return res.json(allItemsArray)
            })
        } else {
            return res.json([])
        }
    }

    async getAll(res) {
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