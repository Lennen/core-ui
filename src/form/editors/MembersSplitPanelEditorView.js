// @flow
import template from './templates/membersSplitPanelEditor.html';
import MembersSplitPanelController from './impl/membersSplit/controller/MembersSplitPanelController';
import formRepository from '../formRepository';
import BaseLayoutEditorView from './base/BaseLayoutEditorView';
import WindowService from '../../services/WindowService';

// used as function because Localization service is not initialized yet
const defaultOptions = () => ({
    exclude: [],
    displayText: '',
    hideUsers: false,
    hideGroups: false,
    maxQuantitySelected: null,
    allowRemove: true,
    title: '',
    itemsToSelectText: Localizer.get('CORE.FORM.EDITORS.MEMBERSPLIT.USERSTOSELECT'),
    selectedItemsText: Localizer.get('CORE.FORM.EDITORS.MEMBERSPLIT.SELECTEDUSERS'),
    searchPlaceholder: Localizer.get('CORE.FORM.EDITORS.MEMBERSPLIT.SEARCHUSERS'),
    emptyListText: Localizer.get('CORE.FORM.EDITORS.MEMBERSPLIT.EMPTYLIST'),
    users: undefined,
    groups: undefined
});

export default (formRepository.editors.MembersSplitPanel = BaseLayoutEditorView.extend({
    initialize(options = {}) {
        const defOps = Object.assign(defaultOptions(), {
            users:
                options.users ||
                options.schema.cacheService.GetUsers().map(user => ({
                    id: user.Id,
                    name: user.Text || user.Username,
                    abbreviation: user.abbreviation,
                    userpicUri: user.userpicUri,
                    type: 'users'
                })),
            groups:
                options.groups ||
                options.schema.cacheService.GetGroups().map(group => ({
                    id: group.id,
                    name: group.name,
                    type: 'groups'
                }))
        });

        _.defaults(this.options, _.pick(options.schema ? options.schema : options, Object.keys(defOps)), defOps);

        this.options.selected = this.getValue();

        this.controller = new MembersSplitPanelController(this.options);

        this.controller.on('popup:ok', () => {
            this.__value(this.options.selected, true);
            this.__updateEditor();
        });
    },

    className: 'member-split',

    focusElement: null,

    attributes: {
        tabindex: 0
    },

    regions: {
        splitPanelRegion: '.js-split-panel-region'
    },

    ui: {
        membersEditor: '.js-members-editor',
        membersText: '.js-members-text'
    },

    events: {
        'click @ui.membersEditor': '__showPopup'
    },

    template: Handlebars.compile(template),

    templateContext() {
        return {
            displayText: this.options.displayText
        };
    },

    setValue(value) {
        this.__value(value, false);
    },

    onRender() {
        this.controller.initItems();
        this.showChildView('splitPanelRegion', this.controller.view);
    },

    __showPopup() {
        if (!this.getEnabled()) {
            return;
        }
        this.controller.initItems();
        WindowService.showPopup(this.controller.view);
    },

    __updateEditor() {
        this.ui.membersText.text(this.options.displayText);
    },

    __value(value, triggerChange) {
        this.value = value;

        if (triggerChange) {
            this.__triggerChange();
        }
    }
}));
