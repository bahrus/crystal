var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AppDrawer = (function (_super) {
    __extends(AppDrawer, _super);
    // Can define constructor arguments if you wish.
    function AppDrawer() {
        var _this = 
        // If you define a ctor, always call super() first!
        // This is specific to CE and required by the spec.
        _super.call(this) || this;
        console.log('in constructor');
        // Setup a click listener on <app-drawer> itself.
        _this.addEventListener('click', function (e) {
            // Don't toggle the drawer if it's disabled.
            if (_this.disabled) {
                return;
            }
            _this.toggleDrawer();
        });
        return _this;
    }
    Object.defineProperty(AppDrawer.prototype, "open", {
        // A getter/setter for an open property.
        get: function () {
            return this.hasAttribute('open');
        },
        set: function (val) {
            // Reflect the value of the open property as an HTML attribute.
            if (val) {
                this.setAttribute('open', '');
            }
            else {
                this.removeAttribute('open');
            }
            this.toggleDrawer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppDrawer.prototype, "disabled", {
        // A getter/setter for a disabled property.
        get: function () {
            return this.hasAttribute('disabled');
        },
        set: function (val) {
            // Reflect the value of the disabled property as an HTML attribute.
            if (val) {
                this.setAttribute('disabled', '');
            }
            else {
                this.removeAttribute('disabled');
            }
        },
        enumerable: true,
        configurable: true
    });
    AppDrawer.prototype.toggleDrawer = function () {
        this.open = !this.open;
    };
    AppDrawer.prototype.connectedCallback = function () {
        //const shadowRoot = this.attachShadow({mode: 'open'});
        this.innerHTML = "\n                <div style=\"color:red\">\n                I am here\n                </div>\n                ";
    };
    AppDrawer.prototype.disconnectedCallback = function () {
    };
    AppDrawer.prototype.attributeChangedCallback = function (attrName, oldVal, newVal) {
    };
    return AppDrawer;
}(HTMLElement));
customElements.define('app-drawer', AppDrawer);
//# sourceMappingURL=AppDrawer.js.map