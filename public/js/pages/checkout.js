let CurrentCartItems = [];
let totalPrice, totalItems, totalQuanitity;
let hasCheckoutBeenInitiated = false;

const alterItemQuantity = async (item, modifier) => {
    const response = await fetch(`api/store/cart/${item.id}/1/${modifier}`);

    if (response.ok) {
        CartResponse = await response.json();

        let IncreaseQuantity = document.getElementById(`current-count-${item.id}`);

        if (modifier) {
            totalPrice += item.price;
            totalQuanitity++;

            CurrentCartItems.forEach(function(ShoppingItem, Index) {
                if (ShoppingItem.item.id == item.id) {
                    this[Index].quantity++;
                }
              }, CurrentCartItems)

            IncreaseQuantity.innerText++
        } else {
            if (IncreaseQuantity.innerText - 1 <= 0) {
                IncreaseQuantity.innerText = 1;
            } else {
                totalPrice -= item.price;
                totalQuanitity--;
    
                CurrentCartItems.forEach(function(ShoppingItem, Index) {
                    if (ShoppingItem.item.id == item.id) {
                        this[Index].quantity--;
                    }
                  }, CurrentCartItems)

                IncreaseQuantity.innerText--
            }
        }

        updateCheckoutInfo();
    }
}

const removeItemFromCart = async (item, quantity) => {
    const response = await fetch(`api/store/cart/remove/${item.id}`);

    if (response.ok) {
        CartResponse = await response.json();

        totalItems--;

        const CartItemDiv = document.getElementById(`Cart-Item-${item.id}`)
        CartItemDiv.parentNode.removeChild(CartItemDiv);

        CurrentCartItems.forEach(function(ShoppingItem, Index) {
            if (ShoppingItem.item.id == item.id) {
                totalPrice -= (item.price * ShoppingItem.quantity);
                totalQuanitity -= ShoppingItem.quantity;

                this.splice(Index, 1);
            }
          }, CurrentCartItems)
    
        updateCheckoutInfo();

        if (CurrentCartItems.length === 0) toggleCartEmpty(true);
    }
}


const clearCart = async () => {
    const response = await fetch(`api/store/cart/empty/`);

    if (response.ok) {
        CartResponse = await response.json();

        totalPrice = totalItems = totalQuanitity = 0;
    
        updateCheckoutInfo();
        toggleCartEmpty(true);
    }
}

const updateCheckoutInfo = () => {
    if (!hasCheckoutBeenInitiated) {
        document.querySelector(`#total-cart`).insertAdjacentHTML('afterbegin',
        `
            <div>
            <div class="Subtotal-cart">Total</div>
            <div class="items-cart" id="total-items">${totalItems} items, ${totalQuanitity} quantity</div>
            </div>
            <div class="total-amount-cart" id="total-price">£${totalPrice}.00</div>
        `)
        hasCheckoutBeenInitiated = true;
    } else {
        let TotalItems = document.getElementById("total-items");
        let TotalPrice = document.getElementById("total-price");

        TotalItems.innerText = `${totalItems} items, ${totalQuanitity} quantity`;
        TotalPrice.innerText = `£${totalPrice}.00`
    }
}

const toggleCartEmpty = (toggle) => {
    if (toggle) {
        document.querySelectorAll(`.hidden`).forEach(e => {
            e.hidden = true;
        });
        document.querySelector(`#cart-header`).innerHTML = "Your shopping cart is empty";

        CurrentCartItems.forEach(e => {
            const CartItemDiv = document.getElementById(`Cart-Item-${e.item.id}`)

            CartItemDiv.parentNode.removeChild(CartItemDiv);
        })

        document.getElementById(`checkout-cart`).removeChild(document.getElementById(`total-cart`));
    } else {
        document.querySelectorAll(`.hidden`).forEach(e => {
            e.hidden = false;
        })
        document.getElementById(`cart-header`).innerHTML = "Shopping Cart";
    }

}

const loadStoreItems = async () => {
    const response = await fetch(`api/store/cart/view`);
    if (response.ok) {
        CartItems = await response.json();

        if (CartItems.message) {
            toggleCartEmpty(true);
            CurrentCartItems = [];
        } else {
            CurrentCartItems = CartItems;
            totalPrice = totalItems = totalQuanitity = 0;

            CartItems.forEach(e => {
                totalPrice += ( e.item.price * e.quantity);
                totalQuanitity += e.quantity;
                totalItems++;

                document.querySelector(`#cart-items`).insertAdjacentHTML('afterbegin',
                `<div class="Cart-Items pad-cart" id="Cart-Item-${e.item.id}">
                    <div class="image-box-cart">
                    <img src="${e.item.image}" style="height:120px;" />
                    </div>
                    <div class="about-cart">
                    <h1 class="title-cart">${e.item.name}</h1>
                    <h3 class="subtitle-cart">In Stock</h3>
                        <img src="https://github.com/Vikalp2502/Shopping-Cart-UI/blob/main/images/veg.png?raw=true" style="height:30px" />
    
                    </div>
                    <div class="counter-cart">
                    <div class="btn-cart" id="decrease-quantity">-</div>
                    <div class="count-cart" id="current-count-${e.item.id}">${e.quantity}</div>
                    <div class="btn-cart" id="increase-quantity">+</div>
                    </div>
                    <div class="prices-cart">
                    <div class="amount-cart">£${e.item.price}.00</div>
                    <div class="remove-cart" id="remove-single-item"><u>Remove</u></div>
                    </div>
                </div>`)

                let IncreaseQuantity = document.getElementById("increase-quantity");
                let DecreaseQuantity = document.getElementById("decrease-quantity");
                let RemoveItem = document.getElementById("remove-single-item");

                IncreaseQuantity.addEventListener('click', () => alterItemQuantity(e.item, 1), false);
                DecreaseQuantity.addEventListener('click', () => alterItemQuantity(e.item, 0), false);
                RemoveItem.addEventListener('click', () => removeItemFromCart(e.item), false);
            });

            let RemoveAllButton = document.getElementById(`remove-all-button`);
            RemoveAllButton.addEventListener('click', () => clearCart(), false);

            updateCheckoutInfo();
            toggleCartEmpty(false);
        }
    }

}

loadStoreItems()