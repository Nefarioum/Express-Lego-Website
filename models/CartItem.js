class CartItem {
    constructor (item = null, quantity = null) {
        this.item = item;
        this.quantity = quantity;
    }

    addQuantity (quantity = false) {
        return quantity ? this.quantity = this.quantity + quantity : this.quantity++;
    }

    removeQuantity (quantity = false) {
        return quantity ? (this.quantity - quantity <= 0 ? 1 : this.quantity = this.quantity - quantity) : (this.quantity - 1 <= 0 ? 1 : this.quantity--)
    }
}

export default CartItem;