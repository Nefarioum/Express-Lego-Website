class NavBar extends HTMLElement {
    constructor() {
        super();

        fetch('/components/NavBar/NavBar.html').then(res => res.text()).then(text => {
            this.innerHTML = text;
        })
    }
}

window.customElements.define('nav-bar', NavBar)