const getItemID = () => {
    return window.location.hash.substring(1);
}

const addItemToCart = async () => {
    const response = await fetch(`api/store/cart/${getItemID()}/1/1`);

    if (response.ok) {
        CartResponse = await response.json();

        console.dir(CartResponse);
    }
}

const loadStoreItems = async () => {
    const response = await fetch(`api/store/${getItemID()}`);
    let StoreItems;

    if (response.ok) {
        StoreItems = await response.json();

        if (StoreItems.length > 0) {
            document.querySelector(`#name`).insertAdjacentHTML('afterbegin',
            `<h1 class="text">${StoreItems[0].Name}</h1>
             <p class="text">${StoreItems[0].Description}</p>
    
             <div class="image"
                    style="background-image: url(${StoreItems[0].Image});">
             </div>
    
            `)

            let AddToCartButton = document.getElementById("add-to-cart");

            AddToCartButton.addEventListener('click', () => addItemToCart(), false);

        } else {
            window.location.href = window.location.href.replace(`item#${getItemID()}`, '404-not-found');
        }
    } 

}

loadStoreItems()