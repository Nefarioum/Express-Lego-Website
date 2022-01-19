const handleHTMLSnippits = () => {
    id = document.getElementsByTagName("*");
    for (i = 0; i < id.length; i++) {
        element = id[i];

        file = element.getAttribute(
            "html-snippet");

        if (file) {
            xmlRequest = new XMLHttpRequest();
            xmlRequest.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { 
                        element.innerHTML = this.responseText; 
                    }
                      
                    if (this.status == 404) { 
                        element.innerHTML = "Page not found."; 
                    }

                    element.removeAttribute(
                        "GFG-include-html-snippet");

                    includeHTMLSnippet();
                }
            }
            xmlRequest.open("GET", file, true);
            xmlRequest.send();
            return; 
        }
    }
};

