class Footer extends HTMLElement {
    constructor() {
        super();

        fetch('/components/Footer/Footer.html').then(res => res.text()).then(text => {
            this.innerHTML = text;
        })
    }
}

window.customElements.define('footer-bar', Footer)