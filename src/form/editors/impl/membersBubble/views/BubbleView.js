
import { Handlebars } from 'lib';
import template from '../templates/bubble.hbs';

export default Marionette.View.extend({
    initialize(options) {
        this.reqres = options.reqres;
    },

    template: Handlebars.compile(template),

    templateContext() {
        return {
            enabled: this.options.enabled
        };
    },

    tagName: 'li',

    className: 'bubbles__i',

    events: {
        'click .js-bubble-delete': '__delete',
        'click .js-bubble-link': '__linkClick'
    },

    ui: {
        clearButton: '.js-bubble-delete'
    },

    __delete() {
        this.reqres.request('bubble:delete', this.model);
        return false;
    },

    __linkClick() {
        window.location = this.model.get('url');
        return false;
    },

    updateEnabled(enabled) {
        this.options.enabled = enabled;
        if (enabled) {
            this.ui.clearButton.show();
        } else {
            this.ui.clearButton.hide();
        }
    },

    onRender() {
        this.updateEnabled(this.options.enabled);
    }
});
