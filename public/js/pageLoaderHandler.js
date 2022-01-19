let headLinks = `
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="images/favicon/favicon.ico" />
    <link rel="icon" type="image/vnd.microsoft.icon" href="images/favicon/favicon.ico">
    <link rel="icon" type="image/x-icon" href="images/favicon/favicon.ico">
    <link rel="icon" href="images/favicon/favicon.ico" />
    `

const handlePageTitle = (pageTitle = null) => {
    if (pageTitle == null) {
        const url = window.location.pathname;
        const pageTitleUncleansed = url.substring(url.lastIndexOf('/')+1);

        pageTitle = pageTitleUncleansed.charAt(0).toUpperCase() + pageTitleUncleansed.slice(1);
    }

    document.querySelector('#loadWebsiteHeadings').insertAdjacentHTML('beforeend', 
    headLinks + `
    <title>${pageTitle} | Lego Store</title>`);
};

const handleLoadingCSS = () => {
    let cssLinks = `
        <link rel="stylesheet" href="css/app.css" />
        `

    document.querySelector('#loadWebsiteCSS').insertAdjacentHTML('beforeend', cssLinks);
};

const handleLoadingCustomJS = () => {
    const url = window.location.pathname;
    const pageTitleUncleansed = url.substring(url.lastIndexOf('/')+1);

    const scriptPath = 'js/pages/'+ pageTitleUncleansed + '.js';

    try {
        let xhr = new XMLHttpRequest();
        xhr.open('HEAD', scriptPath, true);
        xhr.send();
        
        xhr.onreadystatechange = function (oEvent) {
            if (xhr.readyState === 4) {
                if (xhr.status == "202") {
                    return false;
                } else {
                    let script = document.createElement('script');
                    script.src = scriptPath;
                    document.body.appendChild(script);
                }
            }
        };
        

    } catch (e) {
        
    }

    handleLoadingComponents();
};

const handleLoadingComponents = () => {
    const CurrentComponents = ['Footer', 'NavBar'];

    CurrentComponents.forEach(e => {
        let script = document.createElement('script');
        script.src = `/components/${e}/${e}.js`;

        document.body.appendChild(script);
    });

};

