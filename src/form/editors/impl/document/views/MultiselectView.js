//@flow
import dropdown from 'dropdown';
import ReferencePanelView from '../../reference/views/ReferencePanelView';
import template from '../templates/Multiselect.html';
import MultiselectItemView from './MultiselectItemView';
import AttachmentsController from '../gallery/AttachmentsController';
import LocalizationService from '../../../../../services/LocalizationService';

const MultiselectAddButtonView = Marionette.ItemView.extend({
    className: 'button-sm_h3 button-sm button-sm_add',
    tagName: 'button',
    template: Handlebars.compile('{{text}}')
});

export default Marionette.CompositeView.extend({
    initialize(options) {
        _.extend(this, options || {});
        this.reqres = Backbone.Radio.channel(_.uniqueId('mSelect'));

        this.reqres.reply('value:set', this.onValueAdd, this);
        this.reqres.reply('value:navigate', this.onValueNavigate, this);
        this.reqres.reply('search:more', this.onSearchMore, this);
        this.reqres.reply('filter:text', this.onFilterText, this);

        this.attachmentsController = new AttachmentsController();

        if (this.canAdd) {
            this.renderDropdown();
        }
        this._windowResize = _.throttle(this.update.bind(this), 100, true);
        window.addEventListener('resize', this._windowResize);
    },

    controller: null,

    $selectButtonEl: null,

    childView: MultiselectItemView,

    childViewContainer: '.js-collection-container',

    childViewOptions() {
        return {
            attachmentsController: this.attachmentsController,
            hideRemoveBtn: this.options.hideRemoveBtn
        };
    },

    className: 'l-task-links',

    canAdd: true,

    template: Handlebars.compile(template),

    ui: {
        showMore: '.js-show-more',
        invisibleCount: '.js-invisible-count',
        showMoreText: '.js-show-more-text'
    },

    events: {
        'click @ui.showMore': 'toggleShowMore',
        keydown: '__handleKeydown'
    },

    childEvents: {
        remove: 'onValueRemove'
    },

    collapsed: true,

    renderDropdown() {
        this.dropdownModel = new Backbone.Model({
            button: new Backbone.Model({
                text: LocalizationService.get('CORE.FORM.EDITORS.DOCUMENT.ADD')
            }),
            panel: new Backbone.Model({
                collection: this.controller.collection,
                totalCount: this.controller.totalCount || 0
            })
        });
        this.dropdownView = dropdown.factory.createDropdown({
            buttonView: MultiselectAddButtonView,
            buttonViewOptions: {
                model: this.dropdownModel.get('button'),
                reqres: this.reqres
            },
            panelView: ReferencePanelView,
            panelViewOptions: {
                model: this.dropdownModel.get('panel'),
                reqres: this.reqres
            }
        });
        this.$selectButtonEl.html(this.dropdownView.render().$el);
    },

    showDropDown() {
        this.dropdownView.open();
    },

    onDomRefresh() {
        this.renderShowMore();
    },

    onValueRemove(view, options) {
        this.trigger('removeItem', options.model);
    },

    onValueAdd(model) {
        this.collection.add(model);
        this.trigger('valueAdded', model);
        this.dropdownView && this.dropdownView.close();
        this.renderShowMore();
    },

    onValueNavigate() {
        //todo
        this.controller.navigate(this.getValue());
    },

    onSearchMore() {
        // TODO: Not implemented in Release 1
        this.dropdownView.close();
    },

    onFilterText(options) {
        return this.controller.fetch(options).then(() => this.dropdownModel.get('panel').set('totalCount', this.controller.totalCount));
    },

    toggleShowMore() {
        this.collapsed = !this.collapsed;
        this.renderShowMore();
    },

    renderShowMore() {
        if (this.collapsed) {
            this.collapseShowMore();
        } else {
            this.expandShowMore();
        }
    },

    update() {
        if (this.collapsed) {
            this.collapseShowMore();
        }
    },

    collapseShowMore() {
        if (!this.$childViewContainer || !this.$childViewContainer.children() || !this.$childViewContainer.children().length) {
            return;
        }
        const affordabletWidth = this.$el.width();
        const childViews = this.$childViewContainer.children();
        let visibleCounter = 1;
        let visibleWidth = /*60 +*/ childViews[0].offsetWidth;
        const length = this.collection.length;
        // visible children
        while (visibleCounter < length && visibleWidth + $(childViews[visibleCounter]).width() < affordabletWidth) {
            visibleWidth += $(childViews[visibleCounter])
                .show()
                .width();
            visibleCounter++;
        }
        // invisible children
        for (let i = visibleCounter; i < length; i++) {
            childViews[i].style.display = 'none';
        }
        if (length - visibleCounter > 0) {
            this.ui.showMore.show();
            this.ui.invisibleCount.html(length - visibleCounter);
            this.ui.showMoreText.html(`${LocalizationService.get('CORE.FORM.EDITORS.DOCUMENT.SHOWMORE')} `);
        } else {
            this.ui.showMore.hide();
        }
    },

    expandShowMore() {
        this.$childViewContainer.children().show();
        this.ui.showMoreText.html(LocalizationService.get('CORE.FORM.EDITORS.DOCUMENT.HIDE'));
        this.ui.invisibleCount.html('');
    },

    onDestroy() {
        window.removeEventListener('resize', this._windowResize, true);
    },

    __handleKeydown(e) {
        switch (e.keyCode) {
            case 13:
            case 40:
                this.dropdownView.open();
                break;
            default:
                break;
        }
    }
});