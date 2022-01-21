import * as Item from '../models/Item.js'

class ItemController {
    constructor () {
        console.log('yess!!')
    }

    get(params) {
        return new Promise((resolve, reject) => {
            const Brick = Item.new(1);

            resolve(Brick.returnAsJson());
        });
    }
}

export default ItemController;