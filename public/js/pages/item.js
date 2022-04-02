const getItemID = () => {
    return window.location.hash.substring(1);
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
        } else {
            window.location.href = window.location.href.replace(`item#${getItemID()}`, '404-not-found');
        }
    } 
}

loadStoreItems()