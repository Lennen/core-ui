import template from '../templates/toastNotification.html';

const notificationTypes = {
    INFO: 'Info',
    ERROR: 'Error',
    SUCCESS: 'Success'
};

export default Marionette.ItemView.extend({
    className() {
        const sizeClass = this.model.get('title') ? 'dev-fr-alert-extended' : 'dev-fr-alert-compact';

        switch (this.model.get('type')) {
            case notificationTypes.SUCCESS:
                return `${sizeClass} fr-alert dev-alert_success dev-fr-alert`;
            case notificationTypes.ERROR:
                return `${sizeClass} fr-alert fr-alert_error dev-fr-alert`;
            case notificationTypes.INFO:
            default:
                return `${sizeClass} fr-alert dev-fr-alert`;
        }
    },

    triggers: {
        click: 'view:click'
    },

    template: Handlebars.compile(template)
});