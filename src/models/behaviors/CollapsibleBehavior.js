
const CollapsibleBehavior = function() {
};

Object.assign(CollapsibleBehavior.prototype, {
    collapse(internal) {
        if (this.collapsed) {
            return;
        }

        this.collapsed = true;
        this.trigger('collapsed', this);
        this.trigger('toggle:collapse', this);

        if (!internal && this.collection && this.collection.collapse) {
            this.collection.collapse(this);
        }
    },

    expand(internal) {
        if (this.collapsed === false) {
            return;
        }

        this.collapsed = false;
        this.trigger('expanded', this);
        this.trigger('toggle:collapse', this);
        if (!internal && this.collection && this.collection.expand) {
            this.collection.expand(this);
        }
    },

    toggleCollapsed() {
        if (this.collapsed) {
            this.expand();
        } else {
            this.collapse();
        }
    }
});

export default CollapsibleBehavior;
