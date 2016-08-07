class AppDrawer extends HTMLElement {
    // Can define constructor arguments if you wish.
    constructor() {
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        super();
        console.log('in constructor');
        // Setup a click listener on <app-drawer> itself.
        this.addEventListener('click', e => {
            // Don't toggle the drawer if it's disabled.
            if (this.disabled) {
                return;
            }
            this.toggleDrawer();
        });
    }
    // A getter/setter for an open property.
    get open() {
        return this.hasAttribute('open');
    }
    set open(val) {
        // Reflect the value of the open property as an HTML attribute.
        if (val) {
            this.setAttribute('open', '');
        }
        else {
            this.removeAttribute('open');
        }
        this.toggleDrawer();
    }
    // A getter/setter for a disabled property.
    get disabled() {
        return this.hasAttribute('disabled');
    }
    set disabled(val) {
        // Reflect the value of the disabled property as an HTML attribute.
        if (val) {
            this.setAttribute('disabled', '');
        }
        else {
            this.removeAttribute('disabled');
        }
    }
    toggleDrawer() {
        this.open = !this.open;
    }
    connectedCallback() {
        //const shadowRoot = this.attachShadow({mode: 'open'});
        this.innerHTML = `
                <div style="color:red">
                I am here
                </div>
                `;
    }
    disconnectedCallback() {
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
    }
}
customElements.define('app-drawer', AppDrawer);
//# sourceMappingURL=AppDrawer.js.map