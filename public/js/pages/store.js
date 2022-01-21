const loadStoreItems = async () => {
    const response = await fetch(`api/store`);
    let StoreItems;


    if (response.ok) {
        StoreItems = await response.json();
        
        StoreItems.forEach(e => {
            document.querySelector(`#${e.Schema}-section`).insertAdjacentHTML('afterbegin',
            `<a class="item" href="/store/${e.Slug}">
                <div class="image"
                    style="background-image: url(${e.Image});">
                </div>
                <p class="item_description">${e.Name}</p>
            </a>`)
        });
    }

}

loadStoreItems()